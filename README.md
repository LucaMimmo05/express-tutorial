# Express App - Progetto Tutorial ✨

## 📋 Descrizione

Un'applicazione Express.js completamente riorganizzata e ottimizzata che include gestione di utenti, CRUD per persone, **gestione prodotti**, upload di file, gestione cookie, **sessioni utente**, **autenticazione JWT** e middleware personalizzati. Il progetto è stato ristrutturato seguendo le best practices per una migliore manutenibilità e scalabilità.

## 🏗️ Struttura del Progetto

```
express-app/
├── 📁 config/              # Configurazioni centralizzate
│   ├── config.js           # Variabili di configurazione
│   ├── db.js               # Connessione database MongoDB
│   └── multer.js           # Configurazione upload file
├── 📁 controllers/         # Controller per la logica business
│   ├── generalController.js # Cookie, upload, home, sessioni, dashboard
│   ├── personController.js  # CRUD persone
│   ├── productController.js # Gestione prodotti
│   └── userController.js    # Gestione utenti, auth JWT
├── 📁 middleware/          # Middleware personalizzati
│   └── index.js            # Logging, errori, 404
├── 📁 models/              # Modelli database Mongoose
│   ├── Person.js           # Schema persona
│   ├── Product.js          # Schema prodotto
│   └── User.js             # Schema utente
├── 📁 routes/              # Definizione rotte organizzate
│   ├── generalRoutes.js    # Rotte generali, cookie, sessioni, dashboard
│   ├── personRoutes.js     # Rotte CRUD persone
│   ├── productRoutes.js    # Rotte gestione prodotti
│   ├── userRoutes.js       # Rotte utenti, auth JWT
│   └── index.js            # Aggregatore rotte
├── 📁 public/              # File statici
│   └── index.html          # Documentazione API interattiva
├── 📁 uploads/             # File caricati dagli utenti
├── 📁 views/               # Template (future implementazioni)
├── .env                    # Variabili d'ambiente (NON committare)
├── .env.example            # Template variabili d'ambiente
├── .gitignore              # File da ignorare in Git
├── SECURITY.md             # Guida alla sicurezza
├── index.js                # File principale dell'app
├── package.json            # Dipendenze e scripts
└── README.md               # Documentazione (questo file)
```

## 🚀 Installazione e Avvio

1.  **Installa le dipendenze:**

    ```bash
    npm install
    ```

2.  **Configura le variabili d'ambiente:**
    Il progetto utilizza il file `.env` per le configurazioni. Copia il file template e modifica i valori:

    ```bash
    cp .env.example .env
    ```

    Poi modifica `.env` con le tue configurazioni:

    ```env
    # Configurazione Server
    PORT=3000
    NODE_ENV=development

    # Database MongoDB
    # Sostituisci con il tuo URL MongoDB
    MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database

    # Cookie Settings
    COOKIE_MAX_AGE=360000

    # File Upload Settings
    FILE_SIZE_LIMIT=1000000
    ```

    **⚠️ Importante**: Non committare mai il file `.env` su GitHub! Contiene credenziali sensibili.

3.  **Avvia il server:**

    ```bash
    # Modalità sviluppo (con nodemon)
    npm start
    npm run dev

    # Modalità produzione
    npm run prod
    ```

## 📡 API Endpoints

Visita `http://localhost:3000` per vedere la **documentazione interattiva** completa di tutti gli endpoint, parametri richiesti e modelli del database.

### 🏠 Endpoint Generali

| Metodo | Endpoint          | Descrizione                       |
| ------ | ----------------- | --------------------------------- |
| `GET`  | `/`               | Documentazione API                |
| `GET`  | `/fetch`          | Leggi cookie salvati              |
| `GET`  | `/remove-cookie`  | Rimuovi cookie                    |
| `POST` | `/form`           | Upload file con form data         |
| `GET`  | `/visit`          | Crea/incrementa sessione          |
| `GET`  | `/remove-session` | Rimuovi sessione utente           |
| `GET`  | `/dashboard`      | Dashboard protetta (richiede JWT) |

### 👤 Gestione Utenti e Autenticazione

| Metodo | Endpoint                   | Descrizione                   |
| ------ | -------------------------- | ----------------------------- |
| `GET`  | `/user/search?keyword=...` | Ricerca utenti                |
| `GET`  | `/user/find/:username`     | Informazioni utente specifico |
| `POST` | `/user/register`           | Registrazione nuovo utente    |
| `POST` | `/user/login`              | Login utente (genera JWT)     |

### 👥 CRUD Persone

| Metodo   | Endpoint      | Descrizione                |
| -------- | ------------- | -------------------------- |
| `GET`    | `/person`     | Ottieni tutte le persone   |
| `GET`    | `/person/:id` | Ottieni persona per ID     |
| `POST`   | `/person`     | Crea nuova persona         |
| `PUT`    | `/person`     | Aggiorna persona esistente |
| `DELETE` | `/person/:id` | Elimina persona            |

### 📦 Gestione Prodotti

| Metodo | Endpoint       | Descrizione              |
| ------ | -------------- | ------------------------ |
| `GET`  | `/product`     | Ottieni tutti i prodotti |
| `GET`  | `/product/:id` | Ottieni prodotto per ID  |
| `POST` | `/product`     | Crea nuovo prodotto      |

## 🔧 Funzionalità Implementate

### ✅ Core Features

