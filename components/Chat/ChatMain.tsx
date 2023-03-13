import React from "react";
import ChatInput from "./PersonalChat/ChatInput";
import MessageShow from "./PersonalChat/MessageShow";

function ChatMain() {
	return (
		<>
			<div className="">
				<ChatInput />
				<MessageShow />
			</div>
		</>
	);
}

export default ChatMain;
