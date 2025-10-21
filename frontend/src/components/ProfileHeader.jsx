import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/auth.store';
import { useChatStore } from '../store/useChatStore';
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from 'lucide-react';
const ProfileHeader = () => {
	const { logout, authUser, updateProfile } = useAuthStore();
	const { isSoundEnable, toggledSound } = useChatStore();
	const [selectedImg, setSelectedImg] = useState(null);
	const fileInputRef = useRef(null);
	const handelImageUpload = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			const base64Image = reader.result;
			setSelectedImg(base64Image);
			await updateProfile({ profilePic: selectedImg });
		}
	}
	

	const mouseClickSound = new Audio("/sounds/6.mp3")
	return (
		<div className='p-6 border-b border-slate-700/50'>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className=" avatar avatar-online">
						<button className='size-14 rounded-full overflow-hidden relative group hover:cursor-pointer' onClick={() => fileInputRef.current.click()}>
							<img src={selectedImg || "/avatar.png"} alt="User Image" className='size-full object-cover' />
							<div className="absolute inset-0 opacity-0 flex items-center justify-center bg-black/50 transition-opacity group-hover:opacity-100">change</div>
						</button>
						<input type="file" accept='image/*' ref={fileInputRef} onChange={handelImageUpload} className='hidden' />
					</div>
					{/* USERNAME OR ONLINE TEXT  */}
					<div >
						<h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
							{authUser.username}
						</h3>
						<p className='text-slate-400 text-sm'>Online</p>
					</div>
				</div>
				{/* ?BUTTONS */}
				<div className="flex gap-4 items-center">
					<button className='text-slate-400 hover:text-slate-200 transition-colors ' onClick={logout}><LogOutIcon className='size-5' /></button>
					<button className='text-slate-400 hover:text-slate-200 transition-colors ' onClick={() => {
						mouseClickSound.currentTime = 0;
						mouseClickSound.play().catch((error) => console.log("Audio Play failed : ", error));
						toggledSound()
					}}>{isSoundEnable ? (
						< Volume2Icon className='size-5' />
					) : (
						<  VolumeOffIcon className='size-5' />
					)} </button>
				</div>
			</div>
		</div>
	)
}

export default ProfileHeader