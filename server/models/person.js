const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Person = new Schema({
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
}, {
  collection: 'person'
});

module.exports = mongoose.model('Person', Person);