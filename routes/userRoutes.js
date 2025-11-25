import express from "express";
import {
    getUsers,
    searchController,
    userLogin,
    userRegistration,
} from "../controllers/userController.js";

const router = express.Router();

// GET /user/search?keyword=... - Ricerca utenti (DEVE essere prima di /:username)
router.get("/search", searchController);

//POST /user/register - Endpoint per registrazione utenti
router.post("/register", userRegistration);

//POST /user/login - Endpoint per login utenti
router.post("/login", userLogin);

// GET /user/:username - Ottieni informazioni utente (DEVE essere l'ultima)
router.get("/find/:username", getUsers);


export default router;
