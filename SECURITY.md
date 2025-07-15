# 🔐 Guida alla Sicurezza

## Variabili d'Ambiente

### ❌ NON FARE MAI:

```javascript
// NON hardcodare mai credenziali nel codice!
const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/db";
```

### ✅ FARE INVECE:

```javascript
// Usa sempre variabili d'ambiente
const MONGODB_URI = process.env.MONGODB_URI;
```

## Setup Sicuro

1. **Copia il template:**

    ```bash
    cp .env.example .env
    ```

2. **Modifica `.env` con i tuoi dati:**

    ```env
    MONGODB_URI=mongodb+srv://tuo-username:tua-password@tuo-cluster.mongodb.net/tuo-database
    ```

3. **Verifica che `.env` sia nel `.gitignore`:**
    ```gitignore
    # Variabili d'ambiente
    .env
    ```

## Best Practices

-   ✅ Usa sempre `.env` per dati sensibili
-   ✅ Fornisci `.env.example` come template
-   ✅ Documenta quali variabili sono necessarie
-   ✅ Usa valori di default sicuri nel codice
-   ❌ Non committare mai `.env` su Git
-   ❌ Non condividere credenziali in chat/email
-   ❌ Non hardcodare password nel codice

## Ambiente di Produzione

In produzione, imposta le variabili d'ambiente tramite:

-   Pannello di controllo del provider (Heroku, Vercel, etc.)
-   File di configurazione del server
-   Sistemi di gestione segreti (AWS Secrets Manager, etc.)

## Controllo Sicurezza

Prima di ogni commit, verifica:

```bash
# Controlla che .env non sia tracciato
git status

# Cerca eventuali credenziali hardcoded
grep -r "mongodb+srv" . --exclude-dir=node_modules
grep -r "password" . --exclude-dir=node_modules
```
