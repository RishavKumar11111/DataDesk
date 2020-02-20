var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('datadesk/layout', { title: 'Layout' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('datadesk/dashboard', { title: 'Dashboard' });
});

router.get('/epest', function(req, res, next) {
  res.render('datadesk/epest', { title: 'e-Pest' });
});

router.get('/souraJalanidhi', function(req, res, next) {
  res.render('datadesk/sourajalanidhi', { title: 'Soura Jalanidhi' });
});

module.exports = router;