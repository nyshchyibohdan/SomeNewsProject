const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');
const regAndLog = require('../../src/validations/regAndLog');
const { validationResult } = require('express-validator');

const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY;

router.post('/login', async (request, res) => {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        console.log(user);

        bcrypt.compare(password, user.password, function (error, result) {
            if (error) {
                console.log('Server error');
                return res.status(500).send('Server error');
            }
            if (result) {
                console.log('Successfully logged in');
                const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            } else {
                console.log('Invalid credentials');
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/register', regAndLog, async (request, res) => {
    const { nickname, email, password } = request.body;
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const nicknameRegex = /[!"#$%&()*,.:<>?@^{|}]/;
    if (nicknameRegex.test(nickname)) {
        return res.status(400).json({
            errors: [...errors.array(), { msg: 'Nickname should not have special symbols' }],
        });
    }
    try {
        const registerDocument = await User.create({
            nickname: nickname,
            email: email,
            password: password,
        });
        const user = await registerDocument.save();
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch {
        return res.status(500).json({ msg: 'Something went wrong' });
    }
    //return res.status(200).json({ msg: 'Register successful!' });
});

module.exports = router;
