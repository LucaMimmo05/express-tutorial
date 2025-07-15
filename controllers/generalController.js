import { config } from "../config/config.js";

// Home page con impostazione cookie
export const homePage = (req, res) => {
    try {
        res.cookie("name", "express-app", {
            maxAge: config.COOKIE_MAX_AGE,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.json({
            success: true,
            message: "Benvenuto nella User API",
            cookieSet: true,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errore nell'impostazione del cookie",
            error: error.message,
        });
    }
};

// Leggi i cookie
export const fetchCookies = (req, res) => {
    try {
        console.log("🍪 Cookie ricevuti:", req.cookies);

        res.json({
            success: true,
            message: "Cookie recuperati",
            cookies: req.cookies,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errore nel recupero dei cookie",
            error: error.message,
        });
    }
};

// Rimuovi cookie
export const removeCookie = (req, res) => {
    res.clearCookie("name");
    res.json({
        success: true,
        message: "Cookie Cleared",
        timestamp: new Date().toISOString(),
    });
};

// Gestione upload form
export const handleFormUpload = (req, res) => {
    try {
        console.log("📝 Dati form:", req.body);
        console.log("📁 File caricato:", req.file);

        const response = {
            success: true,
            message: "Form inviato con successo",
            formData: req.body,
            timestamp: new Date().toISOString(),
        };

        if (req.file) {
            response.file = {
                originalName: req.file.originalname,
                filename: req.file.filename,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path: req.file.path,
            };
        }

        res.json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errore nel processamento del form",
            error: error.message,
        });
    }
};

// Endpoint di test per errori
export const triggerError = (req, res) => {
    throw new Error("Questo è un errore di test");
};

// Creazione sessione
export const createSession = (req, res) => {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send(`You Visited this page ${req.session.page_views} times`);
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
};
// Rimuovere sessione
export const removeSession = (req, res) => {
    req.session.destroy();
    res.send("Session removed");
};
