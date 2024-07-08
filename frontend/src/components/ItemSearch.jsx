import Item from "./Item";
import useSWR from "swr";
import axios from "axios";

export default function ItemSearch(props) {
	async function getItems(query) {
		const api = axios.create({
			baseURL: import.meta.env.VITE_INV_SERVICE_URL + "/schema/search",
		});
		const res = await api.request({
			params: {
				query: query,
			},
			withCredentials: true,
		});
		if (res.status !== 200 || !res.data.success) {
			return null;
		}

		return res.data;
	}

	const { isLoading, error, data } = useSWR(
		props.searchValue ? props.searchValue : null,
		getItems
	);

	let content;
	if (data) {
		if (data.data.length > 0) {
			content = data.data.slice(0, 50).map((item) => {
				return <Item item={item} />;
			});
		} else {
			content = <h1>No items found!</h1>;
		}
	} else {
		content = (
			<>
				<Item
					item={{
						name: "Mann Co. Supply Crate Key",
						defindex: 5021,
						level: 5,
						quality: { value: 6, color: "#FFD700" },
						image_url:
							"https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ/",
					}}
				/>
				<Item
					item={{
						name: "Refined Metal",
						defindex: 5002,
						level: 3,
						quality: { value: 6, color: "#FFD700" },
						image_url:
							"https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEbZQsUYhTkhzJWhsO1Mv6NGucF1Ygzt8ZQijJukFMiMrbhYDEwI1yRVKNfD6xorQ3qW3Jr6546DNPuou9IOVK4p4kWJaA/",
					}}
				/>
			</>
		);
	}

	return (
		<ul className="container-fluid justify-content-center d-flex flex-wrap">
			{content}
		</ul>
	);
}
