import path from "path";
import { fileURLToPath } from "url";
import SKU from "@tf2autobot/tf2-sku";
import Schema from "@tf2autobot/tf2-schema";
import fs from "fs";
import {
	attributeDefindex,
	qualityColors,
	sheens,
	killstreakers,
} from "./data.js";
import getBaseItemImage from "../lib/autobot.tf/getBaseItemImage.js";
import downloadSchema from "./downloadSchema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = path.join(__dirname, "..", "..", "schema_cached.json");
export const schemaManager = new Schema({ apiKey: undefined });

if (!fs.existsSync(SCHEMA_PATH)) {
	console.log("cached schema does not exist");
	await downloadSchema();
}

// read and parse the cached schema
const cachedData = JSON.parse(fs.readFileSync(SCHEMA_PATH));

// set the schema data
schemaManager.setSchema(cachedData);

// item received from API
export function formatItemGRPC(item) {
	const itemObjectForSku = {
		defindex: item.defindex,
		quality: item.quality,
		craftable: item.is_craftable,
		tradable: item.is_tradable,
	};
	const formattedItem = { ...itemObjectForSku };

	for (const itemAttribute of item.attributes) {
		switch (itemAttribute.defindex) {
			case attributeDefindex.killstreak:
				itemObjectForSku.killstreak = itemAttribute.float_value;
				break;

			case attributeDefindex.killstreaker:
				formattedItem.killstreaker =
					killstreakers[itemAttribute.float_value];
				break;

			case attributeDefindex.sheen:
				formattedItem.sheen = sheens[itemAttribute.float_value];
				break;

			case attributeDefindex.australium:
				itemObjectForSku.australium =
					itemAttribute.float_value === 1 ? true : false;
				break;

			case attributeDefindex.effect:
				itemObjectForSku.effect = itemAttribute.float_value;
				formattedItem.effect = schemaManager.schema.getEffectById(
					itemAttribute.float_value
				);
				break;

			case attributeDefindex.taunt_effect:
				if (itemAttribute.is_int) {
					itemObjectForSku.effect = itemAttribute.value_int;
					formattedItem.effect = schemaManager.schema.getEffectById(
						itemAttribute.value_int
					);
				}
				break;

			case attributeDefindex.festivized:
				itemObjectForSku.festive =
					itemAttribute.float_value === 1 ? true : false;
				break;

			case attributeDefindex.paint[0]:
			case attributeDefindex.paint[1]:
				formattedItem.paint = {
					name: schemaManager.schema.getPaintNameByDecimal(
						itemAttribute.float_value
					),
					hex: "#" + itemAttribute.float_value.toString(16),
				};
				break;
			// TODO: handle strange parts
		}
	}
	const sku = SKU.fromObject(itemObjectForSku);
	formattedItem.sku = sku;
	formattedItem.name = schemaManager.schema.getName(itemObjectForSku);
	formattedItem.id = item.id;
	formattedItem.original_id = item.original_id;
	formattedItem.level = item.level;
	formattedItem.quality = {
		value: item.quality,
		color: qualityColors[schemaManager.schema.getQualityById(item.quality)],
	};
	if (!qualityColors[schemaManager.schema.getQualityById(item.quality)]) {
		console.log(item.quality);
	}
	formattedItem.quantity = item.quantity;
	if (item.custom_name) {
		formattedItem.custom_name = item.custom_name;
	}
	if (item.custom_description) {
		formattedItem.custom_description = item.custom_description;
	}

	const [itemImageUrlPrint, needResize] = getBaseItemImage(
		schemaManager.schema.getItemBySKU(sku),
		itemObjectForSku,
		formattedItem.name
	);
	formattedItem.image_url = itemImageUrlPrint;

	// if item has effect, get image from autobot.tf
	// otherwise, use base image from schema
	if (itemObjectForSku.effect) {
		formattedItem.image_url =
			"https://autobot.tf/images/items/" +
			sku
				.replace("uncraftable", "")
				.replace("untradable", "")
				.replace(/;+$/, "") + // remove trailing semicolons
			".png";
	}

	return formattedItem;
}

// format item from GetPlayerItems API
export function formatItem(item) {
	const itemObjectForSku = {
		defindex: item.defindex,
		quality: item.quality,
		craftable: !item.flag_cannot_craft,
		tradable: !item.flag_cannot_trade,
	};
	const formattedItem = { ...itemObjectForSku };

	if (item.attributes) {
		for (const itemAttribute of item.attributes) {
			switch (itemAttribute.defindex) {
				case attributeDefindex.killstreak:
					itemObjectForSku.killstreak = itemAttribute.float_value;
					break;

				case attributeDefindex.killstreaker:
					formattedItem.killstreaker =
						killstreakers[itemAttribute.float_value];
					break;

				case attributeDefindex.sheen:
					formattedItem.sheen = sheens[itemAttribute.float_value];
					break;

				case attributeDefindex.australium:
					itemObjectForSku.australium =
						itemAttribute.float_value === 1 ? true : false;
					break;

				case attributeDefindex.effect:
					itemObjectForSku.effect = itemAttribute.float_value;
					formattedItem.effect = schemaManager.schema.getEffectById(
						itemAttribute.float_value
					);
					break;

				case attributeDefindex.taunt_effect:
					itemObjectForSku.effect = itemAttribute.value;
					formattedItem.effect = schemaManager.schema.getEffectById(
						itemAttribute.value
					);
					// if (itemAttribute.is_int) {

					// }
					break;

				case attributeDefindex.festivized:
					itemObjectForSku.festive =
						itemAttribute.float_value === 1 ? true : false;
					break;

				case attributeDefindex.paint[0]:
				case attributeDefindex.paint[1]:
					formattedItem.paint = {
						name: schemaManager.schema.getPaintNameByDecimal(
							itemAttribute.float_value
						),
						hex: "#" + itemAttribute.float_value.toString(16),
					};
					break;
				// TODO: handle strange parts
			}
		}
	}

	const sku = SKU.fromObject(itemObjectForSku);
	formattedItem.sku = sku;
	formattedItem.name = schemaManager.schema.getName(itemObjectForSku);
	formattedItem.id = item.id;
	formattedItem.original_id = item.original_id;
	formattedItem.level = item.level;
	formattedItem.quality = {
		value: item.quality,
		color: qualityColors[schemaManager.schema.getQualityById(item.quality)],
	};
	if (!qualityColors[schemaManager.schema.getQualityById(item.quality)]) {
		console.log(item.quality);
	}
	formattedItem.quantity = item.quantity;
	if (item.custom_name) {
		formattedItem.custom_name = item.custom_name;
	}
	if (item.custom_description) {
		formattedItem.custom_description = item.custom_description;
	}

	const [itemImageUrlPrint, needResize] = getBaseItemImage(
		schemaManager.schema.getItemBySKU(sku),
		itemObjectForSku,
		formattedItem.name
	);
	formattedItem.image_url = itemImageUrlPrint;

	// if item has effect, get image from autobot.tf
	// otherwise, use base image from schema
	if (itemObjectForSku.effect) {
		formattedItem.image_url =
			"https://autobot.tf/images/items/" +
			sku
				.replace("uncraftable", "")
				.replace("untradable", "")
				.replace(/;+$/, "") + // remove trailing semicolons
			".png";
	}

	return formattedItem;
}
