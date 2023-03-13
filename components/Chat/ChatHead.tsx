import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import useclickOutside from "../Utils/clickOutside";
import SearchMenu from "../SearchMenu";

function ChatHead() {
	const [menu, setMenu] = useState(false);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const fullname = email?.split("@")[0];
	const [down, setDown] = useState(false);
	const [search, setSearch] = useState(false);
	const handlesignout = () => {
		signOut();
	};
	const el = useRef<HTMLDivElement>(null);
	useclickOutside({
		ref: el,
		func: () =>
			el.current == null ? el.current : (el.current.style.display = "none"),
	});
	return (
		<>
			<div className="bg-light w-full h-screen rounded-r-3xl z-20">
				<div className="">
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
				<div className="mt-4">
					<h2 className="text-mid font-medium ml-4">Recent chat</h2>
					<div className="flow-root mt-4">
						<ul
							role="list"
							className="divide-y divide-gray-200 dark:divide-gray-700"
						>
							<li className="py-3 sm:py-4">
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										{image == undefined ? (
											<FaUserAlt className="w-8 h-8 rounded-full" />
										) : (
											<Image
												width={32}
												height={32}
												className="w-8 h-8 rounded-full"
												src={image}
												alt={name}
											/>
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-dark truncate">
											{name == undefined ? fullname : name}
										</p>
										<p className="text-xs text-mid truncate">{email}</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				{menu && (
					<div className="absolute bottom-14 select-none left-0 max-w-[19rem] sm:max-w-[22rem] z-50 w-full rounded-r-3xl p-1 items-center">
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
					className="flex justify-between select-none bg-primary absolute bottom-0 left-0 max-w-[20rem] sm:max-w-[22rem] z-50 w-full rounded-r-3xl p-1 py-2 xl:py-3 items-center"
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

export default ChatHead;
