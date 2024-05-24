import express from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import * as OpenApiValidator from "express-openapi-validator";
import { getDocByKey } from "./src/firebase/firebase.js";
import cookieSession from "cookie-session";
import userRoutes from "./src/routes/users.js";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUI from "swagger-ui-express";
import jsYaml from "js-yaml";
import fs from "fs";
import bodyParser from "body-parser";

dotenv.config();

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//	- This is called
passport.serializeUser((user, done) => {
	console.log("serializing user: ", user);

	// pass to cookie
	// done automatically
	done(null, user.key);
});

passport.deserializeUser(async (id, done) => {
	console.log("deserializing user: ", id);
	const user = await getDocByKey("users", id);
	console.log("found user: ", user);
	done(null, user);
});

const app = express();

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
		keys: [process.env.COOKIE_KEY], // key for encryption
	}),
	(req, res, next) => {
		console.log(`after cookie-session: ${JSON.stringify(req.session)}`);
		next();
	}
);

// cookie-session incompatibility with passport: https://github.com/jaredhanson/passport/issues/904#issuecomment-1307558283
// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
	if (request.session && !request.session.regenerate) {
		request.session.regenerate = (cb) => {
			cb();
		};
	}
	if (request.session && !request.session.save) {
		request.session.save = (cb) => {
			cb();
		};
	}
	next();
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

// serve the OpenAPI schema
const public_spec_path = path.join(__dirname, "/api/api.yaml");
app.use("/spec", express.static(public_spec_path));

const public_spec = jsYaml.load(fs.readFileSync(public_spec_path, "utf8"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(public_spec));

app.use(
	OpenApiValidator.middleware({
		apiSpec: public_spec,
		validateResponses: true,
	})
);

app.use("/users", userRoutes);

app.listen(3001);
console.log("Express server listening on port: " + 3001);
