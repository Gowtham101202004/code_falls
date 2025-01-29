import express from 'express';
import { Generate_Text } from '../controller/AIController.js';

const route=express.Router();

route.post("/ai-response",Generate_Text);

export default route;