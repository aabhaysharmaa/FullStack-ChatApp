
import uploadToCloudinary from "../libs/cloudinary.js";
import Message from "../modals/message.modal.js";
import User from "../modals/user.modal.js";
export const sendMessage = async (req, res, next) => {
	try {
		const { text, image } = req.body;
		const { id } = req.params;
		if (!text) {
			return res.status(400).json({ message: "please provide image or either text" });
		}
		const senderId = req.user._id;
		if (senderId.equals(id)) {
			return res.status(400).json({ message: "You can't send message to  yourself" })
		}
		const receiverExists = await User.findById(id);
		if (!receiverExists) {
			return res.status(200).json({ message: "No User Found" });
		}
		const uploadImage = await uploadToCloudinary(image);
		if (!uploadImage) {
			return res.status(400).json({ message: "problem in uploading image to cloudinary" })
		}
		const message = await Message({
			senderId,
			receiverId: id,
			image: uploadImage,
			text
		})
		await message.save();
		res.status(200).json(message);
		// todo : socket.io for real time chats
	} catch (error) {
		console.log("Error in sendMessage Controller", error.message);
		next(error);
	}
}

export const getMessages = async (req, res, next) => {
	try {
		const currentLoggedInUser = req.user._id;
		const id = req.params.id;
		const message = await Message.find({
			$or: [
				{ senderId: id, receiverId: currentLoggedInUser }, { receiverId: id, senderId: currentLoggedInUser }
			]
		})
		console.log("Messages" , message)
		return res.status(200).json(message);
	} catch (error) {
		console.log("Error in sendMessage Controller : ", error.message);
		next(error);
	}
}

export const getContact = async (req, res, next) => {
	try {
		const currentLoggedInUser = req.user._id;
		const getAllContact = await User.find({ _id: { $ne: currentLoggedInUser } }).select("-password");
		console.log("Get All Contacts : ", getAllContact);
		res.status(200).json(getAllContact);
	} catch (error) {
		console.log("Error in sendMessage Controller : ", error.message);
		next(error);
	}
}

export const getChats = async (req, res, next) => {
	try {
		const loggedInUserId = req.user?._id;
		if (!loggedInUserId) {
			return res.status(400).json({ message: "User not authenticated" })
		}
		// find all the messages where the logged-in user is either sender or receiver
		const messages = await Message.find({
			$or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
		});
		const chatPartnerIds = [
			...new Set(
				messages.map((msg) =>
					msg.senderId.toString() === loggedInUserId.toString()
						? msg.receiverId.toString()
						: msg.senderId.toString()
				)
			),
		];

		const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");
		res.status(200).json(chatPartners);
	} catch (error) {
		console.log("Error on  chatPartners", error.message)
		next(error)
	}
}



