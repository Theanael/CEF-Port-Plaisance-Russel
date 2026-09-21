const express = require('express');
const router = express.Router({ mergeParams: true });

const private = require('../middleware/private')

const APIController = require('../controllers/api/users');
const dashboardController = require('../controllers/dashboard/users')


// Dashboard Routes
router.post('/login',dashboardController.login);
router.get('/logout',dashboardController.logout)
router.get('/list',private.checkCookie,dashboardController.getList);
router.get('/create',private.checkCookie,dashboardController.create);
router.post('/add',private.checkCookie,dashboardController.add);
router.get('/:email/page',private.checkCookie,dashboardController.getPage);
router.post('/:email',private.checkCookie,dashboardController.update);
router.get('/:email/delete',private.checkCookie,dashboardController.delete);

// API Routes

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupère la liste des utilisateurs
 *     description: Retourne la liste de tous les utilisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/',private.checkJWT, APIController.getAll);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupère un utilisateur
 *     description: Retourne les informations d'un utilisateur à partir de son email.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description : Email de l'utilisateur
 *         schema: 
 *           type: string
 *           format: email
 *         example : test@example.fr  
 *     responses:
 *       200:
 *         description: Utilisateur récupéré
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/:email',private.checkJWT, APIController.getOneByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crée un utilisateur
 *     description: Crée un nouvel utilisateur à partir des informations fournies.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.fr
 *               username:
 *                 type: string
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       201:
 *         description: Utilisateur nouvellement créé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/',private.checkJWT, APIController.add);

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Modifie un utilisateur
 *     description: Modifie un utilisateur existant à partir de son email.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description : Email de l'utilisateur
 *         schema: 
 *           type: string
 *         example : test@example.fr  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Réservation nouvellement créée
 *       404:
 *         description: Réservation ou Catway non trouvé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.put('/:email',private.checkJWT, APIController.update);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur existant à partir de son email.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description : Email de l'utilisateur
 *         schema: 
 *           type: string
 *         example : test@example.fr  
 *     responses:
 *       204:
 *         description: Réservation nouvellement créée
 *       404:
 *         description: Réservation ou Catway non trouvé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:email',private.checkJWT, APIController.delete);

module.exports = router;
