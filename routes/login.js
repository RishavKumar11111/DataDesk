var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var svgCaptcha = require('svg-captcha');
var crypto = require('crypto');
var csrf = require('csurf');
var sha256 = require('js-sha256');
var balModule = require('../models/loginBALModule');
var csrfProtection = csrf();
var parseForm = bodyParser.urlencoded({ extended: false });
var os = require('os');
var cache = require('cache-headers');
var request = require('request');

var overrideConfig = {
  'maxAge': 2000,
  'setPrivate': true
};

function randomNumber() {
  const buf = crypto.randomBytes(16);
  return buf.toString('hex');
};

var getFinancialYear = function () {
  var fiscalYear = "";
  var today = new Date();
  if ((today.getMonth() + 1) <= 3) {
    fiscalYear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().substr(2, 3);
  }
  else {
    fiscalYear = today.getFullYear() + "-" + (today.getFullYear() + 1).toString().substr(2, 3);
  }
  return fiscalYear;
};

var getURL = function (req) {
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  return fullURL;
};

router.get('/captcha', function (req, res) {
  res.get('X-Frame-Options');
  var captcha = svgCaptcha.createMathExpr({ color: true, noise: 5 });
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
});

router.get('/', csrfProtection, cache.overrideCacheHeaders(overrideConfig), function (req, res, next) {
  req.session.RandomNo = randomNumber();
  res.get('X-Frame-Options');
  res.render('login', { randomNo: req.session.RandomNo, csrfToken: req.csrfToken(), title: 'Login', error: '' });
});

router.post('/', parseForm, csrfProtection, cache.overrideCacheHeaders(overrideConfig), function (req, res, next) {
  res.get('X-Frame-Options');
  if (req.body.captcha !== req.session.captcha) {
    res.render('login', { randomNo: req.session.RandomNo, csrfToken: req.csrfToken(), title: 'Login', error: 'Invalid Captcha' });
  }
  else {
    balModule.getUserDetails(req.body.username).then(function success(response) {
      if (response.length === 0) {
        res.render('login', { randomNo: req.session.RandomNo, csrfToken: req.csrfToken(), title: 'Login', error: 'Invalid Username or Password' });
      }
      else {
        var pwdHash = response[0].PasswordHash;
        var pwdRNo = sha256(pwdHash + req.session.RandomNo);
        if (pwdRNo === req.body.password) {
          req.session.username = req.body.username;
          let tempSession = req.session;
          req.session.regenerate(function (err) {
            Object.assign(req.session, tempSession);
          });
          balModule.addActivityLog(req.connection.remoteAddress, req.session.username, getURL(req), req.device.type.toUpperCase(), os.platform(), req.headers['user-agent'], '/login', 'LOGIN', 'POST', function success(response) { }, function error(response) { console.log(response.status); });
          req.session.save(function (err) {
            res.redirect('datadesk');
          });
        }
        else {
          balModule.addActivityLog(req.connection.remoteAddress, response[0].UserID, getURL(req), req.device.type.toUpperCase(), os.platform(), req.headers['user-agent'], '/login', 'FAILED', 'POST', function success(response) { }, function error(response) { console.log(response.status); });
          res.render('login', { randomNo: req.session.RandomNo, csrfToken: req.csrfToken(), title: 'Login', error: 'Invalid Username or Password' });
        }
      }
    }, function error(response) {
      console.log(response.status);
    }).catch(function err(error) {
      console.log('An error occurred...', error);
    });
  }
});

module.exports = router;