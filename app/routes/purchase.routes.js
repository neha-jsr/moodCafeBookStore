const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const purchaseController = require('../controllers/purchaseBook.controller');

router.post('/byBookTitle', validator.validateUser, (req, res) => {
    if (!(req.body && req.body.bookTitle && req.body.email)) {
        res.status(400).send('bookTitle or EmailId is missing for purchase!!');
    } else {
        let bookTitle = req.body.bookTitle;
        let email = req.body.email;
        purchaseController.purchaseBook(bookTitle, email).then((result) => {
            res.status(200).send(result);
        }).catch((rejection) => {
            console.error(rejection);
            res.status(rejection.status).send(rejection.reason);
        })
    }
});

module.exports = router;