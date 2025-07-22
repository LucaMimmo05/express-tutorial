import jwt from "jsonwebtoken";
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

// Gestione Errori asincroni
export const asyncError = async (req, res, next) => {
    try {
        await Promise.reject(new Error("Async error occured"));
    } catch (err) {
        next(err);
    }
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

// Dashboard
export const visualizeDashboard = (req, res) => {
    const authHeader = req.header("Authorization");

    console.log("Received token:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1]; // estrai solo il token

    try {
        const decodedToken = jwt.verify(token, "test#secret");

        if (decodedToken.username) {
            res.send(`Welcome, ${decodedToken.username}`);
        } else {
            res.status(403).send("Access denied");
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
