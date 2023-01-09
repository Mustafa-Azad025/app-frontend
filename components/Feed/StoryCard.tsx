import Image from "next/image";

function StoryCard({ name, src, profile }: any) {
	return (
		<>
			<div className="relative lg:h-52 lg:w-32 md:h-24 md:w-24 sm:h-20 sm:w-20 h-16 w-16 mt-6 ">
				<Image
					src={src}
					width={40}
					height={40}
					className="absolute h-8 w-8 opacity-0 lg:opacity-100 rounded-full z-50 top-2 left-2"
					alt={name}
				/>
				<Image
					className="object-cover filter transition-all hover:brightness-105 brightness-75 delay-100 ease-in-out rounded-full lg:rounded-3xl"
					src={profile}
					layout="fill"
					alt={name}
				/>
				<p className="absolute opacity-0 lg:opacity-100 bottom-4 left-3 text-white text-sm font-semibold truncate">
					{name}
				</p>
			</div>
		</>
	);
}

export default StoryCard;
