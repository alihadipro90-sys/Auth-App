import transporter from '../config/nodemailer.js';

export const sendWelcomeEmail = (email) => transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Welcome to Authens!',
    text: `Welcome to the Authens Website. Your account has been created with the email id: ${email}`
});

export const sendVerificationEmail = (email, otp) => transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Account Verification OTP',
    text: `Your OTP is ${otp}. It is valid for 24 hours.`
});