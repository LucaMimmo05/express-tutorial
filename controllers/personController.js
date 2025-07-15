import { Person } from "../models/Person.js";

// Crea una nuova persona
export const createPerson = async (req, res) => {
    try {
        const { email, name, age } = req.body;

        // Validazione input
        if (!email || !name || !age) {
            return res.status(400).json({
                success: false,
                message: "Tutti i campi sono obbligatori (email, name, age)",
            });
        }

        const newPerson = new Person({
            name,
            age,
            email,
        });

        const savedPerson = await newPerson.save();
        console.log("✅ Nuova persona creata:", savedPerson._id);

        res.status(201).json({
            success: true,
            message: "Persona aggiunta con successo",
            data: savedPerson,
        });
    } catch (error) {
        console.error("❌ Errore nella creazione:", error.message);
        res.status(500).json({
            success: false,
            message: "Errore nella creazione della persona",
            error: error.message,
        });
    }
};

// Aggiorna una persona
export const updatePerson = async (req, res) => {
    try {
        const { id, name, age, email } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID della persona richiesto",
            });
        }

        // Prepara i dati da aggiornare
        const updateData = {};
        if (name) updateData.name = name;
        if (age) updateData.age = age;
        if (email) updateData.email = email;

        const updatedPerson = await Person.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedPerson) {
            return res.status(404).json({
                success: false,
                message: "Persona non trovata",
            });
        }

        console.log("✅ Persona aggiornata:", updatedPerson._id);

        res.json({
            success: true,
            message: "Persona aggiornata con successo",
            data: updatedPerson,
        });
    } catch (error) {
        console.error("❌ Errore nell'aggiornamento:", error.message);
        res.status(500).json({
            success: false,
            message: "Errore nell'aggiornamento della persona",
            error: error.message,
        });
    }
};

// Elimina una persona
export const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPerson = await Person.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({
                success: false,
                message: "Persona non trovata",
            });
        }

        console.log("✅ Persona eliminata:", id);

        res.json({
            success: true,
            message: "Persona eliminata con successo",
            data: deletedPerson,
        });
    } catch (error) {
        console.error("❌ Errore nell'eliminazione:", error.message);
        res.status(500).json({
            success: false,
            message: "Errore nell'eliminazione della persona",
            error: error.message,
        });
    }
};

// Ottieni tutte le persone
export const getAllPersons = async (req, res) => {
    try {
        const persons = await Person.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            message: "Persone recuperate con successo",
            count: persons.length,
            data: persons,
        });
    } catch (error) {
        console.error("❌ Errore nel recupero:", error.message);
        res.status(500).json({
            success: false,
            message: "Errore nel recupero delle persone",
            error: error.message,
        });
    }
};

// Ottieni una persona per ID
export const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;

        const person = await Person.findById(id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Persona non trovata",
            });
        }

        res.json({
            success: true,
            message: "Persona trovata",
            data: person,
        });
    } catch (error) {
        console.error("❌ Errore nel recupero:", error.message);
        res.status(500).json({
            success: false,
            message: "Errore nel recupero della persona",
            error: error.message,
        });
    }
};
