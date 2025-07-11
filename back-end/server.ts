import express, { ErrorRequestHandler, NextFunction } from "express";
import { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db.config";
import authRoutes from "./routes/authRoute";
import newsApiRoutes from "./routes/newsAPI/newsApi";
import userRoutes from "./routes/userRoute/userRoute";
import articleRoutes from "./routes/articleRoute/articleRoute";
import { errorHandler, isHttpError } from "./utils/utils";

connectDB();
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request: Request, res: Response) => {
    res.send("API is ok");
});

app.use("/api/auth", authRoutes);
app.use("/api/newsapi", newsApiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
