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

var server = require('http').createServer(app);
io = require('socket.io')(server);
server.listen(4000);


// Inject Configs
config = require('./config.json');
getToken = require('./token');
// Inject Validators
schemaValitator = require('./schemaValidator');
// Inject Controller
require('../controllers/ioEvents');
controller = require('./modelController');





winston.add(winston.transports.File, {
    filename: 'logs/log.txt',
    json: false,
    maxsize: 5120,
    maxFiles: '5',
    timestamp: true,
    level: 'silly'
});