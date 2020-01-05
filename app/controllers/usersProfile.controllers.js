const userModel = require('../models/usersProfile.model');
const jwtConfig = require('../../config/jwt.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = function (payload) {
   return new Promise((resolve, reject) => {
      exports.findUserByEmail(payload.email).then(function (userInfo) {
         if (!userInfo) {
            let profile = {
               name: payload.name,
               email: payload.email,
               password: payload.password,
               isAdmin: payload.isAdmin || false
            }
            userModel.create(profile, function (error, result) {
               if (error)
                  return reject({ status: 500, reason: 'Error While saving user Details!!!!' + error });
               else
                  return resolve({ message: "success", data: result });

            });
         } else {
            return reject({ status: 500, reason: 'EmailId is already registered please try with different emailId!!!!' });
         }
      }, function (error) {
         console.error('Error While verifying user is registered or not!!!!' + error);
         return reject({ status: 500, reason: 'Error While verifying user is registered or not!!!!' });
      });
   });
}

exports.authenticateUser = function (email, password) {
   return new Promise((resolve, reject) => {
      exports.findUserByEmail(email).then(function (userInfo) {
         if (userInfo && bcrypt.compareSync(password, userInfo.password)) {
            const token = jwt.sign({ id: userInfo._id, email: userInfo.email, isAdmin: userInfo.isAdmin }, jwtConfig.secretKey, { expiresIn: jwtConfig.expiryTime });
            return resolve({ status: "success", token: token, message: "Auth OK" });
         } else {
            return reject({ status: 500, reason: "Invalid email/password!!!" });
         }
      }, function (error) {
         console.error(error);
         return reject(error);
      });
   });
}

exports.findUserByEmail = function (email) {
   return new Promise((resolve, reject) => {
      userModel.findOne({ email: email }, function (error, userInfo) {
         if (error) {
            return reject({ status: 500, reason: 'Error While fetching user Details!!!!' });
         }
         if (userInfo) {
            return resolve(userInfo);
         }
         return resolve(null);
      });
   })
}

