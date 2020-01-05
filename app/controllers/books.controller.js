const bookModel = require('../models/books.model');

exports.getAllBooks = function () {
    return new Promise((resolve, reject) => {
        bookModel.find({}, (error, result) => {
            if (error) {
                console.error(error);
                return reject({ status: 500, reason: "Error While fetching books try later!!!!" });
            }
            let booksList = [];
            if (result) {
                for (let book of result) {
                    booksList.push({ id: book._id, title: book.title, description: book.description, price: book.price });
                }
                return resolve({message: "success", books: booksList});
            }
            return resolve({message: "success", books: booksList});
        });
    });
}

exports.saveBook = function (bookPayload) {
    return new Promise((resolve, reject) => {

        exports.getBookByTitle(bookPayload.title).then(function (bookInfo) {
            let book = {
                title: bookPayload.title,
                description: bookPayload.description,
                author: bookPayload.author,
                price: bookPayload.price,
                year: bookPayload.year
            }
            if (bookInfo) {
                exports.updateBookDocumentById(bookInfo._id, book).then(function (result) {
                    return resolve({ status: "success", message: "Book successfully added", book: result });
                }, function (error) {
                    return reject({ status: 500, reason: "Error While updating book in db----> " + error });
                })
            } else {
                exports.createBook(book).then(function (result) {
                    return resolve({ status: "success", message: "Book successfully added", book: result });
                }, function (error) {
                    return reject({ status: 500, reason: "Error While creating new book-----> " + error });
                })
            }
        }, function (error) {
            console.error('Error while fetching book from db');
            return reject({ status: 500, reason: "Error While updating book in db!!!!" });
        });
    });
}

exports.getBookByTitle = function (bookTitle) {
    return new Promise((resolve, reject) => {

        bookModel.findOne({ 'title': bookTitle }, function (err, bookInfo) {
            if (err) {
                console.error(error);
                return reject();
            }
            if (bookInfo) {
                return resolve(bookInfo);
            }
            return resolve();
        });
    });
}

exports.getBookById = function (bookId) {
    return new Promise((resolve, reject) => {
        bookModel.findOne({ _id: bookId }, function (error, bookInfo) {
            if (error) {
                console.error(error);
                return reject();
            }
            if (bookInfo) {
                return resolve(bookInfo);
            }
            return resolve(null);
        });
    });
}

exports.updateBookDocumentById = function (bookId, bookPayload) {
    return new Promise((resolve, reject) => {
        bookModel.findByIdAndUpdate(bookId, bookPayload, function (error, result) {
            if (error)
                return reject(error);
            else {
                return resolve(result);
            }
        });
    });
}

exports.createBook = function (bookPayload) {
    return new Promise((resolve, reject) => {
        bookModel.create(bookPayload, function (error, result) {
            if (error)
                return reject(error);
            else
                return resolve(result);
        });
    });
}

exports.deleteById = function (bookId) {
    return new Promise((resolve, reject) => {
        bookModel.findByIdAndRemove(bookId, function (error, result) {
            if (error)
                return reject(error);
            else {
                return resolve({ status: "success", message: "Book deleted successfully!!!" });
            }
        });
    });
}