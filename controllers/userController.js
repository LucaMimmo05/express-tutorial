import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// Controller per la gestione degli utenti
export const getUsers = (req, res) => {
    try {
        const username = req.params.username || "Guest";

        res.json({
            success: true,
            message: `Benvenuto dal controller utenti!`,
            user: username,
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
export const searchController = (req, res) => {
    try {
        const keyword = req.query.keyword || "Nessuna parola chiave fornita";

        res.json({
            success: true,
            message: `Risultati della ricerca per: ${keyword}`,
            keyword,
            results: [],
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

const users = [];
// Registrazione utente
export const userRegistration = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.send("User registered");
};

// Login utente
export const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password ))) {
        return res.send("Not authorized");
    }

    const token = jwt.sign({username}, "test#secret",  { expiresIn: "1h" })

    res.json({token});
};
