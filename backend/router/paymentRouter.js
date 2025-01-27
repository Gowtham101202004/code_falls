import express from "express"
import { Make_Payment_UPI } from "../controller/paymentController.js";

const router=express.Router();

router.post('/create-payment-intent',Make_Payment_UPI);

export default router;