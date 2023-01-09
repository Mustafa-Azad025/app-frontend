import StoryCard from "./StoryCard";

function Stories() {
	const story = [
		{
			name: "Tesla",
			src: "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80",
			profile:
				"https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
		},
		{
			name: "SpaceX",
			src: "https://images.unsplash.com/photo-1652017679773-10ff773653f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
			profile:
				"https://images.unsplash.com/photo-1628126235206-5260b9ea6441?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
		},
		{
			name: "Apple",
			src: "https://images.unsplash.com/photo-1621768216002-5ac171876625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
			profile:
				"https://images.unsplash.com/photo-1627882278101-88cac371b54f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
		},
		{
			name: "Google",
			src: "https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
			profile:
				"https://images.unsplash.com/photo-1511296265581-c2450046447d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
		},
		{
			name: "WebXcity",
			src: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
			profile:
				"https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
		},
	];
	return (
		<>
			<div className="flex justify-center overflow-x-scroll space-x-3 mx-auto xl:-ml-56">
				{story.map((item, id) => (
					<StoryCard
						key={id}
						name={item.name}
						src={item.src}
						profile={item.profile}
					/>
				))}
			</div>
		</>
	);
}

export default Stories;
