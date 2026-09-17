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
router.get('/',private.checkJWT,APIController.getAllByCatway)
router.get('/:idReservation',private.checkJWT,APIController.getOneById)
router.post('/',private.checkJWT,APIController.add)
router.put('/:idReservation',private.checkJWT,APIController.update)
router.delete('/:idReservation',private.checkJWT,APIController.delete)

module.exports = router;

