# Configuration du Webhook RSVP

Ce guide explique comment configurer le système de notification automatique pour les RSVP.

## Fonctionnalités

Quand un invité répond au RSVP :
1. **Email de confirmation** envoyé automatiquement à l'invité
2. **Google Sheet** mis à jour avec les données pour analytics

## 1. Variables d'environnement Netlify

Ajoute ces variables dans Netlify (Site settings > Environment variables) :

### Email (déjà configuré)
```
EMAIL_USER=mclainders@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  (App Password Gmail)
```

### Google Sheets (nouveau)
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=rsvp-tracker@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
GOOGLE_SHEET_ID=1ABC...xyz
```

## 2. Configuration Google Sheets

### Étape 1: Créer un projet Google Cloud
1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Crée un nouveau projet (ex: "mclainders-rsvp")
3. Active l'API Google Sheets

### Étape 2: Créer un compte de service
1. Dans le projet, va dans "IAM & Admin" > "Service Accounts"
2. Crée un compte de service
3. Génère une clé JSON
4. Le fichier JSON contient `client_email` et `private_key`

### Étape 3: Créer le Google Sheet
1. Crée un nouveau Google Sheet
2. Nomme la première feuille "RSVP"
3. Ajoute les en-têtes en ligne 1 :
   - A1: Date
   - B1: Prénom
   - C1: Nom
   - D1: Email
   - E1: Samedi
   - F1: Dimanche
   - G1: Enfants
   - H1: Commentaires
4. **Important**: Partage le sheet avec l'email du compte de service (GOOGLE_SERVICE_ACCOUNT_EMAIL) en tant qu'éditeur

### Étape 4: Récupérer l'ID du Sheet
L'ID est dans l'URL du sheet :
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
```

## 3. Configuration du Webhook Supabase

### Via le Dashboard Supabase

1. Va dans **Database** > **Webhooks**
2. Clique sur **Create a new webhook**
3. Configure :
   - **Name**: `rsvp_notification`
   - **Table**: `rsvp`
   - **Events**: Coche uniquement `INSERT`
   - **Type**: HTTP Request
   - **Method**: POST
   - **URL**: `https://mclainders.netlify.app/.netlify/functions/rsvpWebhook`
   - **Headers**: Ajoute `Content-Type: application/json`
   - **Timeout**: 5000ms

4. Clique sur **Create webhook**

## 4. Test

### Test manuel
Insère un RSVP de test dans Supabase :

```sql
INSERT INTO rsvp (first_name, last_name, email, presence_saturday, presence_sunday, with_children, children_count, comments)
VALUES ('Test', 'Utilisateur', 'ton-email@example.com', true, true, false, 0, 'Test webhook');
```

### Vérifications
- [ ] Email de confirmation reçu
- [ ] Ligne ajoutée dans Google Sheet
- [ ] Logs visibles dans Netlify Functions

## 5. Dépannage

### Email non reçu
- Vérifie les variables EMAIL_USER et EMAIL_PASS
- Vérifie que l'App Password Gmail est valide
- Regarde les logs dans Netlify > Functions > rsvpWebhook

### Google Sheet non mis à jour
- Vérifie que le sheet est partagé avec le compte de service
- Vérifie que la feuille s'appelle "RSVP"
- Vérifie les variables GOOGLE_*

### Webhook non déclenché
- Vérifie que le webhook est actif dans Supabase
- Vérifie l'URL du webhook
- Regarde les logs dans Supabase > Logs > Webhooks

## Architecture

```
[Invité RSVP]
    ↓
[submitRSVP.js] → INSERT dans Supabase
    ↓
[Supabase Webhook] → Déclenché sur INSERT
    ↓
[rsvpWebhook.js]
    ├── sendConfirmationEmail() → Gmail
    └── addToGoogleSheet() → Google Sheets
```
