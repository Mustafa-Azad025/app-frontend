import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaUserAlt, FaSmile, FaImages } from "react-icons/fa";
import { db, storage } from "../../../firebaseData";
import {
	collection,
	addDoc,
	serverTimestamp,
	updateDoc,
	doc,
	DocumentData,
} from "firebase/firestore";
import { MdSend, MdScreenShare, MdOutlineCancel } from "react-icons/md";
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
		setLoad("");
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
			<div className="absolute bottom-0 left-[15%] sm:left-[10%] md:left-[25rem]  sm:right-[2%] right-[1%] z-[5] max-w-[35rem] xl:max-w-3xl w-[-webkit-fill-available] mx-auto bg-light h-32 rounded-t-3xl">
				<div className="flex py-2 w-full sm:space-x-3">
					{image == undefined ? (
						<FaUserAlt className="h-12 w-12 ml-2 hidden sm:inline-flex text-mid " />
					) : (
						<Image
							className="rounded-full hidden sm:inline-flex cursor-pointer ml-2 sm:w-12 sm:h-12"
							src={image}
							width={35}
							height={35}
							alt={name}
						/>
					)}
					<div className="w-full ml-3 sm:ml-0">
						<form className="flex flex-1 w-full">
							<input
								type="text"
								value={load}
								ref={inputRef}
								onChange={(e) => setLoad(e.target.value)}
								className="rounded-full md:h-12 h-10 pl-3 bg-gray-100 flex-grow focus:outline-none"
								placeholder={`Message Here . . .`}
							/>
							{load && (
								<div
									role="status"
									className="relative right-10 lg:right-20 top-3 md:top-4 z-50"
								>
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
							<button
								className={`bg-primary rounded-full w-10 ${
									load != "" ? `-ml-4` : `ml-2`
								}  md:w-12 disabled:bg-secondary disabled:cursor-not-allowed md:h-12 h-10 text-white items-center`}
								disabled={selectedfile == null && load.trim() == ""}
								type="submit"
								onClick={sendPost}
							>
								<MdSend size="1.5rem" className="mx-auto p-1" />
							</button>
						</form>
					</div>
				</div>
				<div
					onClick={() => setShowEmoji(!showEmoji)}
					className="items-center cursor-pointer relative ml-[76%] sm:ml-[82%] xl:ml-[89%] w-fit -top-10 sm:top-[-3rem]"
				>
					<FaSmile className="h-5 md:h-8 target:text-primary text-dark" />
				</div>
				{selectedfile && (
					<div className="absolute bottom-[105%] mx-auto w-full h-48 xl:h-80 bg-light rounded-2xl text-center">
						<div
							className="absolute w-8 h-8 flex items-center justify-center top-1 left-5 cursor-pointer"
							onClick={() => setSelectedfile(null)}
						>
							<MdOutlineCancel
								onClick={() => setSelectedfile(null)}
								className="w-4 h-4 lg:w-10 lg:h-10 text-dark"
							/>
						</div>
						<Image
							className="rounded-2xl h-full xl:h-72 xl:w-[75%] max-h-72 mx-auto object-contain"
							src={selectedfile}
							width={120}
							height={180}
							alt="image"
						/>
					</div>
				)}
				<div className="flex justify-evenly items-center -mt-6">
					<label htmlFor="file">
						<div className="text-primary sm:flex sm:space-x-4 items-center">
							<input type="file" id="file" hidden onChange={addImageToPost} />
							<FaImages size="3rem" className="mx-auto sm:mx-0" />
							<p className="font-semibold text-sm">Images / Files</p>
						</div>
					</label>
					<div className="text-primary sm:flex sm:space-x-4 items-center">
						<MdScreenShare size="3rem" className="mx-auto sm:mx-0" />
						<p className="font-semibold text-sm">Recorder</p>
					</div>
				</div>
			</div>
			{showEmoji && (
				<div className="absolute bottom-40 left-0 md:left-[25rem] lg:left-[35rem] xl:left-[58rem] sm:left-14 z-40 rounded-lg">
					<Picker data={data} onEmojiSelect={addEmoji} />
				</div>
			)}
		</>
	);
}

export default InputBox;
