const express = require('express');
const router = express.Router();

const private = require('../middleware/private')

const userAPIController= require('../controllers/api/users')

const catwayRoutes= require('./catways')
const userRoutes = require('./users')

/* GET home page. */
router.get('/',private.checkJWT, function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login',userAPIController.login)

router.use('/catways', catwayRoutes)
router.use('/users', userRoutes)

module.exports = router;
