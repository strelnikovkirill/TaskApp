const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  }
}, {
  collection: 'task'
});

module.exports = mongoose.model('Task', Task);