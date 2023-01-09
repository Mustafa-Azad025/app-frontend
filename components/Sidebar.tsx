import {
	CalendarIcon,
	ChevronDownIcon,
	ClockIcon,
	ComputerDesktopIcon,
	ShoppingBagIcon,
	UserCircleIcon,
	UserGroupIcon,
	UsersIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import SidebarIcon from "./SidebarRow";
function Sidebar() {
	const { data: session, loading }: any = useSession();
	const { image, name } = session?.user;
	const fetch = session?.user?.email;
	const fullname = fetch?.split("@")[0];
	const compSideBar = [
		{
			icon: image == undefined ? UserCircleIcon : undefined,
			src: image == undefined ? undefined : image,
			title: name == undefined ? fullname : name,
		},
		{ icon: UsersIcon, title: "Friends" },
		{ icon: UserGroupIcon, title: "Groups" },
		{ icon: ShoppingBagIcon, title: "MarketPlace" },
		{ icon: ComputerDesktopIcon, title: "Watch" },
		{ icon: CalendarIcon, title: "Events" },
		{ icon: ClockIcon, title: "Memories" },
		{ icon: ChevronDownIcon, title: "Show More" },
	];
	return (
		<>
			<div className="p-2 pt-6 max-w-[20rem] xl:min-w-[15rem] space-y-8 bg-slate-50">
				{compSideBar.map((item, id) => (
					<SidebarIcon
						key={id}
						src={item.src}
						Icon={item.icon}
						title={item.title}
					/>
				))}
			</div>
		</>
	);
}

export default Sidebar;
