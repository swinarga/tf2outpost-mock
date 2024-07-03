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
						const tradableItems = res.data.items.filter(
							(item) => item.tradable
						);
						props.setTradableItems(tradableItems);
					}
				})
				.catch((err) => {
					console.error(`error: ${err}`);
				});
		}
		if (!inv) {
			getInventory(props.steamId);
		}
	});

	return (
		inv && (
			<ul className="container-fluid justify-content-center d-flex flex-wrap">
				{props.tradableItems
					? props.tradableItems
							.filter((item) =>
								item.name
									.toLowerCase()
									.includes(props.searchValue.toLowerCase())
							)
							.map((item) => (
								<Item
									key={item.original_id}
									item={item}
									onRemove={props.handleRemoveItem}
									onAdd={props.handleAddItem}
									isInInventory={true}
								/>
							))
					: inv.items
							.filter((item) =>
								item.name.includes(props.searchValue)
							)
							.map((item) => {
								<Item
									key={item.original_id}
									item={item}
									onRemove={props.handleRemoveItem}
									onAdd={props.handleAddItem}
									isInInventory={true}
								/>;
							})}
			</ul>
		)
	);
}
