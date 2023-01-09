import {
	onSnapshot,
	collection,
	query,
	orderBy,
	serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebaseData";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
	EllipsisVerticalIcon,
	GlobeAsiaAustraliaIcon,
	HeartIcon,
	UserCircleIcon,
} from "@heroicons/react/24/solid";

function Posts() {
	const [post, setPost]: any = useState([]);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const fullname = email?.split("@")[0];

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, "posts"), orderBy("timestamp", "desc")),
				(snapshot) => {
					setPost(snapshot.docs);
				}
			),
		[db]
	);
	// console.log(post);
	return (
		<>
			<div className="overflow-x-hidden bg-white p-2 rounded-2xl shadow-md text-gray-400 justify-center font-medium mt-6 mx-auto xl:-ml-56">
				{/* {post.map((post: any) => (
					<div>
						
					</div>
				))} */}
				<div className="flex justify-between w-full">
					<div className="flex items-center space-x-5">
						{image == undefined ? (
							<UserCircleIcon className="h-16 w-16 text-gray-600 " />
						) : (
							<Image
								className="rounded-full cursor-pointer"
								src={image}
								width={60}
								height={60}
								alt={name == undefined ? fullname : name}
							/>
						)}
						<div className="items-center">
							<h2 className="font-bold text-black">
								{name == undefined ? fullname : name}
							</h2>
							<p className="text-gray-700 flex items-center">
								3 hour ago •{" "}
								<GlobeAsiaAustraliaIcon className="w-4 h-4 ml-4 mt-[5px] text-gray-700" />
							</p>
						</div>
					</div>
					<div className="mt-3">
						<EllipsisVerticalIcon className="w-10 h-10 text-gray-800" />
					</div>
				</div>
				<div className="mt-4">
					<p className="text-black ml-4 my-4 text-lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quod
					</p>
				</div>
				<div className="flex mx-auto justify-center">
					<Image
						src="https://images.unsplash.com/photo-1493754322906-7fb64aa10741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80"
						width={640}
						height={300}
						className="rounded-2xl h-auto "
						alt="image"
					/>
				</div>
				<div className="flex justify-evenly items-center mt-4">
					<HeartIcon className="w-4 h-4 text-black outline-2 outline-red-500" />
				</div>
			</div>
		</>
	);
}

export default Posts;
