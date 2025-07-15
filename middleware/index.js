import multer from "multer";

// Middleware per il logging delle richieste
export const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    next();
};

// Middleware per gestire richieste non trovate
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint non trovato",
        path: req.originalUrl,
    });
};

// Middleware per gestire gli errori
export const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err.message);
    console.error("Stack:", err.stack);

    // Errori di validazione Mongoose
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Errore di validazione",
            errors: Object.values(err.errors).map((e) => e.message),
        });
    }

    // Errori di duplicato MongoDB
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Risorsa già esistente",
            field: Object.keys(err.keyValue)[0],
        });
    }

    // Errori di Multer
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File troppo grande. Massimo 1MB consentito.",
            });
        }
    }

    // Errore generico del server
    res.status(500).json({
        success: false,
        message: "Errore interno del server",
    });
};
