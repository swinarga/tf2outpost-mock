import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Listing from "./components/Listing";
import heroImage from "/hero.png";

function App() {
	const [count, setCount] = useState(0);
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUser() {
			try {
				const res = await axios.get(
					import.meta.env.VITE_AUTH_SERVICE_URL +
						"/auth/login/success",
					{ withCredentials: true }
				);

				if (res.status !== 200) {
					throw new Error("not authenticated");
				}
				setUser(res.data.user);
			} catch (err) {
				console.log(err);
			}
		}

		getUser();
	}, []);

	return (
		<div className="container-fluid p-0">
			<div className="row p-0">
				<Header user={user} />
			</div>
			<div className="d-flex flex-row">
				<Navbar />

				<div className="col">
					<main className="d-flex flex-column">
						<div
							className="hero-container"
							style={{ backgroundImage: heroImage }}
						>
							dsadasd
							{/* <img src={heroImage} alt="" /> */}
						</div>
						<Listing />
					</main>

					{/* <h1>Vite + React</h1>
					<div className="card">
						<button onClick={() => setCount((count) => count + 1)}>
							count is {count}
						</button>
						<p>
							Edit <code>src/App.jsx</code> and save to test HMR
						</p>
					</div>
					<p className="read-the-docs">
						Click on the Vite and React logos to learn more
					</p>

					<div className="card">
						<button
							onClick={async () => {
								const res = await axios.get(
									"http://localhost:3000/auth/steam"
								);
								console.log(res);
							}}
						></button>
						<button
							onClick={async () => {
								const res = await axios.get(
									"http://localhost:3000/auth/test"
								);
								console.log(res);
							}}
						></button>
					</div> */}
				</div>
			</div>

			{/* <div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div> */}

			{/* <button
				onClick={() => {
					const logout = () => {
						window.open(
							import.meta.env.VITE_AUTH_SERVICE_URL +
								"/auth/logout"
						);
					};
					logout();
				}}
			>
				LOGOUT
			</button>
			{user ? user.displayName : "not logged in"} */}
		</div>
	);
}

export default App;
