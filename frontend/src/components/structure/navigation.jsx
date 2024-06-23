import Home from "../Home.jsx";
import NewListing from "../pages/NewListing.jsx";
import Profile from "../pages/Profile.jsx";
import { Navigate } from "react-router-dom";

export const nav = [
	{ path: "/", name: "Home", element: <Home /> },
	{ path: "/profiles/:id", name: "Profile", element: <Profile /> },
	{
		path: "/listings/new/",
		name: "NewListing",
		element: <NewListing />,
		isPrivate: true,
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
];
