import React, { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div>
			<h1>fghf</h1>
			{children}
		</div>
	);
};

export default Layout;
