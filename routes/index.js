const express = require('express');
const router = express.Router();

const private = require('../middleware/private')

const userAPIController= require('../controllers/api/users')

const catwayRoutes= require('./catways')
const userRoutes = require('./users')
const homeController =require('../controllers/dashboard/home')

// page d'accueil
router.get('/',private.checkCookie,homeController.getHome)

// route de connexion de l'API

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login',userAPIController.login)

// sous-routes
router.use('/catways', catwayRoutes)
router.use('/users', userRoutes)

module.exports = router;
