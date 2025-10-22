import bcrypt from "bcrypt";
import User from "../modals/user.modal.js";
import welcomeEmail from "../emails/handelEmail.js";
import { genToken } from "../libs/utils/genToken.js";
import uploadToCloudinary from "../libs/cloudinary.js";

// import uploadToCloudinary from "../libs/cloudinary.js";
export const signInUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		if (!username, !email, !password) {
			return res.status(400).json({ message: "All fields are required" })
		}
		if (password < 6) {
			return res.status(400).json({ message: "password length must be greater than 6" })
		}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "please write a valid email" })
		}
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.status(400).json({ message: "Email Already Exists" });
		}

		// const uploadImage = await uploadToCloudinary(profilePic);
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const user = await User({
			username,
			email,
			password: hashPassword
		})
		await user.save();
		user.password = undefined
		genToken(user._id, res)
		try {
			await welcomeEmail(email, username)
		} catch (error) {
			console.log("Error in signinUser welcomeEmail : ", error.message)
		}
		res.status(200).json({ message: "user signup successfully", user })
	} catch (error) {
		console.log("Error in signin controller : ", error.message);
		next(error)
	}
}
export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "All Fields are required" })
		}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "please provide the valid email" })
		}
		const alreadyExits = await User.findOne({ email });
		if (!alreadyExits) {
			return res.status(400).json({ message: "invalid credentials" })
		}

		const isPasswordCorrect = await bcrypt.compare(password, alreadyExits.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" })
		}
		genToken(alreadyExits._id, res)
		alreadyExits.password = undefined
		res.status(200).json({ message: "User Logged In successfully", user: alreadyExits });
	} catch (error) {
		console.log("Error in LoginUser controllers : ", error.message)
		next(error)
	}
}

export const logoutUser = (_, res) => {
	res.cookie("token", "", { maxAge: 0 });
	res.status(200).json({ message: "Logged out successfully" })
}

export const updateProfile = async (req, res, next) => {
	try {
		const { profilePic } = req.body;
		if (!profilePic) return res.status(400).json({ message: "Profile Pic is required" });
		const userId = req.user?._id;
		if(!userId) {
			return res.status(400).json({ message: "User not found" });
		}
		const uploadNewProfilePic = await uploadToCloudinary(profilePic);
		const updatedUser = await  User.findByIdAndUpdate(userId, { profilePic: uploadNewProfilePic }, { new: true }).select("-password");

			res.status(200).json(updatedUser)

	} catch (error) {
		console.log("Error in updateUser Controller : ", error.message);
		next(error)
	}
}

export const checkUser = async (req, res, next) => {
	return res.status(200).json(req.user)
}

