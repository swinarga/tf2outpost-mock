import "./Item.css";

export default function Item(props) {
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

	return (
		<div
			className="item"
			style={{ backgroundImage: `url(${props.item.image_url})` }}
		>
			{/* props.item.name */}
		</div>
	);
}
