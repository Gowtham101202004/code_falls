import handler from 'express-async-handler';
import {GoogleGenerativeAI} from '@google/generative-ai'

export const Generate_Text=handler(async(req,res)=>{
    console.log("Gemini request -> ",req.body.prompt);
    try {
        const generative=new GoogleGenerativeAI(process.env.GEMINI_API);
        const model=generative.getGenerativeModel(
            {
                model:"gemini-pro"
            }
        )
        const {prompt}=req.body;
        const request=await model.generateContent("the customer says "+prompt+" i need only two statement for response without list number", {
            temperature: 0.7, 
            max_tokens: 150, 
        });
        const response=await request.response;
        const result=response.text();
        return res.json(result);
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
});