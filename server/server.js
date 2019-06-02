const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const taskRoute = require('./routes/task');
const personRoute = require('./routes/person');
const authRoute = require('./routes/auth');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected!') },
  err => { console.log('Can not connect to the database ' + err) }
);

// TODO: use only for development
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/task', taskRoute);
app.use('/person', personRoute);
app.use('/auth', authRoute);
app.listen(PORT, function() {
  console.log('Server is running on Port: ', PORT);
});