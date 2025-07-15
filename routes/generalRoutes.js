import express from "express";
import { upload } from "../config/multer.js";
import {
    homePage,
    fetchCookies,
    removeCookie,
    handleFormUpload,
    triggerError,
    createSession,
    removeSession
} from "../controllers/generalController.js";

const router = express.Router();

// GET / - Home page con impostazione cookie
router.get("/", homePage);

// GET /fetch - Leggi i cookie
router.get("/fetch", fetchCookies);

// GET /remove-cookie - Rimuovi cookie
router.get("/remove-cookie", removeCookie);

// POST /form - Gestione upload form con file
router.post("/form", upload.single("image"), handleFormUpload);

// GET /error - Endpoint di test per errori
router.get("/error", triggerError);

// GET /visit - Endpoint per creare una sessione
router.get("/visit", createSession);

// GET /remove-visit - Endpoint per rimuovere una sessione
router.get("/remove-session", removeSession);

export default router;
