import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../../firebaseData";
import { useSession } from "next-auth/react";
import { FaUserAlt, FaShareAlt } from "react-icons/fa";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import Comments from "./Comments";
import {
	RiChat1Fill,
	RiHeartFill,
	RiHeartLine,
	RiGlobalLine,
} from "react-icons/ri";

function Post({ id, name, image, postImg, mail, time, message }: any) {
	const { data: session } = useSession();
	const { email }: any = session?.user;
	const fullname = email?.split("@")[0];
	const [big, setBig] = useState(false);
	const [likes, setLikes] = useState(false);
	const [likeCount, setLikeCount] = useState([]);
	const [count, setCount] = useState(0);
	const [option, setOption] = useState(false);
	const [comment, setComment] = useState([]);
	const [commentCount, setCommentCount] = useState(0);
	const [openComment, setOpenComment] = useState(false);
	const postDelete = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		deleteDoc(doc(db, "posts", id));
	};
	const namess =
		session?.user?.name == undefined ? fullname : session?.user?.name;
	const likePost = async () => {
		if (likes) {
			await deleteDoc(doc(db, "posts", id, "likes", email));
			setLikes(false);
		} else {
			await setDoc(doc(db, "posts", id, "likes", email), {
				username: `${
					session?.user?.name == undefined ? fullname : session?.user?.name
				}`,
			});
			setLikes(true);
		}
	};

	useEffect(
		() =>
			onSnapshot(collection(db, "posts", id, "likes"), (snapshot: any) => {
				setLikeCount(snapshot?.docs);
			}),
		[db, id]
	);
	useEffect(() => {
		onSnapshot(
			query(collection(db, "posts", id, "comments"), orderBy("time", "desc")),
			(snapshot: any) => {
				setComment(snapshot.docs);
			}
		);
	}, [db, id]);

	useEffect(() => {
		likeCount?.map((like: any) => {
			if (like?.id == email) {
				setLikes(true);
			}
		});
		setCount(likeCount?.length);
		setCommentCount(comment?.length);
	});

	return (
		<>
			<div className="bg-white p-2 rounded-2xl shadow-md text-gray-400 justify-center font-medium w-full">
				<div className="flex justify-between w-full">
					<div className="flex items-center space-x-5">
						{image == "" ? (
							<FaUserAlt className="h-12 w-12 text-mid " />
						) : (
							<Image
								className="rounded-full cursor-pointer h-12 w-12"
								src={image}
								width={60}
								height={60}
								alt={name}
							/>
						)}
						<div className="items-center">
							<h2 className="font-bold text-black">{name}</h2>
							<p className="text-gray-700 flex items-center">
								<Moment fromNow className="mr-2">
									{time}
								</Moment>
								• <RiGlobalLine className="w-4 h-4 ml-4 mt-[5px] text-mid" />
							</p>
						</div>
					</div>
					<div className="mt-3 items-center">
						<FiMoreVertical
							onClick={() => setOption(!option)}
							className="w-8 h-8 text-dark"
						/>
						{option &&
							(email == mail && name == namess ? (
								<div
									onClick={postDelete}
									className="w-36 absolute right-4 flex space-x-4 items-center h-fit p-1 py-2 bg-dark rounded-xl"
								>
									<MdDelete size="1.5rem" className="text-warn" />
									<p className="text-white">Delete Post</p>
								</div>
							) : (
								<div className="w-36 absolute right-4 flex space-x-4 items-center h-fit p-1 py-2 bg-dark rounded-xl">
									<FaShareAlt size="1.5rem" className="text-white" />
									<p className="text-white">Share</p>
								</div>
							))}
					</div>
				</div>
				<div className="mt-4">
					<p
						className={`text-black ml-4 xl:mx-10 ${!big && "truncate"} ${
							message.split(" ").length < 4 ? `my-4` : `mt-4`
						}`}
					>
						{message}
					</p>
					{message.split(" ").length > 4 && (
						<p
							onClick={() => setBig(!big)}
							className="text-primary cursor-pointer ml-4 xl:mx-10 my-2"
						>
							Read {!big ? `More` : `Less`}
						</p>
					)}
				</div>
				<div className="flex mx-auto justify-center">
					{postImg && (
						<Image
							src={postImg}
							loading="lazy"
							width={640}
							height={300}
							className="rounded-2xl h-auto"
							alt="image"
						/>
					)}
				</div>
				<div className="flex justify-around items-center mt-6 mb-3">
					<div
						onClick={likePost}
						className="flex cursor-pointer space-x-4 items-center"
					>
						{likes ? (
							<RiHeartFill size="1.5rem" className="text-warn" />
						) : (
							<RiHeartLine size="1.5rem" className="text-dark" />
						)}
						<div className="font-semibold text-primary text-sm flex space-x-2 items-center">
							<p className="text-base">{count}</p>
							<p>Like</p>
						</div>
					</div>
					<div
						onClick={() => setOpenComment(true)}
						className="flex space-x-2 cursor-pointer items-center"
					>
						<RiChat1Fill size="1.5rem" className="" />
						<div className="font-semibold text-sm flex space-x-2 items-center text-dark">
							<p className="text-base">{commentCount}</p>
							<p>Comment</p>
						</div>
					</div>
				</div>
			</div>
			{openComment && (
				<>
					<MdOutlineCancel
						size="2.5rem"
						onClick={() => setOpenComment(false)}
						className="text-primary relative z-[60] left-[85%] top-[-2rem] bg-white"
					/>
					<Comments ids={id} mail={mail} commentt={comment} />
				</>
			)}
		</>
	);
}

export default Post;
