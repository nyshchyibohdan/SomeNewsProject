import express from "express";
import registerValid from "../validations/regAndLog";
import dotenv from "dotenv";
import { loginUser, registerUser } from "../handlers/auth";
dotenv.config();

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerValid, registerUser);

export default router;
