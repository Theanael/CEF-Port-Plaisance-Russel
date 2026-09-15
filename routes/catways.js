const express = require('express');
const router = express.Router();

const APIcontroller = require('../controllers/api/catways');
const dashboardController = require('../controllers/dashboard/catways');


// Dashboard Routes
router.get('/list',dashboardController.getList);
router.get('/:id',dashboardController.getPage);
router.get('/create',dashboardController.create);
router.post('/add',dashboardController.add);
router.get('/delete/:id',dashboardController.delete);
router.post('/:id',dashboardController.updateState);


// API Routes
router.get('/',APIcontroller.getAll);
router.get('/:id',APIcontroller.getOneById);
router.post('/',APIcontroller.add);
router.put('/:id',APIcontroller.updateState);
router.delete('/:id',APIcontroller.delete);


module.exports = router;
