const express = require('express');
const cors = require('cors');
const app = express();
const storeRouter = require('./store.route');
const expenseRouter = require('./expense.route');
const revenueRouter = require('./revenue.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/stores', storeRouter);
app.use('/expenses', expenseRouter);
app.use('/revenues', revenueRouter);

module.exports = app;