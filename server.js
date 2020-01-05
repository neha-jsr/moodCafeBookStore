const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configuring the database
const dbConfig = require('./config/database.config.js');

const userProfileRouter = require('./app/routes/usersProfile.routes');
const purchaseRouter = require('./app/routes/purchase.routes');
const bookStoreRouter = require('./app/routes/books.routes');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Moodcafe application" });
});

// public routes
app.use('/user', userProfileRouter);

// private routes which authenticate users for performing specific operation
app.use('/bookStore', bookStoreRouter);
app.use('/purchase', purchaseRouter);

// handle 404 error(Not found Error)
app.use(function (req, res, next) {
    let err = new Error('Path Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Path Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

module.exports = app;