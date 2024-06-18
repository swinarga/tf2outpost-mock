import dotenv from "dotenv";
dotenv.config();

export default function checkInternalApiKey(key) {
	if (key !== process.env.INTERNAL_API_KEY) {
		return false;
	} else return true;
}
