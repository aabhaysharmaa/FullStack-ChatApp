import React from 'react';
import {useChatStore} from '../store/useChatStore.js';
const ActiveTabSwitch = () => {
	const { activeTab, setActiveTab   } = useChatStore();

	return (
		<div className='tabs tabs-boxed bg-transparent p-2 m-2 flex justify-between '>
			<button
				onClick={() => setActiveTab("chats")}
				className={`tab ${activeTab === "chats"
					? "bg-cyan-500/20 text-cyan-400"
					: "bg-transparent text-slate-400"
					} w-1/2`}
			>
				Chats
			</button>
			<button onClick={() => setActiveTab("contacts")} className={`tab ${activeTab === "contacts"
				? "bg-cyan-500/20 text-cyan-400"
				: "bg-transparent text-slate-400"
				} w-1/2`}>Contacts</button>
		</div>
	)
}

export default ActiveTabSwitch

