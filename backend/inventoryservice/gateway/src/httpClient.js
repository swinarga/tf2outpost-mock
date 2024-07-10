import axios from "axios";
import dotenv from "dotenv";
import { formatItem } from "./utils/tf2.js";

dotenv.config();

const STEAM_INV_URL =
	"http://api.steampowered.com/IEconItems_440/GetPlayerItems/v0001/";

const getSteamInventory = async (steamId) => {
	console.log("fetching inventory for steamId: ", steamId);
	const response = await axios.get(STEAM_INV_URL, {
		params: {
			steamId: steamId,
			key: process.env.STEAM_API_KEY,
			format: "json",
		},
	});

	if (response.status !== 200 || response.data.result.status !== 1) {
		throw new Error("Failed to fetch inventory");
	}

	const inv = formatGetSteamInventoryResponse(response.data.result);

	return inv;
};

const formatGetSteamInventoryResponse = (res) => {
	return {
		numBackpackSlots: res.num_backpack_slots,
		items: res.items.map((item) => formatItem(item)),
		lastUpdated: Date.now(),
	};
};

export default getSteamInventory;
