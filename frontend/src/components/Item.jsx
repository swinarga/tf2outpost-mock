import { useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import "./Item.css";
import { Popover } from "bootstrap";

function createItemDescription(item) {
	return (
		<div>
			<div className="item-title">
				{item.custom_name ? (
					<strong>"{item.custom_name}"</strong>
				) : (
					<strong>{item.name}</strong>
				)}
				<br />
				Level {item.level}
			</div>
			<div className="item-description">
				{item.custom_name && <p>Real Name: {item.name}</p>}
				{item.effect && <p>Effect: {item.effect}</p>}
				{item.sheen && <p>Sheen: {item.sheen}</p>}
				{item.killstreaker && <p>Killstreaker: {item.killstreaker}</p>}
				{item.paint && <p>Painted: {item.paint.name}</p>}
				{item.custom_description && (
					<p>Custom Desc: "{item.custom_description}"</p>
				)}
				{item.quantity > 1 && <p>Quantity: {item.quantity}</p>}
			</div>
		</div>
	);
}

export default function Item(props) {
	const popoverRef = useRef();
	// const item = props.item;
	// const itemName = props.itemName;
	// const itemId = props.item.original_id;
	// const itemLevel = props.itemLevel;
	// const itemQuality = props.itemQuality;
	// const itemQuantity = props.itemQuantity;
	// const itemImageUrl = props.item.image_url;
	// const itemCustomName = props.item.custom_name;
	// const itemCustomDescription = props.item.custom_description;
	// const itemSheen = props.item.sheen;
	// const itemKillstreaker = props.item.killstreaker;
	// const itemPaint = props.item.paint;

	useEffect(() => {
		const popover = new Popover(popoverRef.current, {
			placement: "bottom",
			trigger: "hover",
			html: true,
			content: renderToString(createItemDescription(props.item)),
		});

		// TODO: keep popover alive while being hovered
		// https://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popovers-alive-while-being-hovered/77983489#77983489

		return () => {
			popover.dispose();
		};
	}, [props.item]);

	const handleClick = () => {
		if (props.isInInventory) {
			props.onRemove(props.item.original_id);
		} else {
			props.onAdd(props.item.original_id, props.item);
		}
	};

	return (
		<li
			className="item"
			style={{
				border: `1px solid ${props.item.quality.color}`,
			}}
			ref={popoverRef}
			onClick={handleClick}
		>
			<div
				className="item-icon"
				style={{
					backgroundImage: `url(${props.item.image_url})`,
				}}
			></div>
			{/* <a href={"http://backpack.tf/item/" + props.item.original_id}>
				
			</a> */}
			{props.item.paint && (
				<div
					className="paint"
					style={{ background: `${props.item.paint.hex}` }}
				></div>
			)}
		</li>
	);
}
