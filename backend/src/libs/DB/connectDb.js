import mongoose from "mongoose"; 
const connectDb = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URI);
		console.log("Database connection successful")
		console.log(`MongoDB connected: ${con.connection.host}`);
	} catch (error) {
		console.log("Error connecting to database:", error);
		throw new Error("Could not connect to database");
	}
}

export default connectDb;