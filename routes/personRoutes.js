import express from "express";
import {
    createPerson,
    updatePerson,
    deletePerson,
    getAllPersons,
    getPersonById,
} from "../controllers/personController.js";

const router = express.Router();

// GET /person - Ottieni tutte le persone
router.get("/", getAllPersons);

// GET /person/:id - Ottieni una persona per ID
router.get("/:id", getPersonById);

// POST /person - Crea una nuova persona
router.post("/", createPerson);

// PUT /person - Aggiorna una persona
router.put("/", updatePerson);

// DELETE /person/:id - Elimina una persona
router.delete("/:id", deletePerson);

export default router;
