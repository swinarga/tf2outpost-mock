import { useState } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import Inventory from "../Inventory";
import Item from "../Item";
import "./NewListing.css";

export default function NewListing() {
	const { user } = AuthData();
	const [tradableItemsMap, setTradableItemsMap] = useState(new Map());
	const [wantedItems, setWantedItems] = useState(new Map());
	const [forItems, setForItems] = useState(new Map());

	const handleRemoveItem = (itemId) => {
		setTradableItemsMap((prevTradableItemsMap) => {
			const newTradableItemsMap = new Map(prevTradableItemsMap);
			const prevItem = prevTradableItemsMap.get(itemId);
			newTradableItemsMap.delete(itemId);

			setWantedItems((prevWantedItems) => {
				const newWantedItems = new Map(prevWantedItems);
				newWantedItems.set(itemId, prevItem);
				return newWantedItems;
			});

			return newTradableItemsMap;
		});
	};

	const handleAddItem = (itemId, item) => {
		setTradableItemsMap((prevTradableItemsMap) => {
			const newTradableItemsMap = new Map(prevTradableItemsMap);
			newTradableItemsMap.set(itemId, item);

			setWantedItems((prevWantedItems) => {
				const newWantedItems = new Map(prevWantedItems);
				newWantedItems.delete(itemId);
				return newWantedItems;
			});

			return newTradableItemsMap;
		});
	};

	return (
		<div className="container text-center">
			{/* container for offer items */}
			<div className="container d-flex">
				<div className="container-fluid trade-container">
					<h1>Want:</h1>
					<ul className="container-fluid d-flex flex-row flex-wrap">
						{Array.from(wantedItems.values()).map((item) => (
							<Item
								key={item.original_id}
								item={item}
								onRemove={handleRemoveItem}
								onAdd={handleAddItem}
							/>
						))}
						<li className="item"></li>
					</ul>
				</div>
				<div className="container-fluid trade-container">
					<h1>For:</h1>
					<ul className="container-fluid d-flex flex-row flex-wrap">
						<li className="item"></li>
					</ul>
				</div>
			</div>

			<Inventory
				steamId={user.steamId}
				tradableItemsMap={tradableItemsMap}
				setTradableItemsMap={setTradableItemsMap}
				setWantedItems={setWantedItems}
				setForItems={setForItems}
				handleRemoveItem={handleRemoveItem}
				handleAddItem={handleAddItem}
			/>
		</div>
	);
}
