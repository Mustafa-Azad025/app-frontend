function SearchMenu() {
	return (
		<>
			<div className="absolute z-50 bg-white rounded-lg left-4 shadow-md w-80 top-16 min-h-[18rem] p-2">
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
