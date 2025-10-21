import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../modals/user.modal.js";
config();

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
		return 	res.status(401).json({ message: "Unauthorized - No token Provided" });
		}
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		if (!decode) {
			return res.status(401).json({ message: "Unauthorized - Invalid Token" })
		}
		const user = await User.findById(decode.userId).select("-password");
		if (!user) return res.status(400).json({ message: "User Not Found" });
		req.user = user;
		next();
	} catch (error) {
		console.log("Authentication error:", error);
		return res.status(401).json({ message: "Unauthorized" });
	}
}

export default isAuthenticated;