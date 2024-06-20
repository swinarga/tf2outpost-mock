import express from "express";
import {
	addDoc,
	addDocWithKey,
	getDoc,
	getDocByKey,
} from "../firebase/firebase.js";
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
					items: formattedItems,
					numBackpackSlots: inventory.num_backpack_slots,
				};

				// console.log(formattedItems);

				// TODO: store to DB
				const createdInventory = await addDocWithKey(
					"inventories",
					inventory.steam_id,
					formattedInventory
				);

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
	const inventory = await getDocByKey("inventories", id);

	if (!inventory) {
		console.log("inventory not found in DB, fetching from steam API");
		// inventory not found in DB, fetch from go service
		try {
			const formattedInventory = await fetchInventory(id);
			return res.send(formattedInventory);
		} catch (err) {
			return res.status(500).send("Failed to fetch inventory");
		}
	}

	return res.send(inventory);
});

export default router;
