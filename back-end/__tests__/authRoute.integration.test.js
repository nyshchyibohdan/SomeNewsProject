const express = require("express");
const request = require("supertest");
const authRoute = require("../routes/authRoute");
const mongoose = require("mongoose");
const User = require("../models/User");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

async function deleteUser(email) {
    await User.deleteOne({ email });
}

describe("Інтеграційні тести для функціоналу реєстрації та авторизації з допомогою API-сервера проєкту", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("T_001 POST /api/auth/register --- помилка 400 --- Отримання даних для реєстрації без поля nickname", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/auth/register")
            .send({
                email: "test.email@gmail.com",
                password: "12345678",
                confirmPassword: "12345678",
            });

        expect(statusCode).toBe(400);
        expect(body).toEqual({
            errors: [
                {
                    location: "body",
                    msg: "Nickname length must be from 3 to 15",
                    path: "nickname",
                    type: "field",
                },
            ],
        });
    });
    it("T_002 POST /api/auth/register --- помилка 400 --- Реєстрація email, що вже існує", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/auth/register")
            .send({
                nickname: "testNickname",
                email: "kenobi@gmail.com",
                password: "12345678",
                confirmPassword: "12345678",
            });

        expect(statusCode).toBe(400);
        expect(body).toEqual({
            message: "Email already in use",
        });
    });
    it("T_003 POST /api/auth/register --- успіх 200 --- Отримання валідних даних для реєстрації та збереження нового користувача", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/auth/register")
            .send({
                nickname: "testNickname",
                email: "testEmail@gmail.com",
                password: "12345678",
                confirmPassword: "12345678",
            });

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                token: expect.any(String),
                user: expect.any(Object),
            })
        );

        await deleteUser("testEmail@gmail.com");
    });
    it("T_004 POST /api/auth/login --- помилка 400 --- Отримання запиту на авторизацію неіснуючого користувача", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/auth/login")
            .send({
                email: "testEmail@gmail.com",
                password: "12345678",
            });

        expect(statusCode).toBe(400);
        expect(body).toEqual({
            msg: "Invalid credentials",
        });
    });
    it("T_005 POST /api/auth/login --- помилка 400 --- Отримання запиту з невірним паролем від акаунта", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/auth/login")
            .send({
                email: "integration.test@gmail.com",
                password: "невірнийпароль",
            });

        expect(statusCode).toBe(400);
        expect(body).toEqual({
            success: false,
            message: "Invalid credentials",
        });
    });
    it("T_006 POST /api/auth/login --- успіх 200 --- Отримання запиту з вірними даними для авторизації", async () => {
        const { token } = await loginUser(app);
        expect(token).toEqual(expect.any(String));
    });
});
