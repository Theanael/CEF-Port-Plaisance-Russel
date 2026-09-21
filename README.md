# Port de plaisance Russel

Application web permettant de gérer les utilisateurs, les catways et les réservations d'un port de plaisance.

## Fonctionnalités

- Connexion et déconnexion des utilisateurs
- Gestion des utilisateurs
- Gestion des catways
- Gestion des réservations
- API REST
- Authentification JWT
- Documentation de l'API avec Swagger

## Prérequis

- Node.js
- MongoDB
- npm

## Installation

Cloner le projet puis installer les dépendances :

```bash
git clone <URL_DU_REPOSITORY>
cd CEF-Port-Plaisance-Russel
npm install
```

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/port-plaisance-russel
SESSION_SECRET=ma_cle_secrete
JWT_SECRET=ma_cle_jwt
```

## Lancement

Pour lancer le serveur :

```bash
npm start
```

En mode développement :

```bash
npm run dev
```

L'application est accessible à l'adresse :

http://localhost:3000

## Routes principales

### Utilisateurs

- `POST /users/login` — Connexion
- `GET /users/list` — Liste des utilisateurs
- `POST /users/create` — Création d'un utilisateur
- `POST /users/logout` — Déconnexion

### Catways

- `GET /catways` — Liste des catways
- `GET /catways/:id` — Détails d'un catway
- `POST /catways/add` — Ajouter un catway
- `PUT /catways/:id` — Modifier un catway
- `DELETE /catways/:id` — Supprimer un catway

### Réservations

- `GET /reservations` — Liste des réservations
- `GET /reservations/:id` — Détails d'une réservation
- `POST /reservations/add` — Ajouter une réservation
- `PUT /reservations/:id` — Modifier une réservation
- `DELETE /reservations/:id` — Supprimer une réservation

## Documentation de l'API

La documentation Swagger est disponible à l'adresse :

http://localhost:3000/api-docs/

Elle permet de consulter et tester les différentes routes de l'API.

## Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JWT
- Swagger
- HTML / CSS / JavaScript