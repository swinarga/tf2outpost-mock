// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountKeyPath =
	process.env.SERVICE_ACCOUNT_KEY_PATH || "../../../serviceAccountKey.json";
const serviceAccountKey = JSON.parse(
	fs.readFileSync(serviceAccountKeyPath, "utf8")
);

// Initialize Firebase
const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccountKey),
});
const firestore = getFirestore(app);

async function addDoc(collection, value) {
	const res = await firestore.collection(collection).add(value);
	return res;
}

async function getDocByKey(collection, key) {
	const docRef = firestore.collection(collection).doc(key);
	const doc = await docRef.get();

	if (!doc.exists) {
		console.log("No such document!");
		return null;
	} else {
		console.log("Document data:", doc.data());
		return doc.data();
	}
}

async function getDoc(collection, filter = undefined) {
	// https://stackoverflow.com/questions/64682448/firestore-retrieve-single-document-by-field-value-and-update
	const querySnapshot = filter
		? await firestore
				.collection(collection)
				.where(...filter)
				.get()
		: await firestore.collection(collection).get();

	let d = [];
	if (querySnapshot.empty) {
		return d;
	}

	querySnapshot.forEach((doc) => {
		if (doc.exists) {
			d.push({
				key: doc.id,
				value: doc.data(),
			});
		}
	});

	return d;
}

export { firestore, addDoc, getDoc, getDocByKey };
