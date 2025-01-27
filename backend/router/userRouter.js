import express from 'express';
import { Insert_User_Data, List_Users_Data, Login_User_Data, Send_OTP_Message, Verify_OTP } from '../controller/userController.js';

const router=express.Router();

router.post("/register",Insert_User_Data);
router.post("/login",Login_User_Data);
router.post("/sendOTP",Send_OTP_Message);
router.post("/verifyOTP",Verify_OTP);

router.get("/list-users",List_Users_Data);

export default router;