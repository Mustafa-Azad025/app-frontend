import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRef } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { FaSmile } from "react-icons/fa";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebaseData";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { RiGlobalLine } from "react-icons/ri";
import Moment from "react-moment";
import { FiMoreVertical } from "react-icons/fi";
function Comments({ ids, mail, commentt }: any) {
	const [showEmoji, setShowEmoji] = useState(false);
	const inputRef = useRef(null);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const fullname = email?.split("@")[0];
	const [load, setLoad] = useState("");
	const [option, setOption] = useState(false);
	const [truncate, setTruncate] = useState(true);
	const addEmoji = (e: any) => {
		let sym = e.unified.split("-");
		let codesArray: any = [];
		sym.forEach((el: any) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setLoad(load + emoji);
	};
	const sendComment = async (e: any) => {
		e.preventDefault();
		if (!inputRef.current) return;
		await addDoc(collection(db, "posts", ids, "comments"), {
			comment: load,
			name: name == undefined ? fullname : name,
			image: image == undefined ? "" : image,
			email: email,
			time: serverTimestamp(),
		});
		setLoad("");
	};
	const postDelete = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		deleteDoc(doc(db, "posts", ids, "comments"));
	};
	const namess =
		session?.user?.name == undefined ? fullname : session?.user?.name;

	return (
		<>
			<div className="absolute align-middle items-center w-screen h-screen z-[60] backdrop-blur">
				<div className="flex flex-col align-middle bg-white md:h-1/2 lg:w-[55%] md:w-[48%] w-full h-full">
					<div className="flex w-full space-x-4 mt-3 ml-[-5%] md:ml-[-0%] justify-center">
						{image == undefined ? (
							<FaUserAlt className="h-10 w-10 ml-2 text-mid " />
						) : (
							<Image
								className="rounded-full cursor-pointer ml-2 sm:w-10 sm:h-10"
								src={image}
								width={35}
								height={35}
								alt={name}
							/>
						)}
						<form className="lg:w-[50%]">
							<input
								type="text"
								value={load}
								ref={inputRef}
								onChange={(e) => setLoad(e.target.value)}
								className="sm:w-full w-3/4 h-10 border border-dark rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent p-4 text-sm"
								placeholder={`Message Here . . .`}
							/>
							{load && (
								<div
									role="status"
									className="relative left-[50%] md:left-[85%]  top-3 z-50"
								>
									<svg
										aria-hidden="true"
										className="w-4 h-4 relative -top-10 right-0 bg-[#149FFF] rounded-full text-[#149FFF] text-2xl animate-spin fill-white"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							)}
							<div
								onClick={() => setShowEmoji(!showEmoji)}
								className={`items-center cursor-pointer relative w-fit left-[60%] sm:left-[90%] xl:left-[90%] ${
									load ? "top-[-60%]" : "top-[-50%]"
								} z-50`}
							>
								<FaSmile className="h-5 md:h-8 target:text-primary text-dark" />
							</div>
						</form>
						{showEmoji && (
							<div className="absolute -left-[5%] md:left-[unset] top-[10%] z-50 rounded-lg">
								<Picker data={data} onEmojiSelect={addEmoji} />
							</div>
						)}
					</div>
					<div className="md:w-full w-[90%] flex justify-center">
						<button
							className={`bg-primary rounded-full sm:mx-auto w-40 h-10 flex disabled:bg-secondary disabled:cursor-not-allowed text-white items-center`}
							disabled={load.trim() == ""}
							type="submit"
							onClick={sendComment}
						>
							<MdSend size="1.5rem" className="mx-auto p-1" />
						</button>
					</div>
					{commentt.length > 0 && (
						<div className="h-[110%] overflow-y-scroll">
							{commentt.map((comment: any) => (
								<div
									key={comment.id}
									className="w-[18rem] sm:mx-auto sm:w-[94%] xl:ml-2"
								>
									<div className="md:max-w-4xl mx-auto max-w-[88%] px-10 my-4 py-6 bg-white rounded-lg shadow-md">
										<div className="flex justify-between items-center">
											<span className="font-light text-gray-600">
												<Moment fromNow className="mr-2">
													{comment.data().time?.toDate()}
												</Moment>
											</span>
											<div className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
												<FiMoreVertical size="1.5rem" className="text-dark" />
											</div>
										</div>
										<div className="mt-2">
											<p
												className={
													truncate ? `truncate text-dark` : `text-dark`
												}
											>
												{comment.data().comment}
											</p>
										</div>
										<div className="flex justify-between items-center mt-4">
											<div onClick={() => setTruncate(!truncate)}>
												{comment.data().comment.split(" ").length > 5 && (
													<p className="text-primary cursor-pointer ml-4 xl:mx-10 my-2">
														Read {!truncate ? `More` : `Less`}
													</p>
												)}
											</div>
											<div>
												<div className="flex items-center">
													{comment.data().image == "" ? (
														<FaUserAlt className="h-8 w-8 mr-6 text-mid" />
													) : (
														<Image
															width={40}
															height={40}
															className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
															src={comment.data().image}
															alt={comment.data().name}
														/>
													)}
													<h1 className="text-dark font-bold">
														{comment.data().name}
													</h1>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
					{/* <div className="space-y-4 mt-2 w-4/5 h-40 overflow-y-scroll mx-4 scrollbar-hide overflow-x-hidden">
						{comments.map((comment) => (
						<div className="w-auto h-auto shadow-sm mx-auto">
							<div className="flex justify-between mx-2">
								<div className="flex items-center space-x-5">
									{image == "" ? (
										<FaUserAlt className="h-8 w-8 text-mid " />
									) : (
										<Image
											className="rounded-full cursor-pointer h-8 w-8"
											src={image}
											width={60}
											height={60}
											alt={name}
										/>
									)}
									<div className="items-center">
										<h2 className="font-bold text-dark text-sm">Mustafa</h2>
										<p className="text-mid text-xs flex items-center">
											<Moment fromNow className="mr-2">
									{time}
								</Moment>
											20 minutes ago •{" "}
											<RiGlobalLine className="w-4 h-4 ml-4 mt-[5px] text-mid" />
										</p>
									</div>
								</div>
								<div className="">
									<FiMoreVertical
										onClick={() => setOption(!option)}
										className="w-6 h-6 text-dark cursor-pointer"
									/>
									{option &&
										(email == mail && name == namess ? (
											<div onClick={postDelete} className="">
												<MdDelete size="1.5rem" className="text-warn" />
												<p className="text-white">Delete Post</p>
											</div>
										) : (
											<div className="">
												<FaShareAlt size="1.5rem" className="text-white" />
												<p className="text-white">Share</p>
											</div>
										))}
								</div>
							</div>
							<div className="max-w-lg mx-auto">
								<h2 className="font-semibold mt-6">Hii just checking</h2>
							</div>
						</div> */}
					{/* </div> */}
				</div>
			</div>
		</>
	);
}

export default Comments;
