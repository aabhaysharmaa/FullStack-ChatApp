import express from "express";
const router = express.Router();
import { sendMessage, getMessages, getContact, getChats } from "../controllers/message.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

router.use(isAuthenticated)
router.get("/contacts", getContact);
router.get("/chats", getChats)
router.post("/send/:id", sendMessage);
router.get("/:chatId", getMessages);

export default router;

