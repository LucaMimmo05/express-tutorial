import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { connectDB } from "./config/db.js";
import { config } from "./config/config.js";
import routes from "./routes/index.js";
import {
    requestLogger,
    errorHandler,
    notFoundHandler,
} from "./middleware/index.js";

// Inizializzazione app Express
const app = express();

// Connessione al database
await connectDB();

// Middleware globali
app.use(cookieParser()); // Parser per i cookie
app.use(express.json()); // Parser per JSON
app.use(express.urlencoded({ extended: true })); // Parser per form data
app.use(express.static("public")); // Serve file statici dalla cartella public
app.use(session({
    secret: "sample-secret",
    resave:false,
    saveUninitialized: false
})) // Middleware per sessions

// Middleware personalizzati
app.use(requestLogger); // Log delle richieste

// Rotte dell'applicazione
app.use("/", routes);

// Gestione degli errori e rotte non trovate
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Endpoint non trovato",
        path: req.originalUrl,
    });
});
app.use(errorHandler); // Gestione errori globale

// Avvio del server
app.listen(config.PORT, () => {
    console.log(`🚀 Server avviato su http://localhost:${config.PORT}`);
});
