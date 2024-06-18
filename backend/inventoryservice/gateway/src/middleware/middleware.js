import checkInternalApiKey from "../utils/checkInternalApiKey.js";

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
export function ensureAuthenticated(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
}

export function ensureInternalService(req, res, next) {
	const apiKey = req.headers["internal-service"];

	if (!checkInternalApiKey(apiKey)) {
		return res.status(403).json({ message: "Forbidden" });
	}

	next();
}