-   ✅ **Database MongoDB** con Mongoose
-   ✅ **CRUD completo** per entità Person, Product e User
-   ✅ **Gestione prodotti** salvati su database
-   ✅ **Upload file** con validazione tipo/dimensione
-   ✅ **Gestione cookie** sicura
-   ✅ **Gestione sessioni** con express-session
-   ✅ **Autenticazione JWT** completa (register/login/protected routes)
-   ✅ **Hashing password** con bcryptjs
-   ✅ **Middleware di logging** per tutte le richieste
-   ✅ **Gestione errori centralizzata** e dettagliata
-   ✅ **Validazione input** robusta
-   ✅ **Struttura modulare** MVC
-   ✅ **Risposte JSON standardizzate**
-   ✅ **Configurazione sicura** con variabili d'ambiente
-   ✅ **Interfaccia Web** moderna per la documentazione API

### 🛡️ Sicurezza e Validazione

-   🔒 Validazione tipi di file (solo immagini)
-   📏 Limite dimensione file (1MB max)
-   🍪 Cookie httpOnly per sicurezza
-   ⚠️ Gestione errori sicura (no esposizione dati sensibili)
-   ✔️ Validazione completa input utente
-   🚫 Protezione contro path traversal negli upload
-   🔐 **Gestione sicura variabili d'ambiente** (.env escluso da Git)
-   🔑 **JWT Authentication** con token sicuri
-   🔒 **Password hashing** con bcryptjs (salt rounds: 10)
-   🛡️ **Bearer token** validation sui endpoint protetti

### 🎨 Miglioramenti Strutturali

-   📁 **Separazione responsabilità** (routes, controllers, middleware)
-   🔧 **Configurazione centralizzata**
-   📊 **Logging strutturato** con timestamp e IP
-   🎯 **Error handling specifico** per tipo di errore
-   📝 **Documentazione completa**
-   🌐 **Pagina HTML** di benvenuto e documentazione

## 📝 Esempi di Utilizzo

### Creare una persona:

```bash
curl -X POST http://localhost:3000/person \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mario Rossi",
    "age": 30,
    "email": "mario.rossi@email.com"
  }'
```

### Upload di un file:

```bash
curl -X POST http://localhost:3000/form \
  -F "image=@/path/to/image.jpg" \
  -F "description=Descrizione del file"
```

### Ottenere tutte le persone:

```bash
curl http://localhost:3000/person
```

### Gestione prodotti:

```bash
# Ottieni tutti i prodotti
curl http://localhost:3000/product

# Ottieni un prodotto specifico per ID
curl http://localhost:3000/product/656...

# Crea un nuovo prodotto
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone",
    "price": 699
  }'
```

### Ricerca utente:

```bash
curl "http://localhost:3000/user/search?keyword=mario"
```

### Autenticazione JWT:

```bash
# 1. Registra un nuovo utente
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'

# 2. Effettua login per ottenere il token
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
# Output: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# 3. Accedi alla dashboard protetta con il token
curl -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  http://localhost:3000/dashboard
# Output: "Welcome, testuser"

# 4. Tentativo accesso senza token (fallisce)
curl http://localhost:3000/dashboard
# Output: {"message": "Token missing or malformed"}
```

## 🔄 Changelog

### v2.1 - UI & Database Models ✨

-   **🌐 Interfaccia**: Nuova pagina HTML moderna per la documentazione API
-   **📚 Documentazione**: Lista interattiva di endpoint e modelli
-   **🗄️ Database**: Aggiunti modelli Mongoose per User e Product
-   **🛡️ Resilienza**: Il server si avvia anche se il DB non è raggiungibile
-   **🐛 Bugfix**: Corretto ordine delle rotte utente e gestione errori DB

### v2.0 - Ristrutturazione Completa ✨

-   **🏗️ Architettura**: Implementato pattern MVC completo
-   **📁 Organizzazione**: Separazione logica in cartelle dedicate
-   **🛡️ Middleware**: Sistema centralizzato per logging ed errori
-   **🎯 Routing**: Organizzazione modulare delle rotte
-   **📊 Configurazione**: Sistema centralizzato per configurazioni
-   **✅ Validazione**: Migliorata validazione input e gestione errori
-   **🔐 Sicurezza**: Gestione sicura variabili d'ambiente
-   **🍪 Sessioni**: Aggiunta gestione sessioni utente
-   **🔑 Autenticazione**: Sistema JWT completo con register/login
-   **🔒 Password Security**: Hashing bcryptjs per password sicure
-   **🛡️ Protected Routes**: Dashboard protetta con JWT
-   **📦 Gestione Prodotti**: API RESTful per gestione prodotti
-   **📖 Documentazione**: Aggiunta documentazione completa e guida sicurezza
-   **🔧 DevOps**: Aggiunto .gitignore e scripts npm ottimizzati

### v1.0 - Versione Originale

-   Implementazione base con tutte le funzionalità in un singolo file

## 📚 Tecnologie Utilizzate

-   **Node.js** - Runtime JavaScript
-   **Express.js v5** - Framework web
-   **MongoDB** - Database NoSQL
-   **Mongoose** - ODM per MongoDB
-   **Multer** - Gestione upload file
-   **Cookie-parser** - Gestione cookie
-   **Express-session** - Gestione sessioni utente
-   **JsonWebToken (JWT)** - Autenticazione basata su token
-   **Bcryptjs** - Hashing sicuro delle password
-   **Dotenv** - Gestione variabili d'ambiente
-   **Nodemon** - Auto-restart sviluppo
