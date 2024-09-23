// controllers/authController.js
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Registration controller
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all the fields' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;

        // Save user
        await newUser.save();

        // Automatically log in after registration
        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json({ msg: 'Error logging in after registration.' });
            }
            return res.status(201).json({ msg: 'Registration successful.', user: { id: newUser._id, username: newUser.username, email: newUser.email } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error during registration.' });
    }
};

// Login controller
exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ msg: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ msg: 'Login successful.', user: { id: user._id, username: user.username, email: user.email } });
        });
    })(req, res, next);
};

// Logout controller
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error logging out.' });
        }
        res.json({ msg: 'Logged out successfully.' });
    });
};
