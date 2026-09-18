const express = require('express');
const router = express.Router({ mergeParams: true });

const private = require('../middleware/private')

const APIController = require('../controllers/api/users');
const dashboardController = require('../controllers/dashboard/users')


// Dashboard Routes
router.post('/login',dashboardController.login);
router.get('/logout',dashboardController.logout)
router.get('/list',private.checkCookie,dashboardController.getList);
router.get('/create',private.checkCookie,dashboardController.create);
router.post('/add',private.checkCookie,dashboardController.add);
router.get('/:email/page',private.checkCookie,dashboardController.getPage);
router.post('/:email',private.checkCookie,dashboardController.update);
router.get('/:email/delete',private.checkCookie,dashboardController.delete);

// API Routes
router.get('/',private.checkJWT, APIController.getAll);
router.get('/:email',private.checkJWT, APIController.getOneByEmail);
router.post('/',private.checkJWT, APIController.add);
router.put('/:email',private.checkJWT, APIController.update);
router.delete('/:email',private.checkJWT, APIController.delete);

module.exports = router;
