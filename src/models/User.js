// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        bio: {
            type: String,
            required: false,
            unique: false,
        },
        profilePic: {
            type: String,
            required: false,
            unique: false,
        },
        reposts: {
            type: [Schema.Types.ObjectId],
            ref: 'Article',
            required: false,
            unique: false,
        },
        likes: {
            type: [Schema.Types.ObjectId],
            ref: 'Article',
            required: false,
            unique: false,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.pre('save', async function (next) {
    try {
        const nicknameExists = await mongoose.models.User.findOne({ nickname: this.nickname });
        if (nicknameExists && nicknameExists._id.toString() !== this._id.toString()) {
            throw new Error('Nickname already taken');
        }

        const emailExists = await mongoose.models.User.findOne({ email: this.email });
        if (emailExists && emailExists._id.toString() !== this._id.toString()) {
            throw new Error('Email already in use');
        }
    } catch (error) {
        next(error);
    }

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
