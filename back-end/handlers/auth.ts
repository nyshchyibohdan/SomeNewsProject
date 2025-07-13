import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { LoginDataDTO, RegisterDataDTO } from "../DTOs/authDTO";
import { validationResult } from "express-validator";
import { passport } from "../passport/strategies/local-strategy";
import createHttpError from "http-errors";

export async function loginUser(
    req: Request<{}, {}, LoginDataDTO>,
    res: Response,
    next: NextFunction
) {
    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (!user) {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.sendStatus(201);
            });
            return next(createHttpError(400, "Invalid credentials"));
        }

        if (err) {
            return next(createHttpError(500, "Server error during login"));
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(createHttpError(500, "Error logging in user"));
            }

            const returnUser = {
                id: user.id,
                email: user.email,
            };

            console.log("USER LOGGED IN ---------------");
            return res.status(200).send(returnUser);
        });
    })(req, res, next);
}

export async function registerUser(
    req: Request<{}, {}, RegisterDataDTO>,
    res: Response
) {
    const { nickname, email, password } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const nicknameRegex = /[!"#$%&()*,.:<>?@^{|}]/;
    if (nicknameRegex.test(nickname)) {
        res.status(400).json({
            errors: [
                ...errors.array(),
                { msg: "Nickname should not have special symbols" },
            ],
        });
        return;
    }
    const registerDocument = await User.create({
        nickname: nickname,
        email: email,
        password: password,
        bio: "",
        profilePic: "",
    });
    await registerDocument.save();
    res.status(201).send({ message: "User was registered" });
    return;
}
