import {
	AcademicCapIcon,
	CalendarDaysIcon,
	FilmIcon,
	FlagIcon,
	MagnifyingGlassIcon,
	NewspaperIcon,
	PuzzlePieceIcon,
	TvIcon,
	UserGroupIcon,
	UsersIcon,
} from "@heroicons/react/24/solid";
import React from "react";

function Menu() {
	const menu = [
		{
			icon: AcademicCapIcon,
			heading: "Campus",
			desc: "A unique, exclusive space for college students on Facebook.",
		},
		{
			icon: CalendarDaysIcon,
			heading: "Events",
			desc: "Organize or find events and other things to do online and nearby.",
		},
		{
			icon: UsersIcon,
			heading: "Find Friends",
			desc: "Search for friends or people you may know.",
		},
		{
			icon: UserGroupIcon,
			heading: "Groups",
			desc: "Connect with people who share your interests.",
		},
		{
			icon: NewspaperIcon,
			heading: "News Feed",
			desc: "See relevent posts from people and pages you follow.",
		},
		{
			icon: FlagIcon,
			heading: "Pages",
			desc: "Discover and connect with buisness on facebook.",
		},
	];

	const enterntainment = [
		{
			icon: FilmIcon,
			heading: "Gaming Video",
			desc: "Watch and connect with your favorite games and streamers",
		},
		{
			icon: PuzzlePieceIcon,
			heading: "Play Games",
			desc: "Play your favorite games",
		},
		{
			icon: TvIcon,
			heading: "Watch",
			desc: "A video destination persnalized to your intrests and connections.",
		},
	];
	const component = [
		{ mainhead: "Social", arr: menu },
		{ mainhead: "Entertainment", arr: enterntainment },
		{ mainhead: "Shopping", arr: null },
	];
	return (
		<>
			<div className="absolute right-4 top-16 bg-slate-100 w-96 z-[100] h-[30rem] overflow-x-hidden overflow-y-scroll scroll-smooth rounded-xl shadow-md">
				<h1 className="font-bold text-4xl text-left mx-4 my-2">Menu</h1>
				<p className="text-xs mx-5 my-2 text-left">Click Outside To Exit</p>
				<div className="bg-white rounded-xl pb-6 mx-1">
					<div className="flex">
						<MagnifyingGlassIcon className="w-6 h-6 relative mt-4 ml-6 text-gray-600 sm:mr-[-2rem] mr-4 " />
						<input
							type="search"
							name="text"
							className="bg-slate-200 border-blue-500 outline-blue-100 rounded-2xl h-8 mt-3 px-10"
							placeholder="Search . . . ."
						/>
					</div>
					{component.map((data, id) => (
						<div key={id}>
							<h2 className="text-lg font-medium text-left m-6">
								{data.mainhead}
							</h2>
							<div className="text-left space-y-4">
								{data?.arr?.map((item, id) => (
									<div key={id} className="flex items-center m-4">
										<item.icon className="w-10 h-10 text-blue-600 mr-3" />
										<div>
											<h3 className="font-medium text-lg">{item.heading}</h3>
											<p className="text-sm text-gray-500">{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Menu;
