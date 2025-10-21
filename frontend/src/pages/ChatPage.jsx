import React from 'react'
// import useAuthStore from "../store/auth.store.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import BorderAnimatedContainer from '../components/BorderAnimationContainer.jsx';
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx';
import { useChatStore } from '../store/useChatStore.js';
import ContactList from '../components/ContactList.jsx';
import ChatsList from '../components/ChatsList.jsx';
import NoConversationPlaceHolder from '../components/NoConversationPlaceHolder.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
// import MessageLoadingSkeleton from '../components/MessageLoadingSkeleton.jsx';
const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative  w-full max-w-6xl h-[800px] ">
      <BorderAnimatedContainer>
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* {/* RIGHT SIDE } */}

        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? < ChatContainer /> : <NoConversationPlaceHolder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage;