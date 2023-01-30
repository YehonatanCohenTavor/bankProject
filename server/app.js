var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const database = require('./connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');
const creditsRouter = require('./routes/credits');
const customersRouter = require('./routes/customers');
const accountsRouter = require('./routes/accounts');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/credits', creditsRouter);
app.use('/customers', customersRouter);
app.use('/accounts', accountsRouter);

module.exports = app;
