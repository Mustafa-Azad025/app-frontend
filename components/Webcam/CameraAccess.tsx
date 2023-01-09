// import React, { FC, memo, useState } from "react";
// import "video-react/dist/video-react.css";
// // @ts-ignore
// import { Player } from "video-react";
// // @ts-ignore
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
// // @ts-ignore
// import { saveAs } from "file-saver";

// function CameraAccess({ type }: any) {
// 	const [recorder, setRecorder] = useState<RecordRTC | null>();
// 	const [stream, setStream] = useState<MediaStream | null>();
// 	const [videoBlob, setVideoUrlBlob] = useState<Blob | null>();

// 	const startRecording = async () => {
// 		const mediaDevices = navigator.mediaDevices;
// 		const stream: MediaStream =
// 			type === "video"
// 				? await mediaDevices.getUserMedia({
// 						video: true,
// 						audio: true,
// 				  })
// 				: await (mediaDevices as any).getDisplayMedia({
// 						video: true,
// 						audio: false,
// 				  });
// 		const recorder: RecordRTC = new RecordRTCPromisesHandler(stream, {
// 			type: "video",
// 		});

// 		await recorder.startRecording();
// 		setRecorder(recorder);
// 		setStream(stream);
// 		setVideoUrlBlob(null);
// 	};

// 	const stopRecording = async () => {
// 		if (recorder) {
// 			await recorder.stopRecording();
// 			const blob: Blob = await recorder.getBlob();
// 			(stream as any).stop();
// 			setVideoUrlBlob(blob);
// 			setStream(null);
// 			setRecorder(null);
// 		}
// 	};

// 	const downloadVideo = () => {
// 		if (videoBlob) {
// 			const mp4File = new File([videoBlob], "demo.mp4", { type: "video/mp4" });
// 			saveAs(mp4File, `Video-${Date.now()}.mp4`);
// 		}
// 	};
// 	return (
// 		<>
// 			<div className="absolute bottom-[40%] right-[40%]">
// 				{!!videoBlob && <Player src={window.URL.createObjectURL(videoBlob)} />}
// 			</div>
// 		</>
// 	);
// }

// export default CameraAccess;

import React from "react";

function CameraAccess() {
	return <div>CameraAccess</div>;
}

export default CameraAccess;
