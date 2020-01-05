const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersProfile.controllers');

router.post('/register', (req, res) => {
    console.log('Request body', req.body);
    if (!(req.body && req.body.name && req.body.email && req.body.password)) {
        res.status(500).send('Invalid Input, Please Provide all details for registration');
    } else {
        userController.registerUser(req.body).then((result) => {
            res.status(200).send(result);
        }).catch((rejection) => {
            console.error(rejection);
            res.status(rejection.status).send(rejection.reason);
        })
    }
});

router.post('/login', (req, res) => {
    if (!(req.body && req.body.email && req.body.password)) {
        res.status(500).send('Invalid Input, Missing emailId or password');
    } else {
        userController.authenticateUser(req.body.email, req.body.password).then((result) => {
            res.status(200).send(result);
        }).catch((rejection) => {
            console.error(rejection);
            res.status(rejection.status).send(rejection.reason);
        })
    }
});

module.exports = router;