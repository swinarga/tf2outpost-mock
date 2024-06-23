import { createContext, useContext, useState } from "react";
import { RenderRoutes } from "../components/structure/RenderNavigation";
import axios from "axios";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
	const [user, setUser] = useState(null);

	const login = async () => {
		try {
			const res = await axios.get(
				import.meta.env.VITE_AUTH_SERVICE_URL + "/auth/login/success",
				{ withCredentials: true }
			);

			if (res.status !== 200) {
				throw new Error("not authenticated");
			}
			setUser(res.data.user);
		} catch (err) {
			console.log(err);
		}
	};
	const logout = () => {
		window.open(
			import.meta.env.VITE_AUTH_SERVICE_URL + "/auth/logout",
			"_self"
		);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			<>
				<RenderRoutes />
			</>
		</AuthContext.Provider>
	);
};
