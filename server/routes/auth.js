const express = require('express');
const authRoutes = express.Router();
const sha256 = require('../utils/hash');
let Person = require('../models/person');


authRoutes.route('/').post(function (req, res) {
  Person.findOne({login: req.login}, function (err, person) {
    if (person) {
      if (!person.token) {
        person.token = sha256(req.login, "s0me@ver4#!#secure=+=sa1t");
        // Person.save(person);
      }
      res.status(200).json({
        'success': true,
        'token': person.token
      })
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