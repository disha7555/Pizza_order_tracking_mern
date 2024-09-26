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
        return res.status(201).json({ success: true,message: 'Registration successful.', user: { id: newUser._id, name: newUser.name, email: newUser.email } });
      
        // Automatically log in after registration
        // req.login(newUser, (err) => {
        //     if (err) {
        //         return res.status(500).json({ message: 'Error logging in after registration.' });
        //     }
        //      });

    } catch (err) {
        if (err.name === 'ValidationError') {
            // Return validation error messages
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ message: errors });
        }

        console.error(err.message);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// Login controller
exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({success: true, message: 'Login successful.', user: { id: user._id,email: user.email,role:user.role } });
        });
    })(req, res, next);
};

// Logout controller
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out.'});
        }
        res.json({ message: 'Logged out successfully.',isAuthenticated: false  });
    });
};

//status 
exports.status= (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        return res.json({ isAuthenticated: true, user: req.user });
    } else {
        return res.json({ isAuthenticated: false });
    }
};
