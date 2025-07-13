import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import createHttpError from "http-errors";
import {
    ChangePasswordDTO,
    UpdateBioDTO,
    UploadPicDataDTO,
} from "../DTOs/userRouteDTO";
import bcrypt from "bcrypt";
import { deleteUserArticles } from "../utils/utils";
import { UserPassportDocument } from "../types/types";

export async function getProfile(req: Request, res: Response) {
    const user = req.user as UserPassportDocument;
    res.status(200).json({
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        reposts: user.reposts,
        likes: user.likes,
    });
}

export async function updateProfilePic(
    req: Request<{}, {}, UploadPicDataDTO>,
    res: Response,
    next: NextFunction
) {
    const { profilePic } = req.body;

    const user = req.user as UserPassportDocument;

    if (!profilePic) {
        return next(createHttpError(400, "No profile picture provided"));
    }

    console.log("IN USER PROFILE PIC ---", user.id, profilePic);

    await User.findByIdAndUpdate(user.id, { profilePic });

    res.status(200).json({
        message: "Profile picture uploaded successfully!",
    });
}

export async function updateBio(
    req: Request<{}, {}, UpdateBioDTO>,
    res: Response,
    next: NextFunction
) {
    const { bio } = req.body;

    const user = req.user as UserPassportDocument;

    if (!bio) {
        return next(createHttpError(400, "No bio provided"));
    }

    await User.findByIdAndUpdate(user.id, { bio });

    res.status(200).json({ message: "Bio updated successfully!" });
}

export async function changePassword(
    req: Request<{}, {}, ChangePasswordDTO>,
    res: Response,
    next: NextFunction
) {
    const { oldPassword, newPassword } = req.body;

    const user = req.user as UserPassportDocument;

    if (!user) {
        return next(createHttpError(400, "Invalid credentials"));
    }

    if (!oldPassword || !newPassword) {
        return next(createHttpError(400, "No passwords provided"));
    }

    bcrypt.compare(oldPassword, user.password, async function (error, result) {
        if (error) {
            console.log("Server error");
            return next(createHttpError(500, "Server error"));
        }
        if (result) {
            const salt = await bcrypt.genSalt(12);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            await User.findByIdAndUpdate(user.id, {
                password: newHashedPassword,
            });
            console.log("Password updated successfully");
            res.status(200).json({
                message: "Password updated successfully",
            });
            return;
        } else {
            return next(createHttpError(400, "Invalid credentials"));
        }
    });
}

export async function deleteAccount(
    req: Request<{}, {}, { password: string }>,
    res: Response,
    next: NextFunction
) {
    const { password } = req.body;

    const user = req.user as UserPassportDocument;

    if (!user) {
        return next(createHttpError(400, "Invalid credentials"));
    }

    bcrypt.compare(password, user.password, async function (error, result) {
        if (error) {
            console.log("Server error");
            return next(createHttpError(500, "Server error"));
        }
        if (result) {
            const articlesDeleted = await deleteUserArticles(user.id);
            if (articlesDeleted) {
                const deletedUser = await User.findByIdAndDelete(user.id);

                if (!deletedUser) {
                    return next(createHttpError(404, "User not found"));
                }

                res.status(200).json({
                    message: "Account deleted successfully",
                });
                return;
            } else {
                return next(
                    createHttpError(400, "Error deleting user articles")
                );
            }
        } else {
            return next(createHttpError(400, "Invalid password"));
        }
    });
}
