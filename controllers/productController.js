import { Product } from "../models/Product.js";

// Controller per la gestione dei prodotti
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller per ricerca di singolo prodotto
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller per creazione nuovo prodotto
export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};