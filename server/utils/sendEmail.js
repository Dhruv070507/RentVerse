import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"RentVerse" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};

export default sendEmail;