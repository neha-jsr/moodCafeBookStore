const purchaseModel = require('../models/purchase.model');
const bookController = require('../controllers/books.controller');

exports.purchaseBook = function (bookTitle, emailId) {
    return new Promise((resolve, reject) => {
        bookController.getBookByTitle(bookTitle).then(function (result) {
            if (result) {
                let purchaseObject = {
                    bookId: result.id,
                    email: emailId
                }
                exports.savePurchaseDetails(purchaseObject).then(function (status) {
                    return resolve({message:"success", result: status});
                }, function (error) {
                    return reject({ status: 500, reason: 'Error While saving purchase Details' + error });
                })
            } else {
                return reject({ status: 500, reason: 'Could not find the book to be purchased in bookList' });
            }
        }, function (error) {
            return reject({ status: 500, reason: 'Error while fetching BookId in bookList!!!!' + error });
        })
    })
}

exports.savePurchaseDetails = function (purchaseObject) {
    return new Promise((resolve, reject) => {
        purchaseModel.create(purchaseObject, function (error, result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        })
    })
}