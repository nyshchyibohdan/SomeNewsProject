const request = require("supertest");

async function loginUser(app) {
    const { body, statusCode } = await request(app)
        .post("/api/auth/login")
        .send({
            email: "integration.test@gmail.com",
            password: "12345678",
        });

    console.log("IN AUTH UTIL ---", body);

    expect(statusCode).toBe(200);

    return {
        token: body.token,
    };
}

async function registerUser(app, user) {
    const { body, statusCode } = await request(app)
        .post("/api/auth/register")
        .send({
            ...user,
        });

    console.log("IN AUTH UTIL ---", body);

    expect(statusCode).toBe(200);

    return {
        token: body.token,
        ...body.user,
    };
}

async function deleteUser(app, user) {
    const { body, statusCode } = await request(app)
        .delete("/api/users/delete-account")
        .set("auth", user.token)
        .send({
            password: "12345678",
        });

    expect(statusCode).toBe(200);
    expect(body).toEqual({
        success: true,
        message: "Account deleted successfully",
    });
}

module.exports = { loginUser, registerUser, deleteUser };
