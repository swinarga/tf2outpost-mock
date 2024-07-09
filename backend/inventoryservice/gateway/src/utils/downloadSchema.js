import axios from "axios";
import fs from "fs";

const downloadSchema = async () => {
	console.log("downloading schema...");
	const res = await axios.get("https://schema.autobot.tf/schema/download");
	fs.writeFileSync("schema_cached.json", JSON.stringify(res.data));
	console.log("saved schema...");
};

export default downloadSchema;
