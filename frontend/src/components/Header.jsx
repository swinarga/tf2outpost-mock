import "./Header.css";
import tf2OutpostLogo from "/tf2outpost_logo.png";

export default function Header(props) {
	function logout() {
		window.open(
			import.meta.env.VITE_AUTH_SERVICE_URL + "/auth/logout",
			"_self"
		);
	}
	return (
		<div className="d-flex flex-row outpost-header align-items-center">
			<div className="outpost-logo-container">
				<img src={tf2OutpostLogo} className="outpost-logo" alt="" />
			</div>
			<input
				className="me-auto flex-grow-1 border-0 search-container shadow-none"
				type="text"
				placeholder="Search..."
			/>
			<div className="d-flex flex-row">
				{props.user ? (
					<>
						<div className="p-2">
							<a href={props.user.profileUrl}>
								<img
									src={props.user.avatar}
									alt=""
									className="avatar"
								/>
							</a>
						</div>
						<div className="p-2">{props.user.name}</div>
						<div className="p-2">
							<button onClick={logout}>Logout</button>
						</div>
					</>
				) : (
					// <ul className="list">
					// 	<li className="listItem">
					// 		<img
					// 			src={props.user.profilePicture}
					// 			alt=""
					// 			className="avatar"
					// 		/>
					// 	</li>
					// 	<li className="listItem">{props.user.displayName}</li>
					// 	<li className="listItem" onClick={logout}>
					// 		Logout
					// 	</li>
					// </ul>
					<a
						href={
							import.meta.env.VITE_AUTH_SERVICE_URL +
							"/auth/steam"
						}
					>
						<img className="p-2" src="/steam_login.png" alt="" />
					</a>
				)}
			</div>
			{/* <nav className="outpost-header navbar navbar-expand-lg navbar-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Brand
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a
									className="nav-link active"
									aria-current="page"
									href="#"
								>
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Link
								</a>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Dropdown
								</a>
								<ul
									className="dropdown-menu"
									aria-labelledby="navbarDropdown"
								>
									<li>
										<a className="dropdown-item" href="#">
											Action
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav> */}
		</div>
	);
}
