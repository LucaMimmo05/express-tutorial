import express from "express"
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js";


const router = express.Router();

// GET /product - Ottieni tutti i prodotti
router.get("", getAllProducts);

// GET /person/:id - Ottieni un prodotto specifico tramite ID
router.get("/:id",getSingleProduct);

// POST /person - Crea un nuovo prodotto
router.post("",createProduct);


export default router;