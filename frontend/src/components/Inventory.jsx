import Item from "./Item";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Inventory(props) {
	const [inv, setInv] = useState(null);

	useEffect(() => {
		function getInventory(steamId) {
			axios
				.get(
					import.meta.env.VITE_INV_SERVICE_URL +
						"/inventories/" +
						steamId,
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					if (res.status === 200) {
						setInv(res.data);
					}
				})
				.catch((err) => {
					console.error(`error: ${err}`);
				});
		}
		getInventory(props.steamId);
	});
	return (
		inv && (
			<ul className="item-container">
				{inv.items.map((item) => (
					<li key={item.original_id}>
						<Item item={item} />
					</li>
				))}
			</ul>
		)
	);
}
