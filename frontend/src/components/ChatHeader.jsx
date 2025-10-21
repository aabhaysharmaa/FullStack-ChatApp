
import { XIcon } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';
const ChatHeader = () => {
	const { selectedUser, setSelectedUser } = useChatStore();
	const handelEscKey = (event) => {
		if (event.key === "Escape") setSelectedUser(null)
	}

	useEffect(() => {
		window.addEventListener("keydown", handelEscKey)
		return () => window.removeEventListener("keydown", handelEscKey)
	}, [setSelectedUser])
	return (
		<div className='flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1'>
			<div className="flex items-center space-x-3">
				<div className="avatar avatar-online">
					<div className="w-12  rounded-full"> <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.username} />
					</div>
				</div>
				<div>
					<h3 className="text-slate-200 font-medium">{selectedUser.username}</h3>
					<p className='text-sm text-slate-400'>Online</p>
				</div>
			</div>
			<button onClick={() => setSelectedUser(null)}   ><XIcon className='size-5 text-slate-400 hover:text-slate-200 transition colors cursor-pointer' /></button>
		</div>
	)
}

export default ChatHeader;