import React from "react";
import Link from "next/link";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoChatbubbleSharp, IoHome } from "react-icons/io5";
import { useRouter } from "next/router";

function Links() {
	const router = useRouter();
	const nav = [
		{ link: "/", icon: IoHome },
		{ link: "/chat", icon: IoChatbubbleSharp },
		{ link: "/group", icon: HiUserGroup },
		{ link: "/reel", icon: MdOutlineSlowMotionVideo },
	];
	return (
		<div className="space-y-10 mt-16 grid grid-cols-1">
			{nav.map((item, id) => (
				<div
					className={
						router.pathname === item.link || router.asPath === item.link
							? "bg-primary py-2 pl-10 md:pl-14 pr-4 -ml-5 md:-ml-8 mx-auto rounded-full text-light"
							: "text-primary mx-auto cursor-pointer"
					}
					key={id}
				>
					<Link href={item.link}>
						<item.icon className="xl:w-[2.4rem] xl:h-[2.4rem] md:w-[2rem] md:h-[2rem] w-6 h-6" />
					</Link>
				</div>
			))}
		</div>
	);
}

export default Links;
