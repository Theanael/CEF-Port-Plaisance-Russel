const express = require('express');
const router = express.Router();

const catwayRoutes= require('./catways')
const userRoutes = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/catways', catwayRoutes)
router.use('/user', userRoutes)
module.exports = router;
