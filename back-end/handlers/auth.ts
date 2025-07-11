import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDataDTO, RegisterDataDTO } from "../DTOs/authDTO";
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.SECRET_KEY;

export async function loginUser(
    req: Request<{}, {}, LoginDataDTO>,
    res: Response
) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "Invalid credentials" });
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ msg: "Invalid credentials" });
            return;
        }

        if (!JWT_SECRET) {
            res.status(500).json({ msg: "JWT secret not configured" });
            return;
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (err: any) {
        res.status(500).send("Server error");
        return;
    }
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
    const user = await registerDocument.save();
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET!, {
        expiresIn: "1h",
    });
    res.json({ token, user });
    return;
}
