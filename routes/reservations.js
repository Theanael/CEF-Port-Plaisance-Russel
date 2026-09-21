const express = require('express');
const router = express.Router({ mergeParams: true });

const private = require('../middleware/private')

const APIController = require('../controllers/api/reservations')
const dashboardController = require('../controllers/dashboard/reservations')


// Dashboard Routes
router.get('/create',private.checkCookie,dashboardController.create)
router.post('/add',private.checkCookie,dashboardController.add)
router.get('/:idReservation/page',private.checkCookie,dashboardController.getPage)
router.post('/:idReservation',private.checkCookie,dashboardController.update)
router.get('/:idReservation/delete',private.checkCookie,dashboardController.delete)

// API Routes

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Récupère les réservations d'un catway.
 *     description: Retourne la liste des réservations associées au catway correspondant à l'identifiant fourni.
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
 *       200:
 *         description: Liste des Réservations
 *       401:
 *         description: Token absent ou invalide
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/',private.checkJWT,APIController.getAllByCatway);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Récupère une réservation.
 *     description: Retourne une réservation à partir de son identifiant et de l'identifiant du catway auquel elle est associée.
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
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description : Identifiant de la réservation
 *         schema: 
 *           type: string
 *         example : 6a86012f4bcec9b1e5dfe40c  
 *     responses:
 *       200:
 *         description: Réservation récupérée
 *       401:
 *         description: Token absent ou invalide
 *       404:
 *         description: Réservation ou Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:idReservation',private.checkJWT,APIController.getOneById);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Crée une réservation
 *     description: Crée une nouvelle réservation pour le catway correspondant à l'identifiant fourni.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: John Doe
 *               boatName:
 *                 type: string
 *                 example: La Méduse
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Réservation nouvellement créée
 *       404:
 *         description: Catway non trouvé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/',private.checkJWT,APIController.add);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     tags:
 *       - Reservations
 *     summary: Modifie une réservation
 *     description: Modifie une réservation existante associée au catway indiqué.
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
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description : Identifiant de la réservation
 *         schema: 
 *           type: string
 *         example : 6a86012f4bcec9b1e5dfe40c  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: John Doe
 *               boatName:
 *                 type: string
 *                 example: La Méduse
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
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
router.put('/:idReservation',private.checkJWT,APIController.update);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     tags:
 *       - Reservations
 *     summary: Supprime une réservation.
 *     description: Supprime une réservation à partir de son identifiant et de l'identifiant du catway auquel elle est associée.
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
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description : Identifiant de la réservation
 *         schema: 
 *           type: string
 *         example : 6a86012f4bcec9b1e5dfe40c  
 *     responses:
 *       204:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation ou Catway non trouvé
 *       401:
 *         description: Token absent ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:idReservation',private.checkJWT,APIController.delete);

module.exports = router;

