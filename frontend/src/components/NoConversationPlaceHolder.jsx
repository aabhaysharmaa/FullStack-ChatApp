import { MessageCircleMore } from 'lucide-react';


import React from 'react';
const NoConversationPlaceHolder = () => {
	return (
		<div className='flex justify-center items-center m-auto'>
		<div className='w-full flex-col flex  items-center justify-center space-y-5'>
			<MessageCircleMore className='size-12 mx-auto text-slate-400 mb-4' />
			<h2 className='text-xl font-semibold mb-2'>Select a conversation</h2>
			<p className='text-sm w-[400px] text-center text-slate-400'>Choose a contact from the sidebar to start chatting or continue a previous conversation</p>
		</div>
		</div>
	)
}

export default NoConversationPlaceHolder