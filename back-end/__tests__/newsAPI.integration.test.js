const express = require("express");
const request = require("supertest");
const newsApiRoute = require("../routes/newsAPI/newsApi");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/newsapi", newsApiRoute);

const topicsArray = ["general", "technology", "sport", "science"];

describe("Інтеграційні тести для функціоналу отримання новин з NewsAPI", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("GET /api/newsapi/:topic --- помилка 400 --- відсутня категорія новин :topic", async () => {
        const { body, statusCode } = await request(app).get("/api/newsapi/");

        expect(statusCode).toBe(400);

        expect(body).toEqual({
            message: "No valid category provided",
        });
    });
    it("GET /api/newsapi/:topic --- успіх 200 --- :topic введено коректно ([general, technology, sport, science])", async () => {
        for (const topic of topicsArray) {
            const { body, statusCode } = await request(app).get(
                `/api/newsapi?topic=${topic}`
            );

            expect(statusCode).toBe(200);

            expect(body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        description: expect.any(String),
                        content: expect.any(String),
                        publishedAt: expect.any(String),
                        source: expect.any(Object),
                        url: expect.any(String),
                        author: expect.any(String),
                        img: expect.any(String),
                    }),
                ])
            );
        }
    });
});
