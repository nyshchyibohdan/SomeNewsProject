// import { body } from 'express-validator';
const { body } = require('express-validator');

const registerValid = [
    body('nickname', 'Minimum nickname length is 3').isLength({ min: 3 }),
    body('email', 'Must be a valid email').isEmail(),
    body('password', 'Minimum password length is 8').isLength({ min: 8 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

module.exports = registerValid;
// export default { registerValid };
