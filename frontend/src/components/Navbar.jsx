import "./Navbar.css";
import inventoryIcon from "/backpack.svg";
import tradeIcon from "/ph_swap.svg";
import offerIcon from "/ph_chat.svg";
import searchIcon from "/ph_magnifying-glass.svg";

export default function Navbar(props) {
	return (
		<div className="d-flex flex-column outpost-navbar align-items-center">
			<div className="outpost-icon-container">
				<a href="">
					<img className="outpost-icon" src={inventoryIcon} alt="" />
				</a>
			</div>
			<div className="outpost-icon-container">
				<a href="">
					<img className="outpost-icon" src={tradeIcon} alt="" />
				</a>
			</div>
			<div className="outpost-icon-container">
				<a href="">
					<img className="outpost-icon" src={offerIcon} alt="" />
				</a>
			</div>
			<div className="outpost-icon-container">
				<a href="">
					<img className="outpost-icon" src={searchIcon} alt="" />
				</a>
			</div>
		</div>
	);
	// return (
	// 	<div className="outpost-navbar p-0">
	// 		<nav className="navbar-nav navbar-vertical ">
	// 			<div className="container-fluid">
	// 				<ul class="nav flex-column">
	// 					<li class="nav-item">
	// 						<a class="nav-link active" href="#">
	// 							Active
	// 						</a>
	// 					</li>
	// 					<li class="nav-item">
	// 						<a class="nav-link" href="#">
	// 							Link
	// 						</a>
	// 					</li>
	// 					<li class="nav-item">
	// 						<a class="nav-link" href="#">
	// 							Link
	// 						</a>
	// 					</li>
	// 					<li class="nav-item">
	// 						<a class="nav-link disabled" href="#">
	// 							Disabled
	// 						</a>
	// 					</li>
	// 				</ul>
	// 				<box-icon name="rocket"></box-icon>
	// 				{/* <span className="logo">
	//         <Link className="link" to="/">
	//           Lama App
	//         </Link>
	//       </span> */}
	// 			</div>
	// 		</nav>
	// 	</div>
	// );
}
