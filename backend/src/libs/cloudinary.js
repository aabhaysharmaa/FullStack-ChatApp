import cloudinary from "./cloudinaryConfig.js";
const uploadToCloudinary = async (imageURl) => {
	try {
		let img;
		img = await cloudinary.uploader.upload(imageURl, {
			folder: "userFolder",
			resource_type: 'auto'
		});
		if(!img) {
			throw new Error("cannot upload an image ")
		}
		return img.secure_url;
	} catch (error) {
		console.log("Error in uploadToCloudinary : ", error.message)
	}
}
export default uploadToCloudinary;