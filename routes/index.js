const express = require('express');
const router = express.Router();

const catwayRoutes= require('./catways')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/catways', catwayRoutes)
module.exports = router;
