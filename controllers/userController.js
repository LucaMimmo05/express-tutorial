import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

// Controller per la gestione degli utenti
export const getUsers = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utente non trovato",
            });
        }

        res.json({
            success: true,
            message: "Utente trovato",
            user,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errore nel recupero dell'utente",
            error: error.message,
        });
    }
};

// Controller per la ricerca
export const searchController = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        if (!keyword) {
            return res.json({
                success: true,
                message: "Nessuna parola chiave fornita",
                results: [],
            });
        }

        const users = await User.find({
            username: { $regex: keyword, $options: "i" },
        }).select("-password");

        res.json({
            success: true,
            message: `Risultati della ricerca per: ${keyword}`,
            keyword,
            results: users,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errore nella ricerca",
            error: error.message,
        });
    }
};

// Registrazione utente
export const userRegistration = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({ username, password: hashedPassword });
        
        res.status(201).send("User registered");
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send("Username already exists");
        }
        res.status(500).json({ message: error.message });
    }
};

// Login utente
export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Not authorized");
        }

        const token = jwt.sign({ username }, "test#secret", { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
