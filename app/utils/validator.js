const jwtConfig = require('../../config/jwt.config');
const jwt = require('../../node_modules/jsonwebtoken');

exports.validateUser = function (req, res, next) {
    jwt.verify(req.headers['x-access-token'], jwtConfig.secretKey, function (error, decoded) {
        if (error) {
            res.status(400).send(error.message);
        } else {
            req.body.userId = decoded.id;
            req.body.email = decoded.email;
            next();
        }
    });
}

exports.validateAdmin = function (req, res, next) {
    jwt.verify(req.headers['x-access-token'], jwtConfig.secretKey, function (error, decoded) {
        if (error) {
            res.status(400).send(error.message);
        } else if (decoded && !decoded.isAdmin) {
            res.status(400).send('Not authorized to perform Admin operation!!!')
        } else {
            req.body.userId = decoded.id;
            req.body.email = decoded.email;
            next();
        }
    });
}