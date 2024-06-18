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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = path.join(__dirname, "..", "..", "schema_cached.json");
const schemaManager = new Schema({ apiKey: undefined });

if (fs.existsSync(SCHEMA_PATH)) {
	// a cached schema exists
	console.log("cached schema exists");

	// read and parse the cached schema
	const cachedData = JSON.parse(fs.readFileSync(SCHEMA_PATH));

	// set the schema data
	schemaManager.setSchema(cachedData);
}

// item received from API
export function formatItem(item) {
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
				if (itemAttribute.float_value == 2) {
					formattedItem.sheen = sheens[itemAttribute.float_value];
					break;
				}

				if (itemAttribute.float_value == 3) {
					formattedItem.sheen = sheens[itemAttribute.float_value];
					formattedItem.killstreaker =
						killstreakers[itemAttribute.float_value];
					break;
				}
				break;

			case attributeDefindex.australium:
				itemObjectForSku.australium =
					itemAttribute.float_value === 1 ? true : false;
				break;

			case attributeDefindex.effect:
				itemObjectForSku.effect = itemAttribute.float_value;
				break;

			case attributeDefindex.festivized:
				itemObjectForSku.festive =
					itemAttribute.float_value === 1 ? true : false;
				break;

			case attributeDefindex.paint[0]:
			case attributeDefindex.paint[1]:
				formattedItem.paint = itemAttribute.float_value;
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

	return formattedItem;
}
