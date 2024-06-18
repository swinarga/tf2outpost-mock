import SKU from "@tf2autobot/tf2-sku";
import { parseEconItem, schema } from "tf2-item-format/static";
import Schema from "@tf2autobot/tf2-schema";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inventory from "../../example_response_grpc.json" assert { type: "json" };

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const attributeDefindex = {
	paint: [142, 261],
	killstreak: 2025, // Killstreak tier (1 KS, 2 Spec KS, 3 Prof KS)
	australium: 2027,
	effect: 134,
	festivized: 2053,
	parts: [379, 380, 381, 382, 383, 384], // 379, 381, 383 are strange part counters -> see value
	// 380, 382, 384 are strange part types -> see float_value
	sheen: 2014,
	killstreaker: 2013,
};

const qualityColors = {
	Normal: "#B2B2B2",
	Unique: "#FFD700",
	Vintage: "#476291",
	Genuine: "#4D7455",
	Strange: "#CF6A32",
	Unusual: "#8650AC",
	Haunted: "#38F3AB",
	"Collector's": "#AA0000",
	Decorated: "#FAFAFA",
	Community: "#70B04A",
	"Self-Made": "#70B04A",
	Valve: "#A50F79",
};

const sheens = {
	1: "Team Shine",
	2: "Deadly Daffodil",
	3: "Manndarin",
	4: "Mean Green",
	5: "Agonizing Emerald",
	6: "Villainous Violet",
	7: "Hot Rod",
};

const killstreakers = {
	2002: "Fire Horns",
	2003: "Cerebral Discharge",
	2004: "Tornado",
	2005: "Flames",
	2006: "Singularity",
	2007: "Incinerator",
	2008: "Hypno-Beam",
};

// item object type
// {
// 	defindex: number;
// 	quality: number;
// 	craftable?: boolean;
// 	tradable?: boolean;
// 	killstreak?: number;
// 	australium?: boolean;
// 	effect?: number;
// 	festive?: boolean;
// 	paintkit?: number;
// 	wear?: number;
// 	quality2?: number;
// 	craftnumber?: number;
// 	crateseries?: number;
// 	target?: number;
// 	output?: number;
// 	outputQuality?: number;
// 	paint?: number;
// }

// fromApi
// {
// 	"attributes": [
// 		{
// 			"defindex": 142,
// 			"value_int": "1265034982",
// 			"value_string": "",
// 			"is_int": true,
// 			"float_value": 15132390
// 		},
// 		{
// 			"defindex": 261,
// 			"value_int": "1265034982",
// 			"value_string": "",
// 			"is_int": true,
// 			"float_value": 15132390
// 		},
// 		{
// 			"defindex": 746,
// 			"value_int": "1065353216",
// 			"value_string": "",
// 			"is_int": true,
// 			"float_value": 1
// 		},
// 		{
// 			"defindex": 292,
// 			"value_int": "1115684864",
// 			"value_string": "",
// 			"is_int": true,
// 			"float_value": 64
// 		},
// 		{
// 			"defindex": 388,
// 			"value_int": "1115684864",
// 			"value_string": "",
// 			"is_int": true,
// 			"float_value": 64
// 		}
// 	],
// 	"id": "9033684681",
// 	"original_id": "4664249119",
// 	"defindex": 30309,
// 	"level": 11,
// 	"quality": 6,
// 	"quantity": 1,
// 	"custom_name": "",
// 	"custom_description": "",
// 	"is_tradable": true,
// 	"is_craftable": true
// }

// const format = createFormat(sch);
// Unique White-painted Dead of Night item object
const deadOfNightItem = {
	id: 9033684681,
	original_id: 4664249119,
	defindex: 30309,
	level: 11,
	quality: 6,
	inventory: 2147484667,
	quantity: 1,
	origin: 2,
	equipped: [
		{
			class: 3,
			slot: 7,
		},
		{
			class: 9,
			slot: 10,
		},
	],
	style: 2,
	attributes: [
		{
			defindex: 142,
			value: 1265034982,
			float_value: 15132390,
		},
		{
			defindex: 261,
			value: 1265034982,
			float_value: 15132390,
		},
		{
			defindex: 746,
			value: 1065353216,
			float_value: 1,
		},
		{
			defindex: 292,
			value: 1115684864,
			float_value: 64,
		},
		{
			defindex: 388,
			value: 1115684864,
			float_value: 64,
		},
	],
};

// Dead Ringer item object
const deadRingerItem = {
	attributes: [
		{
			defindex: 796,
			value_int: "0",
			value_string: "8 0 -6",
			is_int: false,
			float_value: 0,
		},
		{
			defindex: 33,
			value_int: "1065353216",
			value_string: "",
			is_int: true,
			float_value: 1,
		},
		{
			defindex: 83,
			value_int: "1058642330",
			value_string: "",
			is_int: true,
			float_value: 0.6000000238418579,
		},
		{
			defindex: 726,
			value_int: "1056964608",
			value_string: "",
			is_int: true,
			float_value: 0.5,
		},
		{
			defindex: 35,
			value_int: "1069547520",
			value_string: "",
			is_int: true,
			float_value: 1.5,
		},
		{
			defindex: 810,
			value_int: "1065353216",
			value_string: "",
			is_int: true,
			float_value: 1,
		},
		{
			defindex: 292,
			value_int: "1091567616",
			value_string: "",
			is_int: true,
			float_value: 9,
		},
	],
	id: "1107583245",
	original_id: "1107583245",
	defindex: 59,
	level: 5,
	quality: 6,
	quantity: 1,
	custom_name: "",
	custom_description: "",
	is_tradable: false,
	is_craftable: true,
};

