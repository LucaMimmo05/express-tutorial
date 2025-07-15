import express from "express";
import { getUsers, searchController } from "../controllers/userController.js";

const router = express.Router();

// GET /user/search?keyword=... - Ricerca utenti (DEVE essere prima di /:username)
router.get("/search", searchController);

// GET /user/:username - Ottieni informazioni utente
router.get("/:username", getUsers);

export default router;
