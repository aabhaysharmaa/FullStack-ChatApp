import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';
import UsersLoadingSkeleton from './UserLoadingSkeleton';
import NoChatsFound from './NoChatsfounds';

// import { useAuthStore } from '../store/auth.store';


const ChatsList = () => {
  const { chats, getMyChatsPartners, isUsersLoading, setSelectedUser } = useChatStore();
  // const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getMyChatsPartners();
  }, [getMyChatsPartners])
  if (isUsersLoading) return <UsersLoadingSkeleton />
  if (chats.length === 0) return < NoChatsFound />
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar avatar-online`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.username} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.username}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatsList