const express = require('express');
const router = express.Router({ mergeParams: true });

const private = require('../middleware/private')

const APIController = require('../controllers/api/users');
const dashboardController = require('../controllers/dashboard/users')


// Dashboard Routes
router.get('/list',dashboardController.getList);
router.get('/:id/page',dashboardController.getPage);
router.get('/create',dashboardController.create)
router.post('/add',dashboardController.add)
router.post('/:id',dashboardController.update)
router.get('/:id/delete',dashboardController.delete)

// API Routes
router.get('/',private.checkJWT, APIController.getAll);
router.get('/:id',private.checkJWT, APIController.getOneById)
router.post('/',private.checkJWT, APIController.add)
router.put('/:id',private.checkJWT, APIController.update)
router.delete('/:id',private.checkJWT, APIController.delete)

module.exports = router;
