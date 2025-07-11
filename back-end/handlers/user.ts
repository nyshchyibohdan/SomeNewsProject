import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User from "../models/User";
import createHttpError from "http-errors";
import {
    ChangePasswordDTO,
    UpdateBioDTO,
    UploadPicDataDTO,
} from "../DTOs/userRouteDTO";
import bcrypt from "bcrypt";
import { deleteUserArticles } from "../utils/utils";

const JWT_SECRET = process.env.SECRET_KEY;

export async function getProfile(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.get("auth");

    if (!token) return next(createHttpError(403, "Token is missing"));

    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
        return next(createHttpError(400, "User not found"));
    }
    console.log(user.reposts);
    res.status(200).json({
        user: {
            id: userId,
            nickname: user.nickname,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic,
            reposts: user.reposts,
            likes: user.likes,
        },
    });
}

export async function updateProfilePic(
    req: Request<{}, {}, UploadPicDataDTO>,
    res: Response
) {
    const { userId, profilePic } = req.body;

    console.log("IN USER PROFILE PIC ---", userId, profilePic);

    await User.findByIdAndUpdate(userId, { profilePic });

    res.status(200).json({
        message: "Profile picture uploaded successfully!",
    });
}

export async function updateBio(
    req: Request<{}, {}, UpdateBioDTO>,
    res: Response
) {
    const { userId, bio } = req.body;

    await User.findByIdAndUpdate(userId, { bio });

    res.status(200).json({ message: "Bio updated successfully!" });
}

export async function changePassword(
    req: Request<{}, {}, ChangePasswordDTO>,
    res: Response,
    next: NextFunction
) {
    const { oldPassword, newPassword } = req.body;

    const token = req.header("auth");

    if (!token) {
        return next(createHttpError(403, "No token, authorization denied"));
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(400).json({
            success: false,
            msg: "Invalid credentials",
        });
        return;
    }

    bcrypt.compare(oldPassword, user.password, async function (error, result) {
        if (error) {
            console.log("Server error");
            return next(createHttpError(500, "Server error"));
        }
        if (result) {
            const salt = await bcrypt.genSalt(12);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            await User.findByIdAndUpdate(user._id, {
                password: newHashedPassword,
            });
            console.log("Password updated successfully");
            res.status(200).json({
                success: true,
                message: "Password updated successfully",
            });
            return;
        } else {
            console.log("Invalid password");
            res.status(400).json({
                success: false,
                message: "Invalid password",
            });
            return;
        }
    });
}

export async function deleteAccount(
    req: Request<{}, {}, { password: string }>,
    res: Response,
    next: NextFunction
) {
    const { password } = req.body;

    const token = req.header("auth");

    if (!token) {
        return next(createHttpError(403, "No token, authorization denied"));
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
        return next(createHttpError(400, "Invalid credentials"));
    }

    bcrypt.compare(password, user.password, async function (error, result) {
        if (error) {
            console.log("Server error");
            return next(createHttpError(500, "Server error"));
        }
        if (result) {
            const articlesDeleted = await deleteUserArticles(userId);
            if (articlesDeleted) {
                const deletedUser = await User.findByIdAndDelete(userId);

                if (!deletedUser) {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "Account deleted successfully",
                });
                return;
            } else {
                res.status(400).json({
                    success: false,
                    message: "Error deleting user articles",
                });
                return;
            }
        } else {
            console.log("Invalid password");
            res.status(400).json({
                success: false,
                message: "Invalid password",
            });
            return;
        }
    });
}
