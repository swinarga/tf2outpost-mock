// https://github.com/gitdagray/react-debounce/blob/main/react-debounce-complete/src/hooks/useDebounce.jsx
import { useEffect, useState } from "react";

// 1. function called with value and delay
// 2. value is set once the delay has passed
// 3. debounced value is returned
// 4. the return value of useEffect is a cleanup function that clears the timeout
const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const id = setTimeout(() => {
			console.log("setting debounced value: " + value);
			setDebouncedValue(value);
		}, delay);

		return () => {
			console.log("clearing timeout: " + id);
			clearTimeout(id);
		};
	}, [value, delay]);

	return debouncedValue;
};
export default useDebounce;
