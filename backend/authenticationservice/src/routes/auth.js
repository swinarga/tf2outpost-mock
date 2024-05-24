import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/logout", (req, res) => {
	// cookie is still present, but the identifier is much shorter
	req.logout((err) => {
		if (err) {
			console.error(err);
		}
		console.log("logged out");
	});
	res.redirect(process.env.CLIENT_URL);
});

router.get("/login/success", (req, res) => {
	if (req.user) {
		return res.status(200).json({
			success: true,
			message: "user has successfully authenticated",
			user: req.user,
		});
	}

	return res.status(401).json({
		success: false,
		message: "user has not authenticated",
	});
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		message: "failure",
	});
});

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return

router.get("/steam", passport.authenticate("steam", { failureRedirect: "/" }));

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
	"/steam/callback",
	// Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
	function (req, res, next) {
		req.url = req.originalUrl;
		console.log(`original url: ${req.url}`);

		next();
	},
	passport.authenticate("steam", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

export default router;
