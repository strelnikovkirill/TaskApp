const express = require('express');
const personRoutes = express.Router();

let Person = require('../models/person');

personRoutes.route('/add').post(function (req, res) {
  let person = new Person(req.body);
  person.save()
        .then(person => {
          res.status(200).json({'person': 'Person is added successfully'});
        })
        .catch(err => {
          res.status(400).send('Unable to save to database!');
        });
});

personRoutes.route('/').get(function (req, res) {
  Person.find(function(err, person) {
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
  Person.findById(req.params.id, function(err, person) {
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
  Person.findByIdAndRemove({ _id: req.params.id }, function(err, person) {
    if (err) res.json(err);
    else res.json('Person is successfully removed!');
  });
});

module.exports = personRoutes;