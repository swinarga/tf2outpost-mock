import { parseEconItem, stringify } from "tf2-item-format/static";
import getBaseItemImage from "../lib/autobot.tf/getBaseItemImage";
import { schemaManager } from "./tf2";

// const econ = {
// 	appid: 440,
// 	classid: "367388259",
// 	instanceid: "19184842",
// 	currency: 0,
// 	background_color: "3C352E",
// 	icon_url:
// 		"IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfSMf6UeRJpnqWSMU5OD2IwJkXVZnihXOjLx2Sk5MbUqMcbBnQz4ruyeU2z6e2WUfnLmFl9rFuYaWjSIvGTw--SWFDrMEr0rFwlSffEHo2AdOZyAPRFu0Y8D-jG-wkF4TEZ-IpZCIwn12noUgUN7iwI",
// 	icon_url_large:
// 		"IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfSMf6UeRJpnqWSMU5OD2IwJkXVZnihXOjLx2Sk5MbUqMcbBnQz4ruyeU2z6e2WUfnLmFl9rFuYaWjSIvGTw--SWFDrMEr0rFwlSffEHo2AdOZyAPRFu0Y8D-jG-wkF4TEZ-IpZCIwn12noUgUN7iwI",
// 	descriptions: [
// 		{
// 			value: "Style: Dark - Hide Grenades",
// 			color: "756b5e",
// 		},
// 		{
// 			value: "Paint Color: An Extraordinary Abundance of Tinge",
// 			color: "756b5e",
// 		},
// 	],
// 	tradable: 1,
// 	actions: [
// 		{
// 			link: "http://wiki.teamfortress.com/scripts/itemredirect.php?id=30309&lang=en_US",
// 			name: "Item Wiki Page...",
// 		},
// 		{
// 			link: "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D16794388631752289667",
// 			name: "Inspect in Game...",
// 		},
// 	],
// 	name: "Dead of Night",
// 	name_color: "7D6D00",
// 	type: "Level 11 Apparel",
// 	market_name: "Dead of Night",
// 	market_hash_name: "Dead of Night",
// 	market_actions: [
// 		{
// 			link: "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D16794388631752289667",
// 			name: "Inspect in Game...",
// 		},
// 	],
// 	commodity: 0,
// 	market_tradable_restriction: 7,
// 	market_marketable_restriction: 0,
// 	marketable: 0,
// 	tags: [
// 		{
// 			category: "Quality",
// 			internal_name: "Unique",
// 			localized_category_name: "Quality",
// 			localized_tag_name: "Unique",
// 			color: "7D6D00",
// 		},
// 		{
// 			category: "Type",
// 			internal_name: "misc",
// 			localized_category_name: "Type",
// 			localized_tag_name: "Cosmetic",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Scout",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Scout",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Sniper",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Sniper",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Soldier",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Soldier",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Demoman",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Demoman",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Medic",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Medic",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Heavy",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Heavy",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Pyro",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Pyro",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Spy",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Spy",
// 		},
// 		{
// 			category: "Class",
// 			internal_name: "Engineer",
// 			localized_category_name: "Class",
// 			localized_tag_name: "Engineer",
// 		},
// 	],
// };
const econ = {
	appid: 440,
	classid: "1934791327",
	instanceid: "5958912556",
	currency: 0,
	background_color: "3C352E",
	icon_url:
		"IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfSMf6UeRJpnqWSMU5OD2IwJkXVZnihXOjLx2Sk5MbUqMcbBnQz4ruyeU2f_ZyXQfXGISGFkFO8xaDeMkW_0p7rBXG7NSL1-RQENL6ZW8GxKaMCKOhVr09EI_DfswhQpHUN7JZVHcl_vmyddIbMiy0NHNGg",
	icon_url_large:
		"IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfSMf6UeRJpnqWSMU5OD2IwJkXVZnihXOjLx2Sk5MbUqMcbBnQz4ruyeU2f_ZyXQfXGISGFkFO8xaDeMkW_0p7rBXG7NSL1-RQENL6ZW8GxKaMCKOhVr09EI_DfswhQpHUN7JZVHcl_vmyddIbMiy0NHNGg",
	descriptions: [
		{
			value: "Paint Color: An Extraordinary Abundance of Tinge",
			color: "756b5e",
		},
		{
			value: "★ Unusual Effect: Burning Flames",
			color: "ffd700",
		},
	],
	tradable: 1,
	actions: [
		{
			link: "http://wiki.teamfortress.com/scripts/itemredirect.php?id=30413&lang=en_US",
			name: "Item Wiki Page...",
		},
		{
			link: "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D14806586085586948361",
			name: "Inspect in Game...",
		},
	],
	name: "Unusual Merc's Mohawk",
	name_color: "8650AC",
	type: "Level 95 Hair",
	market_name: "Unusual Merc's Mohawk",
	market_hash_name: "Unusual Merc's Mohawk",
	market_actions: [
		{
			link: "steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D14806586085586948361",
			name: "Inspect in Game...",
		},
	],
	commodity: 0,
	market_tradable_restriction: 7,
	market_marketable_restriction: 0,
	marketable: 1,
	tags: [
		{
			category: "Quality",
			internal_name: "rarity4",
			localized_category_name: "Quality",
			localized_tag_name: "Unusual",
			color: "8650AC",
		},
		{
			category: "Type",
			internal_name: "misc",
			localized_category_name: "Type",
			localized_tag_name: "Cosmetic",
		},
		{
			category: "Class",
			internal_name: "Scout",
			localized_category_name: "Class",
			localized_tag_name: "Scout",
		},
		{
			category: "Class",
			internal_name: "Sniper",
			localized_category_name: "Class",
			localized_tag_name: "Sniper",
		},
		{
			category: "Class",
			internal_name: "Soldier",
			localized_category_name: "Class",
			localized_tag_name: "Soldier",
		},
		{
			category: "Class",
			internal_name: "Demoman",
			localized_category_name: "Class",
			localized_tag_name: "Demoman",
		},
		{
			category: "Class",
			internal_name: "Medic",
			localized_category_name: "Class",
			localized_tag_name: "Medic",
		},
		{
			category: "Class",
			internal_name: "Heavy",
			localized_category_name: "Class",
			localized_tag_name: "Heavy",
		},
		{
			category: "Class",
			internal_name: "Pyro",
			localized_category_name: "Class",
			localized_tag_name: "Pyro",
		},
		{
			category: "Class",
			internal_name: "Spy",
			localized_category_name: "Class",
			localized_tag_name: "Spy",
		},
		{
			category: "Class",
			internal_name: "Engineer",
			localized_category_name: "Class",
			localized_tag_name: "Engineer",
		},
	],
};
const item = parseEconItem(econ);
console.log(item);
console.log(stringify(item));

// WARPAINTS
const kbee = {
	defindex: 15151,
	quality: 15,
	paintkit: 85,
	wear: 1,
};
console.log(schemaManager.schema.getName(kbee));
console.log(getBaseItemImage(kbee, kbee, schemaManager.schema.getName(kbee)));

// hats that are not craftable
console.log(
	schemaManager.schema.raw.schema.items.filter(
		(item) =>
			item.item_slot === "misc" && item.craft_material_type !== "hat"
	)
);
