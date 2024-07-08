import { useState } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import Inventory from "../Inventory";
import Item from "../Item";
import ItemSearch from "../ItemSearch";
import "./NewListing.css";
import useDebounce from "../../hooks/useDebounce";

export default function NewListing() {
	const { user } = AuthData();
	const [searchValue, setSearchValue] = useState("");
	const debouncedSearchValue = useDebounce(searchValue, 1000);
	const [tradableItems, setTradableItems] = useState([]);
	const [wantedItems, setWantedItems] = useState([]);
	const [forItems, setForItems] = useState([]);
	const [display, setDisplay] = useState("inventory-search");

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
						<li
							className="item"
							onClick={() => setDisplay("inventory-search")}
						></li>
					</ul>
				</div>
				<div className="container-fluid trade-container">
					<h1>For:</h1>
					<ul className="container-fluid d-flex flex-row flex-wrap">
						{forItems.map((item) => (
							<Item
								key={item.original_id}
								item={item}
								onRemove={handleRemoveItem}
								onAdd={handleAddItem}
							/>
						))}
						<li
							className="item for-item"
							onClick={() => setDisplay("item-search")}
						></li>
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

			{display === "inventory-search" ? (
				<Inventory
					steamId={user.steamId}
					searchValue={searchValue}
					tradableItems={tradableItems}
					setTradableItems={setTradableItems}
					setWantedItems={setWantedItems}
					handleRemoveItem={handleRemoveItem}
					handleAddItem={handleAddItem}
				/>
			) : (
				<ItemSearch
					searchValue={debouncedSearchValue}
					setForItems={setForItems}
				/>
			)}
		</div>
	);
}
