const mongoose = require('mongoose');

//Define a Book schema
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
}, {
        timestamps: true
    }
);
module.exports = mongoose.model('Books', BookSchema);
