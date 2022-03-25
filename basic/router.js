var express = require('express');
var router = express.Router();

const keycloak = require('./keycloak.js').getKeycloak();

router.get('/anonymous', function (req, res) {
  res.send('Hello Anonymous');
});
router.get('/client', keycloak.protect('client'), function (req, res) {
  res.send('Hello Client');
});

router.get('/admin', keycloak.protect('admin'), function (req, res) {
  res.send('Hello Admin');
});

router.get(
  '/all-user',
  keycloak.protect(['client', 'admin']),
  function (req, res) {
    res.send('Hello All User');
  }
);

module.exports = router;
