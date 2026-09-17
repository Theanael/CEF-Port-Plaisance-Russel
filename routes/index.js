const express = require('express');
const router = express.Router();

const private = require('../middleware/private')

const userAPIController= require('../controllers/api/users')

const catwayRoutes= require('./catways')
const userRoutes = require('./users')
const homeController =require('../controllers/dashboard/home')

/* GET home page. */
router.get('',private.checkCookie,homeController.getHome)

router.post('/login',userAPIController.login)

router.use('/catways', catwayRoutes)
router.use('/users', userRoutes)

module.exports = router;
