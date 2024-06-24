import { AuthData } from "../../auth/AuthWrapper";
import Inventory from "../Inventory";

export default function NewListing() {
	const { user } = AuthData();
	return (
		<div className="container text-center">
			<h1>New Listing</h1>
			<Inventory steamId={user.steamId} />
		</div>
	);
}
