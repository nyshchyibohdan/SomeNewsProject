const express = require("express");
const request = require("supertest");
const userRoute = require("../routes/userRoute/userRoute");
const authRoute = require("../routes/authRoute");
const articleRoute = require("../routes/articleRoute/articleRoute");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/articles", articleRoute);

let user;

const testArticles = [
    {
        title: "Перша тестова стаття",
        description: "Короткий опис першої статті.",
        content: "Основний текст першої статті",
        mainPicture: "data:image/png",
    },
    {
        title: "Друга тестова стаття",
        description: "Короткий опис другої статті.",
        content: "Основний текст другої статті",
        mainPicture: "data:image/png",
    },
    {
        title: "Третя тестова стаття",
        description: "Короткий опис третьої статті.",
        content: "Основний текст третьої статті",
        mainPicture: "data:image/png",
    },
];

async function getArticles() {
    const { body, statusCode } = await request(app).get(
        `/api/articles/get-articles?userId=${user._id}`
    );

    console.log(body);
    return { body, statusCode };
}

async function createArticle(article) {
    const { body, statusCode } = await request(app)
        .post("/api/articles/save-article")
        .send({
            ...article,
            author: user._id,
        });

    expect(statusCode).toBe(200);
    expect(body).toEqual({
        success: true,
        message: "Article saved successfully",
    });
}

