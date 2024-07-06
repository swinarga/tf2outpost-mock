import express from "express";
import { schemaManager } from "../utils/tf2.js";

const router = express.Router();

router.get("/search", async (req, res) => {
	const query = req.query.query ? req.query.query : "";

	try {
		return res.send({
			success: true,
			data: schemaManager.schema.raw.schema.items
				.filter((item) =>
					item.name.toLowerCase().includes(query.toLowerCase())
				)
				.map((item) => {
					return {
						name: item.item_name,
						defindex: item.defindex,
						description: item.item_description,
						classes: item.used_by_classes,
						image: item.image_url_large,
						type: item.item_slot,
					};
				}),
		});
	} catch (err) {
		return res.send({
			success: false,
			message: "Failed to fetch schema",
		});
	}
});

export default router;
