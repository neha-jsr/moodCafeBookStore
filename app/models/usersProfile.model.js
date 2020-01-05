const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a user profile schema
const Schema = mongoose.Schema;
const UserProfileSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {
        timestamps: true
    }
);

// hash userProfile password before saving into database
UserProfileSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('UserProfile', UserProfileSchema);
