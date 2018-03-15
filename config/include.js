express = require('express');
app = express();
router = express.Router();
mongoose = require('mongoose');
Schema = mongoose.Schema;
winston = require('winston');
helmet = require('helmet');
passport = require('passport');
JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
bcrypt = require('bcrypt-nodejs');
jwt = require('jsonwebtoken');
Joi = require('joi');
FCM=require('fcm-node');
storage = require('@google-cloud/storage');
UUID=require('uuid-v4');

var server = require('http').createServer(app);
io = require('socket.io')(server);
server.listen(environment.socketPort);
gcs = storage({
    projectId: process.env.firebaseProjectId,
    keyFilename: './config/firebaseConfig.json'
});

// Inject Configs
config = require('./config.json');
getToken = require('./token');
// Inject Validators
schemaValitator = require('./schemaValidator');
// Inject Controller
require('../controllers/ioEvents');
// notification=require('../controllers/notification');
controller = require('./modelController');

winston.add(winston.transports.File, {
    filename: 'logs/log.txt',
    json: false,
    maxsize: 5120,
    maxFiles: '5',
    timestamp: true,
    level: 'silly'
});