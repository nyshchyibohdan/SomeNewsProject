// import { body } from 'express-validator';
const { body } = require("express-validator");
const registerValid = [
    body("nickname", "Minimum nickname length is 3").isLength({ min: 3}),
    body("email", "Must be a valid email").isEmail(),
    body("password", "Minimum password length is 8").isLength({ min: 8 })
];

module.exports = registerValid;
// export default { registerValid };
