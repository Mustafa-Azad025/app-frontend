import React, { useEffect } from "react";
function useclickOutside({ ref, func }: any) {
	useEffect(() => {
		const listner = (e: any) => {
			if (!ref.current || ref.current.contains(e.target)) {
				return;
			}
			func();
		};
		document.addEventListener("mousedown", listner);
		document.addEventListener("touchstart", listner);
		return () => {
			document.removeEventListener("mousedown", listner);
			document.removeEventListener("touchstart", listner);
		};
	}, [ref]);
	return <></>;
}

export default useclickOutside;
