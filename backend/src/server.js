import express from 'express';
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
import connectDb from './libs/DB/connectDb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { server, io , app } from "./libs/socket.js";

//middlewares
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



import authRouter from './routes/auth.router.js';
import messageRouter from './routes/message.router.js';
//routes

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/messages", messageRouter)




app.use((err, req, res, next) => {
	return res.status(err.status || 500).json({
		success: false,
		status: err.status || 500,
		message: err.message || "Something went wrong"
	});
});

server.listen(PORT, () => {
	connectDb();
	console.log(`Server is running on port ${PORT}`);
})


