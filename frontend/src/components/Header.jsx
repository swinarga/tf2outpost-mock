import "./Header.css";
import tf2OutpostLogo from "/tf2outpost_logo.png";
import { AuthData } from "../auth/AuthWrapper";

export default function Header(props) {
	const { logout } = AuthData();

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
		</div>
	);
}
