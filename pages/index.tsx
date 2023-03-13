import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import { fetchNav } from "./../response/index";
import { IFacebookCollections, INav } from "../types";
import { AxiosResponse } from "axios";
import Feed from "../components/Home/Feed";
import SideHeader from "../components/Header/SideHeader";
import HomePage from "./../components/Home/HomePage";

interface IpropsType {
	navbar: {
		items: INav[];
	};
	name: string;
	image: string;
}

// const Home: NextPage<IpropsType> = ({ navbar }) => {
const Home: NextPage<IpropsType> = () => {
	const { data: session } = useSession();
	return (
		<>
			<Head>
				<title>PostR</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{session ? (
				<>
					<div className="flex overflow-hidden">
						<SideHeader>
							<HomePage />
						</SideHeader>
						<Feed />
					</div>
				</>
			) : (
				<>
					<h1 className="text-5xl font-bold m-auto w-full h-full">
						Sorry To Say,
						<br /> Some Error Occurs
					</h1>
				</>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	// const { data: navbar }: AxiosResponse<IFacebookCollections<INav[]>> =
	// 	await fetchNav();
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
		props: {
			session,
			// navbar: {
			// 	items: navbar.data,
			// },
		},
	};
};

export default Home;
