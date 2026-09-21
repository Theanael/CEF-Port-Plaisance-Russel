const express = require('express');
const router = express.Router();

const private = require('../middleware/private')

const APIcontroller = require('../controllers/api/catways');
const dashboardController = require('../controllers/dashboard/catways');

const reservationRoute= require('./reservations')

// Dashboard Routes
router.get('/list',private.checkCookie,dashboardController.getList);
router.get('/create',private.checkCookie,dashboardController.create);
router.post('/add',private.checkCookie,dashboardController.add);
router.get('/delete/:id',private.checkCookie,dashboardController.delete);
router.get('/:id/page',private.checkCookie,dashboardController.getPage);
router.post('/:id',private.checkCookie,dashboardController.updateState);


// API Routes

/**
 * @swagger
 * /catways:
 *   get:
 *     tags:
 *       - Catways
 *     summary: Récupère tous les catways 
 *     description: Retourne la liste de tous les catways enregistrés dans le port de plaisance.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/',private.checkJWT,APIcontroller.getAll);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     tags:
 *       - Catways
 *     summary: Récupère un catway à partir de son id
 *     description: Retourne les informations d'un catway à partir de son identifiant.
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       description : Identifiant du catway
 *       schema: 
 *         type: string
 *       example : 6aa7f4ac38a601a15717f7ff  
 *     responses:
 *       200:
 *         description: Catway récupéré 
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id',private.checkJWT,APIcontroller.getOneById);

/**
 * @swagger
 * /catways:
 *   post:
 *     tags:
 *       - Catways
 *     summary: Crée un catway
 *     description: Crée un nouveau catway à partir des informations fournies.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - catwayType
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: 150
 *               catwayType:
 *                 type: string
 *                 example: short
 *               catwayState:
 *                 type: string
 *                 example: bon état.
 *     responses:
 *       201:
 *         description: Catway nouvellement créé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/',private.checkJWT,APIcontroller.add);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     tags:
 *       - Catways
 *     summary: Modifie l'état d'un catway
 *     description: Modifie l'état d'un catway existant à partir de son identifiant.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *       type: string   
 *       description : Identifiant du catway 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayState
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: bon état.
 *     responses:
 *       200:
 *         description: Etat du catway modifié.
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id',private.checkJWT,APIcontroller.updateState);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     tags:
 *       - Catways
 *     summary: Supprime un catway
 *     description: Supprime définitivement un catway à partir de son identifiant.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description : Identifiant du catway
 *         schema: 
 *           type: string
 *         example : 6aa7f4ac38a601a15717f7ff
 *     responses:
 *       204:
 *         description: Catway supprimé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id',private.checkJWT,APIcontroller.delete);

// Reservations Routes
router.use('/:id/reservations',reservationRoute)

module.exports = router;
