import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db.config";
import authRoutes from "./routes/authRoute";
import newsApiRoutes from "./routes/newsAPI/newsApi";
import userRoutes from "./routes/userRoute/userRoute";
import articleRoutes from "./routes/articleRoute/articleRoute";
import { checkAuth, errorHandler } from "./utils/utils";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore = require("connect-mongo");
import passport from "passport";
import cookieParser = require("cookie-parser");

connectDB();
require("dotenv").config();

const allowedOrigins = process.env.ALLOWED_ORIGINS!.split(",") || [];

const SESSION_SECRET = process.env.SESSION_SECRET!;
const IS_PRODUCTION = JSON.parse(process.env.IS_PRODUCTION!) as boolean;
const COOKIE_SECRET = process.env.COOKIE_SECRET!;

const app = express();
app.use(
    cors({
        origin: (origin: string | undefined, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());

app.use(cookieParser(COOKIE_SECRET));

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7,
            secure: IS_PRODUCTION,
            httpOnly: true,
            sameSite: IS_PRODUCTION ? "none" : "strict",
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
    res.send("API is ok");
});

app.use("/api/auth", authRoutes);

app.use(checkAuth);
app.use("/api/newsapi", newsApiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
