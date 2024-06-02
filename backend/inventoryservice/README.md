Example item from http://api.steampowered.com/IEconItems_440/GetPlayerItems/v0001/

```json
{
	"id": 1107583245,
	"original_id": 1107583245,
	"defindex": 59,
	"level": 5,
	"quality": 6,
	"inventory": 2147484658,
	"quantity": 1,
	"origin": 1,
	"flag_cannot_trade": true,
	"attributes": [
		{
			"defindex": 796,
			"value": "8 0 -6"
		},
		{
			"defindex": 33,
			"value": 1065353216,
			"float_value": 1
		},
		{
			"defindex": 83,
			"value": 1058642330,
			"float_value": 0.6000000238418579
		},
		{
			"defindex": 726,
			"value": 1056964608,
			"float_value": 0.5
		},
		{
			"defindex": 35,
			"value": 1069547520,
			"float_value": 1.5
		},
		{
			"defindex": 810,
			"value": 1065353216,
			"float_value": 1
		},
		{
			"defindex": 292,
			"value": 1091567616,
			"float_value": 9
		}
	]
}
```

https://wiki.teamfortress.com/wiki/WebAPI/GetPlayerItems

-   Defindex of item attributes =/= Defindex of item
-   original_id: [steam generates a new ID when you put it on scm or change it's attribute in tf2](https://discord.com/channels/664971400678998016/700005962731225173/855981465686245406). ID changes whenever an item is traded. For example, [11903013325](https://backpack.tf/item/11903013325). 11903013325 is the original ID.
-   [Attributes defindex](./docs/attributes_defindex.json) gathered from: https://api.steampowered.com/IEconItems_440/GetSchemaOverview/v0001/?language=English&key=key
-   Paints, Parts, Spell Names, Sheens, Killstreakers: https://github.com/ZeusJunior/node-tf2-backpack/blob/master/src/data.ts

Example Burning Flames Merc's Mohawk:

```json
{
	"id": 14466771967,
	"original_id": 12321822343,
	"defindex": 30413,
	"level": 95,
	"quality": 5,
	"inventory": 2147483650,
	"quantity": 1,
	"origin": 6,
	"equipped": [
		{
			"class": 7,
			"slot": 10
		},
		{
			"class": 6,
			"slot": 7
		},
		{
			"class": 8,
			"slot": 10
		},
		{
			"class": 9,
			"slot": 7
		},
		{
			"class": 5,
			"slot": 8
		},
		{
			"class": 4,
			"slot": 10
		},
		{
			"class": 1,
			"slot": 8
		},
		{
			"class": 3,
			"slot": 7
		}
	],
	"attributes": [
		{
			"defindex": 134,
			"value": 1095761920,
			"float_value": 13
		},
		{
			"defindex": 142,
			"value": 1265034982,
			"float_value": 15132390
		},
		{
			"defindex": 261,
			"value": 1265034982,
			"float_value": 15132390
		},
		{
			"defindex": 519,
			"value": 3224790630,
			"float_value": -2.84999990463256836
		},
		{
			"defindex": 520,
			"value": 1065353216,
			"float_value": 1
		},
		{
			"defindex": 746,
			"value": 1065353216,
			"float_value": 1
		},
		{
			"defindex": 292,
			"value": 1115684864,
			"float_value": 64
		},
		{
			"defindex": 388,
			"value": 1115684864,
			"float_value": 64
		}
	]
}
```

-   Item Defindex: 30413 -> Merc's Mohawk
-   Quality: 5 -> [rarity4](./docs/qualities.json) -> [unusual](./docs/quality_names.json)
-   Attribute Defindex: 134 -> [attach particle effect / unusual effect](./docs/attributes_defindex.json). Float value: 13 -> [Burning Flames](./docs/attribute_controlled_attached_particles.json)
-   Attribute Defindex: 142 -> set item tint RGB. Float value: 15132390 is a decimal number. The hexadecimal representation is E6E6E6. [E6E6E6](https://github.com/ZeusJunior/node-tf2-backpack/blob/master/src/data.ts#L36) is An Extraordinary Abundance of Tinge.
-   Attribute Defindex: 261 -> set item tint RGB 2. Float value: 15132390. The same as defindex: 142. TODO: values could be different for specific paints and teams?
-   Attribute Defindex: 519 & 520 -> particle effect vertical offset and particle effect use head origin. The slider to adjust the unusual effect position.
-   Attribute Defindex: 746 -> cosmetic_allow_inspect
-   Attribute Defindex: 292 -> kill_eater_score_type. No idea what this is

---

-   uint64 maps to string when converted to JSON: https://groups.google.com/g/protobuf/c/4-BY-k-Lk-g
-   Optional fields of a message in RPC calls still have default values even when value is not set. However, these values are omitted when turned into JSON.
