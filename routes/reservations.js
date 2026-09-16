const express = require('express');
const router = express.Router({ mergeParams: true });

const APIController = require('../controllers/api/reservations')
const dashboardController = require('../controllers/dashboard/reservations')


// Dashboard Routes
router.get('/create',dashboardController.create)
router.post('/add',dashboardController.add)
router.get('/:idReservation/page',dashboardController.getPage)
router.post('/:idReservation',dashboardController.update)
router.get('/:idReservation/delete',dashboardController.delete)

// API Routes
router.get('/',APIController.getAllByCatway)
router.get('/:idReservation',APIController.getOneById)
router.post('/',APIController.add)
router.put('/:idReservation',APIController.update)
router.delete('/:idReservation',APIController.delete)

module.exports = router;