const SCHEMA_PATH = path.join(__dirname, "..", "..", "schema_cached.json");
console.log(SCHEMA_PATH);
console.log(fs.existsSync(SCHEMA_PATH));

const schemaManager = new Schema({ apiKey: undefined });

if (fs.existsSync(SCHEMA_PATH)) {
	// a cached schema exists
	console.log("cached schema exists");

	// read and parse the cached schema
	const cachedData = JSON.parse(fs.readFileSync(SCHEMA_PATH));

	// set the schema data
	schemaManager.setSchema(cachedData);
}

const items = [];
console.log(inventory.steam_id);
console.log("----------------------");
for (const item of inventory.items) {
	if (!item.quantity) {
		console.log(item);
	}
	const itemObjectForSku = {
		defindex: item.defindex,
		quality: item.quality,
		craftable: item.is_craftable,
		tradable: item.is_tradable,
	};
	const itemObject = { ...itemObjectForSku };

	for (const itemAttribute of item.attributes) {
		switch (itemAttribute.defindex) {
			case attributeDefindex.killstreak:
				itemObjectForSku.killstreak = itemAttribute.float_value;
				if (itemAttribute.float_value == 2) {
					itemObject.sheen = sheens[itemAttribute.float_value];
					break;
				}

				if (itemAttribute.float_value == 3) {
					itemObject.sheen = sheens[itemAttribute.float_value];
					itemObject.killstreaker =
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
				itemObject.paint = itemAttribute.float_value;
				break;
			// TODO: handle strange parts
		}
	}
	const sku = SKU.fromObject(itemObjectForSku);
	itemObject.sku = sku;
	itemObject.name = schemaManager.schema.getName(itemObjectForSku);
	itemObject.id = item.id;
	itemObject.original_id = item.original_id;
	itemObject.level = item.level;
	itemObject.quality = {
		value: item.quality,
		color: qualityColors[schemaManager.schema.getQualityById(item.quality)],
	};
	itemObject.quantity = item.quantity;
	if (item.custom_name) {
		itemObject.custom_name = item.custom_name;
	}
	if (item.custom_description) {
		itemObject.custom_description = item.custom_description;
	}
	items.push(itemObject);
}
// console.log(items);

// console.log(schemaManager.schema.getQualityById(6));
// get images with sku
// filter duplicates

process.exit(0);

// unusual effect -> from sku
// paint ->
const deadOfNight = schemaManager.schema.getItemByItemName("Dead of Night");
console.log(deadOfNight);
const schemaItem = schemaManager.schema.getItemByDefindex(59);
schemaManager.schema.get;
// const schemaItem = schemaManager.schema
console.log(schemaManager.schema.paints["Muskelmannbraun"]);
// schemaItem.item_description;
// const schemaItem = schemaManager.schema.getItemBySKU("30177;5;u13");
// console.log(schemaItem);
// schemaItem.

// schemaManager.init((err) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// });

// schemaManager.schema.getAttributeByDefindex()

// this event is emitted when the init function has been called and finished without errors
// schemaManager.on("ready", function () {
// 	console.log("tf2-schema is ready!");
// 	// const schemaItem = schemaManager.schema.getItemByDefindex(59);
// 	const schemaItem = schemaManager.schema.getItemBySKU("30177;5;u13");
// 	schemaManager.schema.getSKU;
// 	console.log(schemaItem);
// });

const deadRinger = {
	defindex: deadRingerItem.defindex,
	quality: deadRingerItem.quality,
	craftable: deadRingerItem.is_craftable,
	tradable: deadRingerItem.is_tradable,
	paint: 15132390,
};

schemaManager.schema.parse;

// let item = {
// 	defindex,
// 	quality,
// 	craftable: parsedDescription.craftable,
// 	killstreak,
// 	australium: isAustralium(self),
// 	festive: isFestive(self, normalizeFestivizedItems),
// 	effect: parsedDescription.effect,
// 	wear,
// 	paintkit: parsedDescription.paintkit,
// 	quality2: getElevatedQuality(self, normalizeStrangeAsSecondQuality),
// 	crateseries: getCrateSeries(self),
// 	target: parsedDescription.target,
// 	output: parsedDescription.output,
// 	outputQuality: parsedDescription.outputQuality,
// 	paint: parsedDescription.paint,
// 	craftnumber: getCraftNumber(self, schema, normalizeCraftNumber),
// };

const sku = SKU.fromObject(deadRinger);
console.log(schemaManager.schema.getPaintNameByDecimal(15132390));
console.log(sku);
console.log(schemaManager.schema.qualities);
console.log(schemaManager.schema.getStrangeParts());
