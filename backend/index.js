import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>res.status(200).send("<h1>Server status : Good (200)</h1>"))

mongoose.connect(process.env.MONGO_URL_LOCAL).then(()=>{
    app.listen(8080,()=>console.log("MongoDB connected! Server running on port 8080."));
}).catch((err)=>console.log("Error in connecting MongoDB and Server Can't run."));

import userRouter from './router/userRouter.js';
app.use("/api/user",userRouter);

import productRouter from './router/productRouter.js';
app.use("/api/product",productRouter);

import paymentRouter from './router/paymentRouter.js';
app.use("/api/payment",paymentRouter);

import orderRouter from './router/orderRouter.js';
app.use("/api/order",orderRouter);