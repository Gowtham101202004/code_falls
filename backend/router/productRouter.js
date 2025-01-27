import express from 'express';
import { Display_Product_Data, Insert_Product_Data,Update_Product,Delete_Product } from '../controller/productController.js';

const router =express.Router();

router.post("/insert-product-data",Insert_Product_Data);
router.get("/display-product-data",Display_Product_Data);
router.put("/update-product/:id",Update_Product)
router.delete("/delete-product/:id",Delete_Product);

export default router;