import SearchMenu from "../SearchMenu";
import { BiSearch } from "react-icons/bi";
import {
	MdOutlineCancel,
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";
import useclickOutside from "../Utils/clickOutside";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
function HomePage() {
	const [down, setDown] = useState(false);
	const [search, setSearch] = useState(false);
	const [notifi, setNotifi] = useState(true);
	const [menu, setMenu] = useState(false);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const fullname = email?.split("@")[0];

	const el = useRef<HTMLDivElement>(null);
	useclickOutside({
		ref: el,
		func: () =>
			el.current == null ? el.current : (el.current.style.display = "none"),
	});
	const handlesignout = () => {
		signOut();
	};
	return (
		<>
			<div className="bg-light w-full h-screen rounded-r-3xl z-20">
				<div>
					<div className="flex mt-7 sm:mt-8 items-center ml-6">
						<BiSearch
							onClick={() => setSearch(!search)}
							className={`w-6 h-6 relative z-30`}
						/>
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
							className="p-1 sm:p-2 pl-10 sm:pl-14 -ml-8 rounded-3xl mr-2"
							placeholder="Search . . . ."
						/>
					</div>
					<div ref={el}>{down && <SearchMenu />}</div>
				</div>
				{notifi && (
					<div className="max-w-[16rem] sm:max-w-[18rem] bg-white p-2 mt-10 rounded-xl mx-2">
						<div className="flex justify-between">
							<div className="items-center mx-3 space-y-[0.2rem]">
								<Image
									src="/brand.png"
									width={90}
									height={50}
									className="w-20 h-5"
									alt="socialmediaicon"
								/>
								<p className="font-semibold text-sm text-center">About App</p>
							</div>
							<MdOutlineCancel
								size="1.5rem"
								onClick={() => setNotifi(false)}
								className="hover:text-mid text-dark cursor-pointer"
							/>
						</div>
						<div className="">
							<p className="max-w-xs mx-3 text-sm mt-4">
								This APP give you the ability to network with friends and
								relatives,giving them the ability to communicate and share
								instantly with individuals and groups. It enables you to share
								photos, watch videos, listen to songs etc.
							</p>
							<div className="flex justify-between items-center mx-3 mt-4">
								<h2 className="text-xs text-primary">By Mustafa Azad</h2>
								<h2 className="text-xs text-mid font-medium">Important Info</h2>
							</div>
						</div>
					</div>
				)}
				<h2 className="text-sm font-medium mt-6 ml-4">Recent Notification</h2>
				<div className="item-center text-center text-xs text-mid mt-16">
					No Notification Now
				</div>
				{menu && (
					<div className="absolute bottom-14 left-0 max-w-[21rem] sm:max-w-sm z-50 w-full rounded-r-3xl p-1 items-center select-none">
						<div className="rounded-lg flex justify-between px-4 py-2 text-sm font-medium text-dark bg-white hover:bg-secondary hover:text-mid">
							<Link href={`/profile/${fullname}`}>Profile</Link>
							<RiEdit2Fill />
						</div>

						<div
							onClick={handlesignout}
							className="rounded-lg px-4 flex justify-between py-2 text-sm font-medium text-dark bg-white hover:bg-secondary hover:text-mid"
						>
							Logout
							<FiLogOut />
						</div>
					</div>
				)}
				<div
					onClick={() => setMenu(!menu)}
					className="flex justify-between bg-primary select-none absolute bottom-0 left-0 max-w-[21rem] sm:max-w-sm z-50 w-full rounded-r-3xl p-1 py-2 xl:py-3 items-center"
				>
					<div className=" items-center flex space-x-8 z-50">
						{image == undefined ? (
							<FaUserAlt className="lg:w-[2rem] lg:h-[2rem] w-6 h-6 text-white ml-4" />
						) : (
							<Image
								className="rounded-full bg-secondary p-1 cursor-pointer ml-4"
								src={image}
								width={40}
								height={40}
								alt={name}
							/>
						)}
						<p className="whitespace-nowrap text-white font-semibold z-50">
							{name == undefined ? fullname : name}
						</p>
					</div>
					{menu ? (
						<MdOutlineKeyboardArrowDown size="1.6rem" className="text-white" />
					) : (
						<MdOutlineKeyboardArrowUp size="1.6rem" className="text-white" />
					)}
				</div>
			</div>
		</>
	);
}

export default HomePage;
