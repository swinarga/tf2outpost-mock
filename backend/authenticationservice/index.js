/**
 * Basic example demonstrating passport-steam usage within Express framework
 * This example uses Express's router to separate the steam authentication routes
 */
import express from "express";
import passport from "passport";
import SteamStrategy from "passport-steam";
import authRoutes from "./src/routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import axios from "axios";

dotenv.config();

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//	- This is called
passport.serializeUser((user, done) => {
	console.log("serializing user: ", user);

	// pass to cookie the ID of the user document
	// done automatically
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log("deserializing user: ", id);
	try {
		// private route to get user by document ID
		const res = await axios.get(
			process.env.USER_SERVICE_URL + "/users/byDocId/" + id,
			{
				headers: {
					"internal-service": process.env.INTERNAL_API_KEY,
				},
			}
		);
		const user = res.data;
		console.log("found user: ", user);
		done(null, user);
	} catch (error) {
		console.error(error);
		done(error);
	}
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(
	new SteamStrategy(
		{
			returnURL: `${process.env.AUTH_SERVICE_URL}/auth/steam/callback`,
			realm: process.env.AUTH_SERVICE_URL,
			apiKey: process.env.STEAM_API_KEY,
		},
		(identifier, profile, done) => {
			// asynchronous verification, for effect...
			console.log(`identifier: ${identifier}`);
			console.log(`profile: ${JSON.stringify(profile)}`);
			process.nextTick(async () => {
				const steamId = identifier.split("/").pop();

				if (steamId !== profile.id) {
					// steam id does not match
					console.error("steam id does not match");
					return done(new Error("steam id does not match"));
				}

				// make call to userservice
				// need internal api key to get document ID
				// which will be used to serialize and deserialize user
				try {
					console.log("checking if user exists: " + steamId);
					const res = await axios.get(
						process.env.USER_SERVICE_URL + "/users/" + steamId,
						{
							headers: {
								"internal-service":
									process.env.INTERNAL_API_KEY,
							},
						}
					);
					const user = res.data;
					return done(null, user);
				} catch (error) {
					// if user is not found, create user
					if (error.response.status === 404) {
						console.log("user not found. Creating user...");
						try {
							const res = await axios.post(
								process.env.USER_SERVICE_URL + "/users",
								{
									steamId: profile.id,
									name: profile.displayName,
									avatar: profile._json.avatarfull,
									profileUrl: profile._json.profileurl,
									steamMemberSince: profile._json.timecreated,
								},
								{
									headers: {
										"internal-service":
											process.env.INTERNAL_API_KEY,
									},
								}
							);
							const user = res.data;
							console.log(`created user: ${user}`);
							return done(null, user);
						} catch (error) {
							console.error(error);
							return done(error);
						}
					}
					console.error(error);
					return done(error);
				}
			});
		}
	)
);

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

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

let corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: "GET,POST,PUT,DELETE",
	credentials: true, // enable set cookie
};
app.use(cors(corsOptions));

app.use("/auth", authRoutes);

app.listen(3000);
console.log("Express server listening on port: " + 3000);
