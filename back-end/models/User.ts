// import mongoose from 'mongoose';
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";
import createHttpError from "http-errors";

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
            ref: "Article",
            required: false,
            unique: false,
        },
        likes: {
            type: [Schema.Types.ObjectId],
            ref: "Article",
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
    }
);

UserSchema.pre("save", async function (next) {
    try {
        const nicknameExists = await mongoose.models.User.findOne({
            nickname: this.nickname,
        });
        if (
            nicknameExists &&
            nicknameExists._id.toString() !== this._id.toString()
        ) {
            return next(createHttpError(400, "Nickname already taken"));
        }
        const emailExists = await mongoose.models.User.findOne({
            email: this.email,
        });
        if (emailExists && emailExists._id.toString() !== this._id.toString()) {
            return next(createHttpError(400, "Email already in use"));
        }

        if (!this.isModified("password")) {
            return next();
        }

        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        return next(error);
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// module.exports = User;
export default mongoose.model("User", UserSchema);
