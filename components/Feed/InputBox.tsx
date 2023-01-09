import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
	FaceSmileIcon,
	PhotoIcon,
	UserCircleIcon,
	VideoCameraIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { db, storage } from "../../firebaseData";
import {
	onSnapshot,
	collection,
	query,
	orderBy,
	addDoc,
	serverTimestamp,
	updateDoc,
	doc,
	DocumentData,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function InputBox() {
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const fullname = email?.split("@")[0];
	const [load, setLoad] = useState("");
	const [selectedfile, setSelectedfile] = useState(null);
	const [showEmoji, setShowEmoji] = useState(false);
	const inputRef = useRef(null);
	const [rec, setRec] = useState(false);
	let val: any = inputRef?.current;

	const addImageToPost = (e: any) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent: any) => {
			setSelectedfile(readerEvent?.target?.result);
		};
	};

	const sendPost = async (e: any) => {
		e.preventDefault();

		if (!inputRef.current) return;
		if (inputRef.current == " ") return;
		if (load.trim() == "") return;

		const docRef = await addDoc<DocumentData>(collection(db, "posts"), {
			message: load,
			name: name == undefined ? fullname : name,
			email: email,
			image: image == undefined ? "" : image,
			timestamp: serverTimestamp(),
		});

		const imageRef = ref(storage, `posts/${docRef.id}/image`);

		if (selectedfile) {
			await uploadString(imageRef, selectedfile, "data_url").then(async () => {
				const url = await getDownloadURL(imageRef);
				await updateDoc(doc(db, "posts", docRef.id), {
					postImage: url,
				});
			});
		}
		setSelectedfile(null);
		setShowEmoji(false);
		val = "";
		setLoad("");
	};

	const addEmoji = (e: any) => {
		let sym = e.unified.split("-");
		let codesArray: any = [];
		sym.forEach((el: any) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setLoad(load + emoji);
	};
	return (
		<>
			<div className="bg-white p-2 rounded-2xl shadow-md text-gray-400 justify-center font-medium mt-6 mx-auto xl:-ml-56">
				<div className="flex sm:space-x-4 space-x-2 sm:p-4 p-2 mx-auto items-center">
					{image == undefined ? (
						<UserCircleIcon className="h-8 w-8 text-gray-600 " />
					) : (
						<Image
							className="rounded-full cursor-pointer"
							src={image}
							width={35}
							height={35}
							alt={name}
						/>
					)}
					<div className="w-full">
						<form className="flex flex-1">
							<input
								type="text"
								value={load}
								ref={inputRef}
								onChange={(e) => setLoad(e.target.value)}
								className="rounded-full md:h-12 h-10 bg-gray-100 flex-grow md:px-5 px-3 focus:outline-none"
								placeholder={`What's on your mind ${
									name == undefined ? fullname : name
								} ?`}
							/>
							{load && (
								<div role="status" className="relative right-6 top-4 z-50">
									<svg
										aria-hidden="true"
										className="w-4 h-4 mr-2 bg-[#149FFF] rounded-full text-[#149FFF] text-2xl animate-spin fill-white"
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
							<button hidden type="submit" onClick={sendPost}>
								Submit
							</button>
						</form>
					</div>
				</div>
				{selectedfile && (
					<div className="relative mb-4 text-center">
						<div
							className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-5 cursor-pointer"
							onClick={() => setSelectedfile(null)}
						>
							<XMarkIcon
								onClick={() => setSelectedfile(null)}
								className="w-4 h-4 text-white"
							/>
						</div>
						<Image
							className="rounded-2xl max-h-72 mx-auto object-contain"
							src={selectedfile}
							width={120}
							height={180}
							alt="image"
						/>
					</div>
				)}
				<hr className="my-3" />
				<div className="flex justify-evenly">
					<div
						onClick={() => setRec(!rec)}
						className="flex space-x-3 items-center cursor-pointer"
					>
						<VideoCameraIcon className="h-5 md:h-7 text-red-600" />
						<p className="sm:text-sm text-xs xl:text-base">Screen/Video</p>
					</div>
					<div
						onClick={() => setShowEmoji(!showEmoji)}
						className="flex space-x-3 items-center cursor-pointer"
					>
						<FaceSmileIcon className="h-5 md:h-7 text-red-600" />
						<p className="sm:text-sm text-xs xl:text-base">Emoji</p>
					</div>
					<label htmlFor="file">
						<div className="flex space-x-3 items-center cursor-pointer">
							<input type="file" id="file" hidden onChange={addImageToPost} />
							<PhotoIcon className="h-5 md:h-7 text-red-600" />
							<p className="sm:text-sm text-xs xl:text-base">Image/Files</p>
						</div>
					</label>
				</div>
			</div>
			{showEmoji && (
				<div className="absolute mt-2 -ml-10 max-w-xs rounded-lg">
					<Picker data={data} onEmojiSelect={addEmoji} />
				</div>
			)}
			{rec && (
				<div className="w-full  absolute bottom-1/3  z-50  max-w-sm p-5 bg-white rounded-md shadow-md">
					<div className="flex items-center justify-between">
						<span className="text-sm font-light text-gray-800">
							Screen/Video Recording
						</span>
						<XMarkIcon
							onClick={() => setRec(false)}
							className="text-[#149FFF] w-5 h-5 cursor-pointer hover:text-white hover:rounded-full hover:bg-[#149FFF] font-extrabold"
						/>
					</div>

					<div>
						<h1 className="mt-2 text-lg font-semibold text-gray-800 ">
							Live Recorder
						</h1>
						<div className="flex justify-between  mt-4">
							<div className="w-fit items-center p-2 bg-[#149FFF] cursor-pointer hover:bg-white hover:text-[#149FFF] rounded-3xl text-white font-bold">
								Video Capture
							</div>
							<div className="w-fit p-2 items-center bg-[#149FFF] cursor-pointer  hover:bg-white hover:text-[#149FFF] text-white rounded-3xl font-bold">
								Screen Capture
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default InputBox;
