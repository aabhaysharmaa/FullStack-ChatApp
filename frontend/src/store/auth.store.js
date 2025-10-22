import { create } from "zustand";
import axiosInstance from "../libs/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingIn: false,
	updatedUrl: null,
	socket: null,
	onlineUsers: [],
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check", { withCredentials: true })
			set({ authUser: res.data })
			get().connectSocket()
		} catch (error) {
			console.log("useAuthStore Error checkAuth : ", error.message)
			set({ authUser: null })
		} finally {
			set({ isCheckingAuth: false })
		}
	},
	SignUp: async (data) => {
		try {
			set({ isSigningUp: true })
			const res = await axiosInstance.post("/auth/signin", data, { withCredentials: true });
			set({ authUser: res.data })
			toast.success("User SignUp SuccessFully")
			get().connectSocket()
		} catch (error) {
			console.log("useAuthStore Error signIn : ", error.message)
			set({ authUser: null })
			toast.error(error.response.data.message)

		} finally {
			set({ isSigningUp: false })
		}
	},
	logIn: async (data) => {
		try {
			set({ isLoggingIn: true })
			const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
			set({ authUser: res.data })
			toast.success("User LoggedIn SuccessFully")
			get().connectSocket()
		} catch (error) {
			console.log("useAuthStore Error signIn : ", error.message)
			set({ authUser: null })
			toast.error(error.response.data.message)
		} finally {
			set({ isLoggingIn: false })
		}
	},
	logout: async () => {
		await axiosInstance.post("/auth/logout");
		set({ authUser: null })
		toast.success("LogOut SuccessFully")
		get().disconnectSocket();
	}, updateProfile: async (data) => {
		try {
			const res = await axiosInstance.put("/auth/updateProfile", data, { withCredentials: true })
			if (res) {
				set({ authUser: res.data })
				return toast.success("Profile Pic Updated");

			}
		} catch (error) {
			toast.error(error.response.data.message)
		}
	},
	connectSocket: () => {
		const authUser = get();
		if (!authUser || get().socket?.connected) return
		const socket = io("http://localhost:3000", { withCredentials: true });
		socket.connect()
		set({ socket })
		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds })
		});
	},
	disconnectSocket: () => {
		if (get().socket.connected) get().socket.disconnectSocket()

	}

}))

