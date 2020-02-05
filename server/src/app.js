const express = require('express');
const cors = require('cors');
const app = express();
const storeRouter = require('./store.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/stores', storeRouter);

module.exports = app;