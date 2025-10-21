import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios";
export const useChatStore = create((set, get) => ({
	allContacts: [],
	chats: [],
	messages: [],
	activeTab: "chats",
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,
	isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable")) === true,
	toggledSound: () => {
		const newValue = !get().isSoundEnable;
		localStorage.setItem("isSoundEnable", newValue)
		set({ isSoundEnable: newValue })
	},
	setActiveTab: (tab) => set({ activeTab: tab }),
	setSelectedUser: (selectedUser) => set({ selectedUser }),
	getMessagesByUserId: async (userId) => {
		set({ isMessagesLoading: true });
		try {
			set({ isMessagesLoading: true })
			const res = await axiosInstance.get(`/messages/${userId}`);
			set({ messages: res.data });
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		} finally {
			set({ isMessagesLoading: false });
		}
	},
	getAllContacts: async () => {
		set({ isUsersLoading: true })
		try {
			const res = await axiosInstance.get("/messages/contacts");
			set({ allContacts: res.data })
		} catch (error) {
			toast.error(error.response.data.message)
		} finally {
			set({ isUsersLoading: false });
		}
	},
	getMyChatsPartners: async () => {
		try {
			const res = await axiosInstance.get("/messages/chats");
			set({ chats: res.data })
		} catch (error) {
			toast.error(error.response.data.message)
		} finally {
			set({ isUsersLoading: false })
		}
	},
	sendMessage: async (messageData) => {
		const { selectedUser, messages } = get();
		try {
			const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
			set({ messages: messages.concat(res.data) });
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went Wrong")
			throw new Error(error)
		}
	}
}));