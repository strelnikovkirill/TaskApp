const express = require('express');
const personRoutes = express.Router();
const sha256 = require('../utils/hash');
let Person = require('../models/person');

personRoutes.route('/add').post(function (req, res) {
  let reqPerson = new Person(req.body);
  Person.findOne({login: req.login}, function (err, person) {
    if (person) {
      console.log(person);
      res.status(500).json({'success': false, 'message': 'A person with such login already exists'})
    } else {
      reqPerson.token = sha256(req.login, "s0me@ver4#!#secure=+=sa1t");
      reqPerson.save()
        .then(person => {
          res.status(200).json({'success': true, token: person.token});
        })
        .catch(err => {
          console.log(err);
          res.status(400).send('Unable to save to database!');
        })
    }
  })
});

personRoutes.route('/').get(function (req, res) {
  Person.find(function (err, person) {
    if (err) console.log(err);
    else res.json(person);
  });
});

personRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Person.findById(id, function (err, person) {
    res.json(person);
  });
});

personRoutes.route('/update/:id').post(function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (!person)
      res.status(404).send('Data is not found!');
    else {
      person.firstName = req.body.firstName;
      person.secondName = req.body.secondName;
      person.login = req.body.login;
      person.password = req.body.password;
      person.save().then(person => {
        res.json('Update complete!');
      })
        .catch(err => {
          res.status(400).send('Unable to update the database!');
        });
    }
  });
});

personRoutes.route('/delete/:id').get(function (req, res) {
  Person.findByIdAndRemove({_id: req.params.id}, function (err, person) {
    if (err) res.json(err);
    else res.json('Person is successfully removed!');
  });
});

module.exports = personRoutes;