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
