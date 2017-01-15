const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const exp = express();

exports.exp = exp;
exp.disable('x-powered-by');
exp.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
exp.use(express.static(path.join(__dirname, '../public')));
exp.use(bodyParser.json());
exp.use(bodyParser.urlencoded({extended: true}));

exp.use(cookieParser());
exp.use(session({secret: '1234'}));

console.log(path.join(__dirname, '../node_modules'));
exp.use('/templates',
express.static(path.join(__dirname, '../views/templates')));
exp.use('/scripts',
express.static(path.join(__dirname, '../node_modules')));

/* GET home page. */
exp.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});
