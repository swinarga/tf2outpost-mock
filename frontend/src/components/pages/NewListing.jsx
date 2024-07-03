import { useState } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import Inventory from "../Inventory";
import Item from "../Item";
import "./NewListing.css";

export default function NewListing() {
	const { user } = AuthData();
	const [searchValue, setSearchValue] = useState("");
	const [tradableItems, setTradableItems] = useState([]);
	const [wantedItems, setWantedItems] = useState([]);
	const [forItems, setForItems] = useState([]);

	const handleRemoveItem = (itemId) => {
		const prevItem = tradableItems.find(
			(item) => item.original_id === itemId
		);

		setTradableItems((prevTradableItems) => {
			const newTradableItems = prevTradableItems.filter(
				(item) => item.original_id !== itemId
			);
			return newTradableItems;
		});
		setWantedItems((prevWantedItems) => {
			const newWantedItems = prevWantedItems.concat(prevItem);
			return newWantedItems;
		});
	};

	const handleAddItem = (itemId, item) => {
		setTradableItems((prevTradableItems) => {
			const newTradableItems = [item].concat(prevTradableItems);
			return newTradableItems;
		});
		setWantedItems((prevWantedItems) => {
			const newWantedItems = prevWantedItems.filter(
				(item) => item.original_id !== itemId
			);
			return newWantedItems;
		});
	};

	return (
		<div className="container text-center">
			{/* container for offer items */}
			<div className="container d-flex">
				<div className="container-fluid trade-container">
					<h1>Want:</h1>
					<ul className="container-fluid d-flex flex-row flex-wrap">
						{wantedItems.map((item) => (
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
			<form class="form-inline">
				<input
					className="form-control mr-sm-2"
					value={searchValue}
					type="search"
					placeholder="Search"
					aria-label="Search"
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
				/>
			</form>

			<Inventory
				steamId={user.steamId}
				searchValue={searchValue}
				tradableItems={tradableItems}
				setTradableItems={setTradableItems}
				setWantedItems={setWantedItems}
				setForItems={setForItems}
				handleRemoveItem={handleRemoveItem}
				handleAddItem={handleAddItem}
			/>
		</div>
	);
}
