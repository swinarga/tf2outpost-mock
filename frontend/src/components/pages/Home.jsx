import { useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar";
import Header from "../Header";
import Listing from "../Listing";
import heroImage from "/hero.png";
import { AuthData } from "../../auth/AuthWrapper";

function Home() {
	const { user, login } = AuthData();

	useEffect(() => {
		async function getUser() {
			await login();
		}

		getUser();
	}, []);

	return (
		<div className="container-fluid p-0">
			<Header user={user} />

			<div className="d-flex flex-row">
				<Navbar />

				<div className="d-flex flex-column flex-grow-1 align-items-center">
					<div
						className="hero-container"
						style={{ backgroundImage: `url(${heroImage})` }}
					></div>
					<main className="d-flex flex-column align-items-center">
						<Listing />
						<Listing />
					</main>
				</div>
			</div>
		</div>
	);
}

export default Home;
