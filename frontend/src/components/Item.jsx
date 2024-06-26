import { useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import "./Item.css";
import { Popover } from "bootstrap";

function createItemDescription(item) {
	return (
		<div>
			<span>{item.name}</span>
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

		return () => {
			popover.dispose();
		};
	}, [props.item]);

	return (
		<span
			className="item"
			style={{
				backgroundImage: `url(${props.item.image_url})`,
				border: `1px solid ${props.item.quality.color}`,
			}}
			ref={popoverRef}
		></span>
	);
}
