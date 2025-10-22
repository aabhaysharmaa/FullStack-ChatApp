import jwt from "jsonwebtoken";
import User from "../modals/user.modal.js";
import dotenv from "dotenv";
dotenv.config();

export const socketAuthMiddleware = async (socket, next) => {
	try {
		const token = socket.handShake.headers.cookie?.split(";").find((row) => row.startWith("jwt="))?.split("=")[1];
		if (!token) {
			console.log("Socket Connection rejected : No token provided");
			return next(new Error("Unauthorized - No Token provided"))
		}
		// verify Token
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		if (!decode) {
			console.log("Socket connection rejected : Invalid token ")
			return next(new Error("Unauthorized - Invalid Token"))
		}
		const user = await user.findById(decode.userId).select("-password");
		if (!user) {
			console.log("Socket connection rejected: User not found")
			return next(new Error("User not found "))
		}
		socket.user = user;
		socket.userId = user._id.toString();
		console.log(`Socket authentication for user: ${user.username} ${user._id}`)
		next()
	} catch (error) {
		console.log("socketAuthMiddleware : ", error.message)
		next(new Error("Unauthorized - Authentication failed"))
	}
}