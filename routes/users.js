const express = require('express');
const router = express.Router({ mergeParams: true });

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
router.get('/', APIController.getAll);
router.get('/:id',APIController.getOneById)
router.post('/',APIController.add)
router.put('/:id',APIController.update)
router.delete('/:id',APIController.delete)
module.exports = router;
