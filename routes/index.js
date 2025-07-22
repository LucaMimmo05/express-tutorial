import express from "express";
import userRoutes from "./userRoutes.js";
import personRoutes from "./personRoutes.js";
import generalRoutes from "./generalRoutes.js";
import productRoutes from "./productRoutes.js"

const router = express.Router();

// Raggruppa tutte le rotte
router.use("/", generalRoutes);
router.use("/user", userRoutes);
router.use("/person", personRoutes);
router.use("/product", productRoutes);

export default router;
