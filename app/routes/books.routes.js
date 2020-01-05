const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const bookController = require('../controllers/books.controller');

router.get('/listBooks', validator.validateUser, (req, res) => {

    bookController.getAllBooks().then((result) => {
        res.status(200).send(result);
    }).catch((rejection) => {
        res.status(rejection.status).send(rejection.reason);
    })
});

router.post('/addBook', validator.validateAdmin, (req, res) => {
    if (!req.body) {
        res.status(400).send('Book to be added is missing in API!!');
    } else {
        let payload = req.body;
        bookController.saveBook(payload).then((result) => {
            res.status(200).send(result);
        }).catch((rejection) => {
            res.status(rejection.status).send(rejection.reason);
        })
    }
});

module.exports = router;