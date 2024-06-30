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

const FETCH_INVENTORY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

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
					lastUpdated: Date.now(),
				};

				resolve(formattedInventory);
			}
		});
	});
}

const router = express.Router();

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	const inventory = await getDocByKey("inventories", id);

	if (
		!inventory ||
		inventory.lastUpdated < Date.now() - FETCH_INVENTORY_TIMEOUT
	) {
		console.log(
			"inventory not found in DB or inventory outdated, fetching from steam API"
		);
		// inventory not found in DB, fetch from go service
		try {
			const formattedInventory = await fetchInventory(id);
			// store or update inventory
			if (process.env.NODE_ENV !== "debug") {
				console.log("storing inventory in DB...");
				await addDocWithKey("inventories", id, formattedInventory);
			}
			return res.send(formattedInventory);
		} catch (err) {
			return res.status(500).send("Failed to fetch inventory");
		}
	}

	return res.send(inventory);
});

export default router;