describe("Інтеграційні тести для функціоналу роботи зі статтями користувача", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        user = await registerUser(app, {
            nickname: "articleTestAcc",
            email: "articleTestAcc@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
        });
    });

    afterAll(async () => {
        await deleteUser(app, user);

        await mongoose.disconnect();
    });

    it("T_022 GET /api/articles/get-articles --- успіх 204 --- Отримання статей користувача (користувач ще не створював статті)", async () => {
        const { statusCode } = await request(app).get(
            `/api/articles/get-articles?userId=${user._id}`
        );

        expect(statusCode).toBe(204);
    });
    it("GET /api/articles/community-articles --- успіх 204 --- Отримання списку користувацьких статей (в базі даних ще немає статей)", async () => {
        const { statusCode } = await request(app).get(
            "/api/articles/community-articles"
        );

        expect(statusCode).toBe(204);
    });
    it("POST /api/articles/save-article --- помилка 400 --- Надсилання запиту без всіх необхідних даних", async () => {
        const { body, statusCode } = await request(app) // відсутнє значення content
            .post("/api/articles/save-article")
            .send({
                title: "Тестова стаття",
                description:
                    "Jest + Supertest інтеграційні тести зі створення статей користувача в межах API сервера",
                mainPicture: "Main picture",
                author: user._id,
            });

        expect(statusCode).toBe(400);
        expect(body).toEqual({
            message: "All required data must be provided",
        });
    });
    it("POST /api/articles/save-article --- успіх 200 --- Створення нової статті", async () => {
        for (article of testArticles) {
            await createArticle(article);
        }
    });
    it("GET /api/articles/get-articles --- успіх 200 --- Отримання статей користувача (статті вже збережені в базі даних)", async () => {
        const { body, statusCode } = await getArticles();
        console.log(body);
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));
    });
    it("DELETE /api/articles/delete-article --- помилка 404 --- Спроба видалення неіснуючої статті", async () => {
        const { body, statusCode } = await request(app)
            .delete(`/api/articles/delete-article`)
            .send({ articleId: "68512e9b749a79527ce69666" });

        expect(statusCode).toBe(404);
        expect(body).toEqual({
            success: false,
            message: "No article found with this ID",
        });
    });
    it("DELETE /api/articles/delete-article --- успіх 200 --- Успішне видалення статті", async () => {
        const { body: articlesBody, statusCode: articlesStatusCode } =
            await getArticles();

        expect(articlesStatusCode).toBe(200);
        expect(articlesBody).toEqual(
            expect.arrayContaining([expect.any(Object)])
        );

        const { body, statusCode } = await request(app)
            .delete(`/api/articles/delete-article`)
            .send({ articleId: articlesBody[0]._id });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
            success: true,
            message: "Article deleted successfully",
        });
    });
    it("GET /api/articles/user-full-article --- помилка 404 --- Пошук неіснуючої статті", async () => {
        const { body, statusCode } = await request(app).get(
            `/api/articles/user-full-article?articleId=${"68512e9b749a79527ce69666"}`
        );

        expect(statusCode).toBe(404);
        expect(body).toEqual({
            success: false,
            message: "Article not found",
        });
    });
    it("GET /api/articles/user-full-article --- успіх 200 --- Пошук існуючої статті", async () => {
        const { body: articlesBody, statusCode: articlesStatusCode } =
            await getArticles();

        expect(articlesStatusCode).toBe(200);
        expect(articlesBody).toEqual(
            expect.arrayContaining([expect.any(Object)])
        );

        const { body, statusCode } = await request(app).get(
            `/api/articles/user-full-article?articleId=${articlesBody[0]._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                article: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    mainPic: expect.any(String),
                    description: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                    repostsCount: expect.any(Number),
                }),
                success: true,
                message: "Article found successfully",
            })
        );
    });
    it("PUT /api/articles/toggle-repost-article --- помилка 404 --- Репост неіснуючої статті", async () => {
        const { body, statusCode } = await request(app)
            .put(`/api/articles/toggle-repost-article`)
            .send({
                articleId: "68512e9b749a79527ce69666",
                userId: user._id,
            });

        expect(statusCode).toBe(404);
        expect(body).toEqual({
            success: false,
            message: "No article found with this ID",
        });
    });
    it("PUT /api/articles/toggle-repost-article --- помилка 404 --- Виконання репосту неіснуючим користувачем", async () => {
        const { body: articlesBody, statusCode: articlesStatusCode } =
            await getArticles();

        expect(articlesStatusCode).toBe(200);
        expect(articlesBody).toEqual(
            expect.arrayContaining([expect.any(Object)])
        );

        const { body, statusCode } = await request(app)
            .put(`/api/articles/toggle-repost-article`)
            .send({
                articleId: articlesBody[0]._id,
                userId: "68512e9b749a78790ce69666",
            });

        expect(statusCode).toBe(404);
        expect(body).toEqual({
            success: false,
            message: "No user found with this ID",
        });
    });

    // ------------------------------------------------------------------
    async function toggleRepost() {
        const { body: articlesBody, statusCode: articlesStatusCode } =
            await getArticles();

        expect(articlesStatusCode).toBe(200);
        expect(articlesBody).toEqual(
            expect.arrayContaining([expect.any(Object)])
        );

        const { body, statusCode } = await request(app)
            .put(`/api/articles/toggle-repost-article`)
            .send({
                articleId: articlesBody[0]._id,
                userId: user._id,
            });

        return { body, statusCode };
    }
    // ------------------------------------------------------------------

    it("PUT /api/articles/toggle-repost-article --- успіх 200 --- Успішне ВИКОНАННЯ репосту", async () => {
        const { body, statusCode } = await toggleRepost();

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                type: "repost",
                user: expect.objectContaining({
                    id: expect.any(String),
                    nickname: expect.any(String),
                    email: expect.any(String),
                    bio: expect.any(String),
                    profilePic: expect.any(String),
                    reposts: expect.arrayContaining([expect.any(String)]),
                    likes: expect.arrayContaining([]),
                }),
                article: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    mainPic: expect.any(String),
                    description: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                    repostsCount: expect.any(Number),
                    likesCount: expect.any(Number),
                }),
                success: true,
                message: "Toggle repost done successfully",
            })
        );
    });
    it("PUT /api/articles/toggle-repost-article --- успіх 200 --- Успішне ВИДАЛЕННЯ репосту", async () => {
        const { body, statusCode } = await toggleRepost();

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                type: "undo",
                user: expect.objectContaining({
                    id: expect.any(String),
                    nickname: expect.any(String),
                    email: expect.any(String),
                    bio: expect.any(String),
                    profilePic: expect.any(String),
                    reposts: expect.arrayContaining([]),
                    likes: expect.arrayContaining([]),
                }),
                article: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    mainPic: expect.any(String),
                    description: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                    repostsCount: expect.any(Number),
                    likesCount: expect.any(Number),
                }),
                success: true,
                message: "Toggle repost done successfully",
            })
        );
    });

    // ------------------------------------------------------------------
    async function toggleLike() {
        const { body: articlesBody, statusCode: articlesStatusCode } =
            await getArticles();

        expect(articlesStatusCode).toBe(200);
        expect(articlesBody).toEqual(
            expect.arrayContaining([expect.any(Object)])
        );

        const { body, statusCode } = await request(app)
            .put(`/api/articles/toggle-like-article`)
            .send({
                articleId: articlesBody[0]._id,
                userId: user._id,
            });

        return { body, statusCode };
    }
    // ------------------------------------------------------------------

    it("PUT /api/articles/toggle-like-article --- успіх 200 --- Успішне ВИКОНАННЯ лайку", async () => {
        const { body, statusCode } = await toggleLike();

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                type: "like",
                user: expect.objectContaining({
                    id: expect.any(String),
                    nickname: expect.any(String),
                    email: expect.any(String),
                    bio: expect.any(String),
                    profilePic: expect.any(String),
                    reposts: expect.arrayContaining([]),
                    likes: expect.arrayContaining([expect.any(String)]),
                }),
                article: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    mainPic: expect.any(String),
                    description: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                    repostsCount: expect.any(Number),
                    likesCount: expect.any(Number),
                }),
                success: true,
                message: "Toggle like done successfully",
            })
        );
    });
    it("PUT /api/articles/toggle-like-article --- успіх 200 --- Успішне ВИДАЛЕННЯ лайку", async () => {
        const { body, statusCode } = await toggleLike();

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                type: "undo",
                user: expect.objectContaining({
                    id: expect.any(String),
                    nickname: expect.any(String),
                    email: expect.any(String),
                    bio: expect.any(String),
                    profilePic: expect.any(String),
                    reposts: expect.arrayContaining([]),
                    likes: expect.arrayContaining([]),
                }),
                article: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    mainPic: expect.any(String),
                    description: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                    repostsCount: expect.any(Number),
                    likesCount: expect.any(Number),
                }),
                success: true,
                message: "Toggle like done successfully",
            })
        );
    });

    it("GET /api/articles/community-articles --- успіх 200 --- Отримання списку користувацьких статей", async () => {
        await createArticle(testArticles[0]);

        const { body, statusCode } = await request(app).get(
            "/api/articles/community-articles"
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                success: true,
                articles: expect.arrayContaining([expect.any(Object)]),
            })
        );
    });
    it("GET /api/articles/user-reposts --- успіх 200 --- Отримання списку репостів користувача (в базі даних НЕМАЄ репостів)", async () => {
        const { body, statusCode } = await request(app).get(
            `/api/articles/user-reposts?userId=${user._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual({
            message: "No articles found",
            articles: [],
        });
    });
    it("GET /api/articles/user-reposts --- успіх 200 --- Отримання списку репостів користувача", async () => {
        const { statusCode: repostStatusCode } = await toggleRepost();

        expect(repostStatusCode).toBe(200);

        const { body, statusCode } = await request(app).get(
            `/api/articles/user-reposts?userId=${user._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));

        const { statusCode: undoStatusCode } = await toggleRepost();

        expect(undoStatusCode).toBe(200);
    });
    it("GET /api/articles/user-likes --- успіх 200 --- Отримання списку вподобань користувача (в базі даних НЕМАЄ вподобань)", async () => {
        const { body, statusCode } = await request(app).get(
            `/api/articles/user-likes?userId=${user._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual({
            message: "No articles found",
            articles: [],
        });
    });
    it("GET /api/articles/user-likes --- успіх 200 --- Отримання списку вподобань користувача", async () => {
        const { statusCode: repostStatusCode } = await toggleLike();

        expect(repostStatusCode).toBe(200);

        const { body, statusCode } = await request(app).get(
            `/api/articles/user-likes?userId=${user._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));

        const { statusCode: undoStatusCode } = await toggleLike();

        expect(undoStatusCode).toBe(200);
    });
});
