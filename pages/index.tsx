import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { useSession, getSession } from "next-auth/react";
import { fetchNav } from "./../response/index";
import { IFacebookCollections, INav } from "../types";
import { AxiosResponse } from "axios";
import Sidebar from "./../components/Sidebar";
import Feed from "../components/Feed";

interface IpropsType {
	navbar: {
		items: INav[];
	};
	name: string;
	image: string;
}

const Home: NextPage<IpropsType> = ({ navbar }) => {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>Facebook Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{session ? (
				<>
					<Header />
					<main className="flex overflow-hidden bg-slate-50">
						<Sidebar />
						<Feed />
					</main>
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
	const { data: navbar }: AxiosResponse<IFacebookCollections<INav[]>> =
		await fetchNav();
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
			navbar: {
				items: navbar.data,
			},
		},
	};
};

export default Home;
