const express = require('express');
const cors = require("cors");
const connectDB = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = require('../routes/router');
const errorHandler = require('../middleware/errorHandler');
connectDB();

const app = express();

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(passport.initialize());

require('../config/passport')(passport);

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use(errorHandler);

module.exports = app;