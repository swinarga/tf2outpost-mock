import express from "express";
import { addDoc, getDoc, getDocByKey } from "../firebase/firebase.js";
import {
	ensureAuthenticated,
	ensureInternalService,
} from "../middleware/middleware.js";
import checkInternalApiKey from "../utils/checkInternalApiKey.js";

const router = express.Router();

router.get("/", async (req, res) => {
	// get users
	const users = await getDoc("users");

	// format users
	const formattedUsers = users.map((user) => {
		return {
			steamId: user.value.steamId,
			name: user.value.name,
			avatar: user.value.avatar,
			profileUrl: user.value.profileUrl,
			steamMemberSince: user.value.steamMemberSince,
		};
	});
	return res.send(formattedUsers);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const users = await getDoc("users", ["steamId", "==", id]);

	if (users.length === 0) {
		return res.status(404).send("User not found");
	}

	const user = users[0].value;
	const formattedUser = {
		steamId: user.steamId,
		name: user.name,
		avatar: user.avatar,
		profileUrl: user.profileUrl,
		steamMemberSince: user.steamMemberSince,
	};

	if (checkInternalApiKey(req.headers["internal-service"])) {
		formattedUser.id = users[0].key;
	}

	return res.send(formattedUser);
});

router.get("/byDocId/:id", ensureInternalService, async (req, res) => {
	const id = req.params.id;
	const user = await getDocByKey("users", id);

	if (user === null) {
		return res.status(404).send("User not found");
	}

	return res.send(user);
});

router.post("/", ensureInternalService, async (req, res) => {
	const user = req.body;

	// check if user is available in the database
	const users = await getDoc("users", ["steamId", "==", user.steamId]);
	if (users.length > 0) {
		return res.status(400).send("User already exists");
	}

	const createdUser = await addDoc("users", user);
	return res.status(201).send({
		id: createdUser.id,
		...user,
	});
});

export default router;
