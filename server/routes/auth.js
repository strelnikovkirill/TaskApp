const express = require('express');
const authRoutes = express.Router();
const sha256 = require('../utils/hash');
let Person = require('../models/person');
const salts = require('../utils/salt_c');

authRoutes.route('/').post(function (req, res) {
  Person.findOne({login: req.body.login}, function (err, person) {
    if (person) {
      if (sha256(req.body.password, salts.password) === person.password) {
        if (!person.token) {
          person.token = sha256(req.login, salts.token);
          person.save();
        }
        res.status(200).json({
          'success': true,
          'token': person.token,
          'login': person.login
        })
      } else {
        res.status(200).json({
          'success': false,
          'message': 'Password is incorrect'
        })
      }
    } else {
      res.status(200).json({
        'success': false,
        'message': 'Login not found, are you registered?'
      })
    }
  })
})

authRoutes.route('/token').post(function (req, res) {
  Person.find({'token': /req.token/}, function (err, person) {
    if (err) {
      res.json(501).json({'error': "Try to relogin"})
    } else {
      res.json(200)
    }
  })
})

module.exports = authRoutes;