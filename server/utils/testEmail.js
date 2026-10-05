import "dotenv/config";
import sendEmail from "./sendEmail.js";

console.log("EMAIL_USER exists:", Boolean(process.env.EMAIL_USER));
console.log("EMAIL_PASSWORD exists:", Boolean(process.env.EMAIL_PASSWORD));

const testEmail = async () => {
    try {
        await sendEmail({
            to: "krishpanchal2471@gmail.com",
            subject: "RentVerse Email Test",
            html: `
                <h1>RentVerse</h1>
                <p>Your email configuration is working.</p>
            `,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email failed:", error);
    }
};

testEmail();