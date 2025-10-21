import { Resend } from "resend";
import { config } from "dotenv";
import { WelcomeEmailTemplate } from "./emailTemplate.js";
config();
const resend = new Resend(process.env.RESEND_API);
const welcomeEmail = async (email, name) => {
	const { data, error } = await resend.emails.send({
		from: process.env.RESEND_FROM_EMAIL,
		to: email ,
		subject: "Welcome To Chatify 😊",
		html: WelcomeEmailTemplate(name, process.env.RESEND_CLIENT_URL)
	})
}
export default welcomeEmail ;