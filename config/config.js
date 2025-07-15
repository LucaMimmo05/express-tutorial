import dotenv from "dotenv";

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Configurazione per le variabili d'ambiente
export const config = {
    PORT: parseInt(process.env.PORT) || 3000,
    MONGODB_URI:
        process.env.MONGODB_URI || "mongodb://localhost:27017/express-app",
    COOKIE_MAX_AGE: parseInt(process.env.COOKIE_MAX_AGE) || 360000,
    FILE_SIZE_LIMIT: parseInt(process.env.FILE_SIZE_LIMIT) || 1000000, // 1MB
    NODE_ENV: process.env.NODE_ENV || "development",
};
