import React, { useRef, useState } from 'react';
import useKeyBoardSounds from '../hooks/useKeyboardSound';
import {useChatStore} from "../store/useChatStore.js"
const MessageInput = () => {
	const { useKeyBoardSounds } = useKeyBoardSounds();
	const [text, settext] = useState("");
	const [magePreview, setImage] = useState(null);
	const fileInputRef = useRef(null);

	return (
		<div>MessageInput</div>
	)
}

export default MessageInput