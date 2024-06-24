import "./Listing.css";
import burningFlamesHongKongCone from "/hkc_bf.png";

export default function Listing(props) {
	return (
		<div className="container text-center listing">
			<div className="row d-flex align-items-stretch">
				<div className="col-sm p-0">
					<div className="container listing-want">
						<div className="row">
							<div className="listing-header d-flex flex-row p-3 gap-3">
								<a href="">hohinso</a>
								<span>wants to trade:</span>
							</div>
						</div>
						<div className="row">
							<ul className="item-container d-flex flex-row align-items-center">
								<li
									className="item"
									style={{
										backgroundImage: `url(${burningFlamesHongKongCone})`,
									}}
								></li>
								<li
									className="item"
									style={{
										backgroundImage: `url(${burningFlamesHongKongCone})`,
									}}
								></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-sm p-0">
					<div className="container listing-for">
						<div className="row">
							<div className="listing-header d-flex flex-row p-3 gap-3">
								<span className="me-auto">for:</span>
								<span>3 seconds ago</span>
							</div>
						</div>
						<div className="row">
							<ul className="item-container d-flex flex-row align-items-center">
								<li
									className="item"
									style={{
										backgroundImage: `url(${burningFlamesHongKongCone})`,
									}}
								></li>
								<li
									className="item"
									style={{
										backgroundImage: `url(${burningFlamesHongKongCone})`,
									}}
								></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="row listing-desc p-3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Suspendisse id convallis sapien. Cras elementum vulputate erat
				id lobortis. Nunc nisl diam, placerat eget quam sed, cursus
				consequat ex. Fusce porta vehicula condimentum. Etiam urna
				lectus, ultricies at arcu a, venenatis mollis tortor. Lorem
				ipsum dolor sit amet, consectetur adipiscing elit. Mauris
				facilisis sem eget turpis pharetra consequat id maximus orci.
				Etiam convallis risus eu posuere consequat. Donec elit justo,
				consequat id orci nec, fermentum consequat justo.
			</div>
		</div>
	);
}
