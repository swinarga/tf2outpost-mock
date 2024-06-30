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
						const tradableItems = new Map();
						res.data.items
							.filter((item) => item.tradable)
							.forEach((item) =>
								tradableItems.set(item.original_id, item)
							);
						props.setTradableItemsMap(tradableItems);
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
				{props.tradableItemsMap
					? Array.from(props.tradableItemsMap.values()).map(
							(item) => (
								<Item
									key={item.original_id}
									item={item}
									onRemove={props.handleRemoveItem}
									onAdd={props.handleAddItem}
									isInInventory={true}
								/>
							)
					  )
					: Array.from(inv.items).map((item) => {
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
