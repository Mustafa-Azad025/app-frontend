function SearchMenu() {
	return (
		<>
			<div className="absolute z-50 bg-white rounded-lg justify-center left-4 sm:left-24 shadow-md lg:w-80 w-72 top-14 sm:top-20 min-h-[18rem] p-2">
				<div className="flex items-center justify-between mx-4">
					<p className="font-medium select-none text-xs">
						Click Outside to exit
					</p>
					<p className=" font-medium select-none">Searching ....</p>
				</div>
			</div>
		</>
	);
}

export default SearchMenu;
