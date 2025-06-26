const express = require("express");
const request = require("supertest");
const userRoute = require("../routes/userRoute/userRoute");
const authRoute = require("../routes/authRoute");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const EMAIL = "integration.test@gmail.com";
let _id;

const initialUser = {
    nickname: "accForTesting",
    email: "integration.test@gmail.com",
};

let token;

async function changePassword(oldPassword, newPassword) {
    return await request(app)
        .post("/api/users/change-password")
        .set("auth", token)
        .send({
            oldPassword,
            newPassword,
        });
}

async function simulateLogin(password) {
    return await request(app).post("/api/auth/login").send({
        email: EMAIL,
        password,
    });
}

describe("Інтеграційні тести для функціоналу роботи з акаунтом користувача з допомогою API-сервера проєкту", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        const { token: loginToken } = await loginUser(app);
        token = loginToken;
    });

    afterAll(async () => {
        await request(app).post("/api/auth/register").send({
            nickname: initialUser.nickname,
            email: initialUser.email,
            password: "12345678",
            confirmPassword: "12345678",
        });

        token = "";

        await mongoose.disconnect();
    });

    it("T_010 GET /api/users/profile --- помилка 403 --- Отримання запиту на дані користувача без токена авторизації", async () => {
        const { body, statusCode } =
            await request(app).get("/api/users/profile");

        expect(statusCode).toEqual(403);
        expect(body).toEqual({
            message: "Token is missing",
        });
    });
    it("T_011 GET /api/users/profile --- успіх 200 --- Виконання запиту на отримання даних авторизованого користувача", async () => {
        const { body, statusCode } = await request(app)
            .get("/api/users/profile")
            .set("auth", token);

        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body).toEqual({
            user: {
                id: expect.any(String),
                nickname: expect.any(String),
                bio: expect.any(String),
                profilePic: expect.any(String),
                email: expect.any(String),
                reposts: expect.any(Array),
                likes: expect.any(Array),
            },
        });
        _id = body.user.id;
    });
    it("T_014 POST /api/users/upload-pic --- успіх 200 --- Зміна зображення профілю користувача", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/users/upload-pic")
            .send({
                userId: _id,
                profilePic: "May the force be with you",
            });

        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body).toEqual({
            message: "Profile picture uploaded successfully!",
        });
    });
    it("T_015 POST /api/users/update-bio --- успіх 200 --- Зміна інформації про профіль користувача", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/users/update-bio")
            .send({
                userId: _id,
                bio: "Текст біографії",
            });

        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body).toEqual({
            message: "Bio updated successfully!",
        });
    });
    it("T_016 POST /api/users/change-password --- помилка 400 --- Відсутність токена доступу для зміни паролю", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/users/change-password")
            .send({
                oldPassword: "12345678",
                newPassword: "123456789", // різниця у один символ
            });

        console.log(body);
        expect(statusCode).toEqual(403);
        expect(body).toEqual({
            message: "No token, authorization denied",
        });
    });
    it("T_017 POST /api/users/change-password --- помилка 400 --- Невірний старий пароль від акаунта", async () => {
        const { body, statusCode } = await changePassword(
            "87654321",
            "123456789"
        );

        console.log(body);
        expect(statusCode).toEqual(400);
        expect(body).toEqual({
            success: false,
            message: "Invalid password",
        });
    });
    it("T_018 POST /api/users/change-password --- успіх 400 --- Успішна зміна паролю", async () => {
        const { body, statusCode } = await changePassword(
            "12345678",
            "123456789"
        );

        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body).toEqual({
            success: true,
            message: "Password updated successfully",
        });

        // Симуляція НЕвдалої авторизації
        const { body: failureBody, statusCode: failureStatusCode } =
            await simulateLogin("12345678");

        expect(failureStatusCode).toBe(400);
        expect(failureBody).toEqual({
            success: false,
            message: "Invalid credentials",
        });

        // Симуляція вдалої авторизації
        const { body: successBody, statusCode: successStatusCode } =
            await simulateLogin("123456789");

        expect(successStatusCode).toBe(200);
        expect(successBody).toEqual({ token: expect.any(String) });

        await changePassword("123456789", "12345678");
    });

    it("T_019 DELETE /api/users/delete-account --- помилка 403 --- Відсутність токена доступу", async () => {
        const { body, statusCode } = await request(app)
            .delete("/api/users/delete-account")
            .send({
                password: "123456789",
            });

        expect(statusCode).toBe(403);
        expect(body).toEqual({ message: "No token, authorization denied" });
    });
    it("T_020 DELETE /api/users/delete-account --- помилка 400 --- Невірний пароль від акаунта", async () => {
        const { body, statusCode } = await request(app)
            .delete("/api/users/delete-account")
            .set("auth", token)
            .send({
                password: "невірнийпароль",
            });

        expect(statusCode).toBe(400);
        expect(body).toEqual({ success: false, message: "Invalid password" });
    });
    it("T_021 DELETE /api/users/delete-account --- успіх 200 --- Видалення акаунта успішне", async () => {
        const { body, statusCode } = await request(app)
            .delete("/api/users/delete-account")
            .set("auth", token)
            .send({
                password: "12345678",
            });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
            success: true,
            message: "Account deleted successfully",
        });
    });
});
