import React from "react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import SideHeader from "../components/Header/SideHeader";

function group() {
	return (
		<>
			<SideHeader></SideHeader>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};

export default group;
