const express = require('express');
const router = express.Router();

const private = require('../middleware/private')

const APIcontroller = require('../controllers/api/catways');
const dashboardController = require('../controllers/dashboard/catways');

const reservationRoute= require('./reservations')

// Dashboard Routes
router.get('/list',dashboardController.getList);
router.get('/:id/page',dashboardController.getPage);
router.get('/create',dashboardController.create);
router.post('/add',dashboardController.add);
router.get('/delete/:id',dashboardController.delete);
router.post('/:id',dashboardController.updateState);


// API Routes
router.get('/',private.checkJWT,APIcontroller.getAll);
router.get('/:id',private.checkJWT,APIcontroller.getOneById);
router.post('/',private.checkJWT,APIcontroller.add);
router.put('/:id',private.checkJWT,APIcontroller.updateState);
router.delete('/:id',private.checkJWT,APIcontroller.delete);

// Reservations Routes
router.use('/:id/reservations',reservationRoute)

module.exports = router;
