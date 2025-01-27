import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;

if (!sid || !token) {
    throw new Error("Twilio credentials are missing");
}

const client = new twilio(sid, token);

export const sendSMS = async (data) => {
    let option = {
        from: process.env.TWILIO_PHONE_NUMBER,
        to: data.phno,
        body: `Your OTP (ONE TIME PASSWORD) is ${data.otp}, valid for 5 minutes.`,
    };
    return client.messages
        .create(option)
        .then((msg) => console.log(msg))
        .catch((err) => console.error("Failed to send SMS:", err));
};
