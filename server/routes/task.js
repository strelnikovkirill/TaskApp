const express = require('express');
const taskRouter = express.Router();
let Task = require('../models/task');

taskRouter.route('/add').post(function (req, res) {
  let task = new Task(req.body);
  task.save()
    .then(task => {
      res.status(200).json({'task': 'Task is successfully added!'});
    })
    .catch(err => {
      res.status(400).send('Unable to save to database!');
    });
});

taskRouter.route('/').get(function (req, res) {
  Task.find(function (err, tasks) {
    if (err) console.log(err);
    else res.json(tasks);
  });
});

taskRouter.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Task.findById(id, function (err, task) {
    console.log(task);
    if (task) {
      res.status(200).json(task);
    }
  });
});

taskRouter.route('/update/:id').post(function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (!task)
      res.status(404).send('Data is not found!');
    else {
      task.title = req.body.title;
      task.description = req.body.description;
      task.date = req.body.date;
      task.save().then(task => {
        res.json('Update complete!');
      })
        .catch(err => {
          res.status(400).send('Unable to update the database!');
        });
    }
  });
});

taskRouter.route('/delete/:id').get(function (req, res) {
  Task.findByIdAndRemove({_id: req.params.id}, function (err, task) {
    if (err) res.json(err);
    else res.json('Task is successfully removed!');
  });
});

module.exports = taskRouter;