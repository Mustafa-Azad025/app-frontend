import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebaseData";
import Post from "./Post";

function Posts() {
	const [posts, setPosts]: any = useState([]);
	useEffect(
		() =>
			onSnapshot(
				query(collection(db, "posts"), orderBy("timestamp", "desc")),
				(snapshot) => {
					setPosts(snapshot.docs);
				}
			),
		[db]
	);
	let count = 0;
	return (
		<>
			{/* <div className="overflow-x-hidden lg:mx-auto mb-[7.5rem]"> */}
			<div className="absolute top-8 sm:top-6 left-[21%] sm:left-[10%] md:left-[25rem] right-[2%] max-w-[35rem] z-0 xl:max-w-3xl w-[-webkit-fill-available] h-[80vh] mx-auto overflow-y-scroll scrollbar-hide">
				{posts.map((post: any) => (
					<div className="-space-y-4">
						<Post
							key={count}
							id={posts[count]?.id}
							name={post.data().name}
							image={post.data().image}
							mail={post.data().email}
							postImg={post.data().postImage}
							time={post.data().timestamp?.toDate()}
							message={post.data().message}
						/>
						<div className="invisible">{(count = count + 1)}</div>
					</div>
				))}
			</div>
		</>
	);
}

export default Posts;
