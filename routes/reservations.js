const express = require('express');
const router = express.Router({ mergeParams: true });

const private = require('../middleware/private')

const APIController = require('../controllers/api/reservations')
const dashboardController = require('../controllers/dashboard/reservations')


// Dashboard Routes
router.get('/create',dashboardController.create)
router.post('/add',dashboardController.add)
router.get('/:idReservation/page',dashboardController.getPage)
router.post('/:idReservation',dashboardController.update)
router.get('/:idReservation/delete',dashboardController.delete)

// API Routes
router.get('/',private.checkJWT,APIController.getAllByCatway)
router.get('/:idReservation',private.checkJWT,APIController.getOneById)
router.post('/',private.checkJWT,APIController.add)
router.put('/:idReservation',private.checkJWT,APIController.update)
router.delete('/:idReservation',private.checkJWT,APIController.delete)

module.exports = router;

