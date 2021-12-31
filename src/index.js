const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream'); // version 2.x
const winston = require('winston');

require('dotenv').config()

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

// add prefix to routes
const router = express.Router()
const routes = require('./routes')(router, {});
app.use('/auth', routes)

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});