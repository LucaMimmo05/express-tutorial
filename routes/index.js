import express from "express";
import userRoutes from "./userRoutes.js";
import personRoutes from "./personRoutes.js";
import generalRoutes from "./generalRoutes.js";

const router = express.Router();

// Raggruppa tutte le rotte
router.use("/", generalRoutes);
router.use("/user", userRoutes);
router.use("/person", personRoutes);

export default router;
