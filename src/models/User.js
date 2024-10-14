// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: false,
        unique: false
    },
    profilePic: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
// export default mongoose.model('User', UserSchema);
