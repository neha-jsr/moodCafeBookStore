const mongoose = require('mongoose');

//Define purchase schema for user
const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
    bookId: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    }
}, {
        timestamps: true
    }
);

module.exports = mongoose.model('Purchase', PurchaseSchema);
