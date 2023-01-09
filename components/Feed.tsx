import InputBox from "./Feed/InputBox";
import Posts from "./Feed/Posts";
import Stories from "./Feed/Stories";
import CameraAccess from "./Webcam/CameraAccess";

const Feed = () => {
	return (
		<>
			<div className="flex-grow max-h-[90vh] mt-2 overflow-x-hidden overflow-y-scroll">
				<div className="mx-auto sm:pr-16 sm:pl-0 w-fit pb-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
					{/* Stories */}
					<Stories />
					{/* InputBox */}
					<InputBox />
					{/* Posts */}
					<Posts />
					<CameraAccess />
				</div>
			</div>
		</>
	);
};

export default Feed;
