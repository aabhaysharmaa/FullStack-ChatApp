import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
	throw new Error("JWT_SECRET");
}


export const genToken = async (userOrId, res) => {
	try {
		// accept either a user object or an id string
		const userId = typeof userOrId === 'string' || typeof userOrId === 'number' ? String(userOrId) : (userOrId && userOrId._id ? String(userOrId._id) : null);
		if (!userId) throw new Error('Invalid user id provided to genToken');

		const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
		res.cookie("token", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			secure: process.env.NODE_ENV === "production" ? true : false
		});
		return token
	} catch (error) {
		console.log("Error in genToken function : ", error.message)
		throw new Error(error.message)
	}
}