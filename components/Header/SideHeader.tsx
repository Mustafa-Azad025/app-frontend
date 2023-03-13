import React, { ReactNode } from "react";
import Image from "next/image";
import Links from "./Links";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface Props {
	children?: ReactNode;
}

function SideHeader({ children }: Props) {
	const [show, setShow] = React.useState(false);
	return (
		<>
			<div className="md:w-20 w-16 h-screen bg-light z-10">
				<div className="m-2 mt-5">
					<Image
						width={60}
						height={60}
						className="md:w-16 md:h-16 w-12 h-12"
						src="/logo.png"
						alt="social media app"
					/>
				</div>
				<Links />
			</div>
			{show ? (
				<div
					onClick={() => setShow(!show)}
					className="bg-light absolute z-20 right-0 top-0 h-fit w-fit rounded-l-full md:hidden"
				>
					<BsArrowLeftShort size="2.5rem" className="text-primary ml-1" />
				</div>
			) : (
				<div
					onClick={() => setShow(!show)}
					className="bg-light h-fit w-fit z-10 rounded-r-full md:hidden"
				>
					<BsArrowRightShort size="2.5rem" className="text-primary ml-1" />
				</div>
			)}

			<div className={show ? `inline-flex z-10` : `hidden md:inline-flex`}>
				{children}
			</div>
		</>
	);
}

export default SideHeader;
