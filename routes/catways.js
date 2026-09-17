const express = require('express');
const router = express.Router();

const private = require('../middleware/private')

const APIcontroller = require('../controllers/api/catways');
const dashboardController = require('../controllers/dashboard/catways');

const reservationRoute= require('./reservations')

// Dashboard Routes
router.get('/list',private.checkCookie,dashboardController.getList);
router.get('/:id/page',private.checkCookie,dashboardController.getPage);
router.get('/create',private.checkCookie,dashboardController.create);
router.post('/add',private.checkCookie,dashboardController.add);
router.get('/delete/:id',private.checkCookie,dashboardController.delete);
router.post('/:id',private.checkCookie,dashboardController.updateState);


// API Routes
router.get('/',private.checkJWT,APIcontroller.getAll);
router.get('/:id',private.checkJWT,APIcontroller.getOneById);
router.post('/',private.checkJWT,APIcontroller.add);
router.put('/:id',private.checkJWT,APIcontroller.updateState);
router.delete('/:id',private.checkJWT,APIcontroller.delete);

// Reservations Routes
router.use('/:id/reservations',reservationRoute)

module.exports = router;
