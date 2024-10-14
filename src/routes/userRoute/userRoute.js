const express = require('express');

const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY;

router.get('/profile', async (request, res) => {
    try {
        const token = request.get('auth');
        if (!token) {
            return res.status(400).json({
                message: 'Token is missing'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            user: {
                id: userId,
                nickname: user.nickname,
                email: user.email,
                bio: user.bio,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }
})

router.post('/upload-pic', async (request, res) => {
    try {
        const userId = request.body.userId;
        const profilePic = request.body.profilePic;

        await User.findByIdAndUpdate(userId, { profilePic });

        res.status(200).json({ message: 'Profile picture uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/update-bio', async (request, res) => {
    try {
        const userId = request.body.userId;
        const bio = request.body.bio;

        await User.findByIdAndUpdate(userId, { bio });

        res.status(200).json({ message: 'Bio updated successfully!' });
    } catch (error) {
        console.error('Error updating bio:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/change-password', async (request, res) => {
    const { oldPassword, newPassword } = request.body;

    const token = request.header('auth');

    if (!token) {
        return res.status(400).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        bcrypt.compare(oldPassword, user.password, async function (error, result) {
            if (error) {
                console.log('Server error');
                return res.status(500).send('Server error');
            }
            if (result) {
                const salt = await bcrypt.genSalt(12);
                const newHashedPassword = await bcrypt.hash(newPassword, salt);
                await User.findByIdAndUpdate(user._id, { password: newHashedPassword });
            } else {
                console.log('Invalid password');
                return res.status(400).json({ success: false, message: 'Invalid password' });
            }
        });
        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

router.delete('/delete-account', async (request, res) => {
    const { password } = request.body;

    const token = request.header('auth');

    if (!token) {
        return res.status(400).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password, async function (error, result) {
            if (error) {
                console.log('Server error');
                return res.status(500).send('Server error');
            }
            if (result) {
                const deletedUser = await User.findByIdAndDelete(userId);

                if (!deletedUser) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }

                return res.status(200).json({ success: true, message: 'Account deleted successfully' });
            } else {
                console.log('Invalid password');
                return res.status(400).json({ success: false, message: 'Invalid password' });
            }
        });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;
