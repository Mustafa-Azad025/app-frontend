import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	HomeIcon,
	FlagIcon,
	MagnifyingGlassIcon,
	PlayCircleIcon,
	ShoppingCartIcon,
	UserGroupIcon,
	BellIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	ArrowRightOnRectangleIcon,
	PencilSquareIcon,
	UserCircleIcon,
	Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Icons from "./Icons";
import SearchMenu from "./SearchMenu";
import { useRef } from "react";
import useclickOutside from "../components/Utils/clickOutside";
import Menu from "./Menu/Menu";

interface value {
	Icon: any;
	image: string;
}

const Header = () => {
	const { data: session } = useSession();
	const { image, name }: any = session?.user;
	const [show, setShow] = useState(false);
	const [down, setDown] = useState(false);
	const [menu, setMenu] = useState(false);
	const fetch = session?.user?.email;
	const fullname = fetch?.split("@")[0];
	const el = useRef<HTMLDivElement>(null);
	const sq = useRef<HTMLDivElement>(null);
	useclickOutside({
		ref: el,
		func: () =>
			el.current == null ? el.current : (el.current.style.display = "none"),
	});
	useclickOutside({
		ref: sq,
		func: () =>
			sq.current == null ? sq.current : (sq.current.style.display = "none"),
	});
	const handlesignout = () => {
		signOut();
	};
	const nav = [
		{
			icon: HomeIcon,
			link: "/",
		},
		{
			icon: FlagIcon,
			link: "/saved",
		},
		{
			icon: PlayCircleIcon,
			link: "/reel",
		},
		{
			icon: ShoppingCartIcon,
			link: "/shop",
		},
		{
			icon: UserGroupIcon,
			link: "/group",
		},
	];
	return (
		<>
			<div className="sm:w-full w-screen mx-auto sm:mx-0 justify-between flex sticky shadow-md">
				{/* facebook icon and serch bar */}
				<div className="m-2 flex item-center">
					<Image
						width={50}
						height={50}
						className="h-10 w-10 mt-2 lg:mt-0 lg:w-[50px] lg:h-[50px]"
						src="/logo.png"
						alt="facebook"
					/>
					<MagnifyingGlassIcon className="w-6 h-6 relative mt-4 ml-6 text-gray-600 sm:mr-[-2rem] mr-4 " />
					<input
						type="search"
						name="text"
						onClick={() => {
							el.current == null
								? el.current
								: (el.current.style.display = "block");
							if (down == false) {
								setDown(true);
							}
						}}
						className="bg-slate-200 border-blue-500 outline-blue-100 hidden lg:inline-flex rounded-2xl h-8 mt-3 pl-10 -mr-56"
						placeholder="Search . . . ."
					/>
					<div ref={el}>{down && <SearchMenu />}</div>
				</div>
				{/* all links in navbar */}
				<div className="sm:flex hidden md:space-x-0 mx-auto sm:-pl-8 lg:ml-72 xl:ml-auto">
					{nav.map((item, id) => (
						<Link key={id} href={item.link}>
							<Icons Icon={item.icon} />
						</Link>
					))}
				</div>
				<div className="justify-end text-end items-center flex sm:justify-items-end sm:space-x-3">
					<div
						onClick={() => setShow(!show)}
						className={
							image == undefined
								? "mr-3 mt-1 flex rounded-3xl p-1 select-none cursor-pointer space-x-3 bg-slate-200 items-center"
								: "mr-3 mt-1 flex rounded-3xl select-none cursor-pointer space-x-3 bg-slate-200 items-center"
						}
					>
						{image == undefined ? (
							<UserCircleIcon className="h-6 w-6 text-gray-600 " />
						) : (
							<Image
								className="rounded-full cursor-pointer"
								src={image}
								width={35}
								height={35}
								alt={name}
							/>
						)}
						<p className="whitespace-nowrap text-sm hidden sm:inline-flex font-medium">
							{name == undefined ? fullname : name}
						</p>
						{!show ? (
							<ChevronDownIcon className="h-4 w-4 hidden sm:inline-flex hover:text-blue-700" />
						) : (
							<ChevronUpIcon className="h-4 w-4 hidden sm:inline-flex hover:text-blue-700" />
						)}
						{show && (
							<>
								<div className="fixed sm:flex items-center hidden justify-between hover:bg-slate-100 font-semibold top-[3.6rem] right-[6.5rem] p-2 rounded-3xl w-40 ">
									<Link href={`/profile/${fullname}`}>
										<div className="pr-20">Profile</div>
									</Link>
									<Link href={`/profile/${fullname}`}>
										<PencilSquareIcon className="h-4 w-4 hover:text-blue-700" />
									</Link>
								</div>
								<div
									className="fixed sm:flex hidden items-center justify-between hover:bg-slate-100 font-semibold top-[5.8rem] right-[6.5rem] p-2 rounded-3xl w-40 "
									onClick={handlesignout}
								>
									Logout
									<ArrowRightOnRectangleIcon className="h-4 w-4 hover:text-blue-700" />
								</div>
							</>
						)}
					</div>
					<div className="lg:-mt-2 -mt-5 space-x-3 mr-3 sm:mr-0 items-center flex">
						<Squares2X2Icon
							onClick={() => {
								sq.current == null
									? sq.current
									: (sq.current.style.display = "block");
								if (menu == false) {
									setMenu(true);
								}
							}}
							className="lg:h-9 lg:w-9 sm:h-8 sm:w-8 lg:mt-4 h-8 w-8 p-1 mt-6 mx-auto hover:text-[#149FFF] cursor-pointer text-gray-600 bg-slate-200 rounded-full"
						/>
						<div ref={sq}>{menu && <Menu />}</div>
						<Link href={`/profile/${fullname}`}>
							<BellIcon className="lg:h-9 lg:w-9 sm:h-8 sm:w-8 lg:mt-4 h-8 w-8 p-1 mt-6 mx-auto hover:text-[#149FFF] cursor-pointer text-gray-600 bg-slate-200 rounded-full" />
						</Link>
						<ArrowRightOnRectangleIcon
							onClick={handlesignout}
							className=" sm:hidden h-8 p-1 w-8 mt-6 mx-auto hover:text-[#149FFF] cursor-pointer text-gray-600 bg-slate-200 rounded-full"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
