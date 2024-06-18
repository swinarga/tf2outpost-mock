import express from "express";
import { addDoc, getDoc, getDocByKey } from "../firebase/firebase.js";
import {
	ensureAuthenticated,
	ensureInternalService,
} from "../middleware/middleware.js";
import checkInternalApiKey from "../utils/checkInternalApiKey.js";
import client from "../client.js";
import { formatItem } from "../utils/tf2.js";

function fetchInventory(id) {
	return new Promise((resolve, reject) => {
		client.getInventory({ id: id }, async (err, inventory) => {
			if (err) {
				// something wrong with fetching steam inventory?
				console.error(err);
				reject();
			} else {
				const formattedItems = inventory.items.map((item) =>
					formatItem(item)
				);
				const formattedInventory = {
					steamId: inventory.steam_id,
					items: formattedItems,
					numBackpackSlots: inventory.num_backpack_slots,
				};

				// console.log(formattedItems);

				// TODO: store to DB
				const createdInventory = await addDoc(
					"inventories",
					formattedInventory
				);

				console.log(`Inventory created: ${createdInventory}`);
				resolve(formattedInventory);
			}
		});
	});
}

const router = express.Router();

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	// TODO: check last queried time or use redis to determine
	// if we should re-fetch inventory from steam API
	const inventories = await getDoc("inventories", ["steamId", "==", id]);

	if (inventories.length === 0) {
		console.log("inventory not found in DB, fetching from steam API");
		// inventory not found in DB, fetch from go service
		try {
			const formattedInventory = await fetchInventory(id);
			return res.send(formattedInventory);
		} catch (err) {
			return res.status(500).send("Failed to fetch inventory");
		}
	}

	return res.send(inventories[0].value);
});

export default router;
