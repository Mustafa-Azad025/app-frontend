import Image from "next/image";

function SidebarIcon({ src, Icon, title }: any) {
	return (
		<>
			<div className="flex space-x-4 items-center">
				{src && (
					<Image
						className="rounded-full"
						src={src}
						width={30}
						height={30}
						layout="fixed"
						alt={title}
					/>
				)}
				{Icon && <Icon className="lg:h-8 lg:w-8 h-6 w-6 text-blue-500" />}
				<p className="hidden md:inline-flex font-medium lg:text-base text-sm">
					{title}
				</p>
			</div>
		</>
	);
}

export default SidebarIcon;
