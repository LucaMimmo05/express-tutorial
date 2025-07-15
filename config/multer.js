import multer from "multer";
import path from "path";
import crypto from "crypto";
import { config } from "./config.js";

// Configurazione storage per multer
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Genera un nome file unico usando crypto
        const uniqueSuffix = crypto.randomUUID();
        const fileExtension = path.extname(file.originalname);
        cb(
            null,
            `${file.fieldname}_${Date.now()}_${uniqueSuffix}${fileExtension}`
        );
    },
});

// Filtro per i tipi di file accettati
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Tipo di file non supportato. Sono accettati solo JPEG, PNG e GIF."
            ),
            false
        );
    }
};

// Configurazione multer completa
export const upload = multer({
    storage,
    limits: {
        fileSize: config.FILE_SIZE_LIMIT,
    },
    fileFilter,
});
