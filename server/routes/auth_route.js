
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// router.get('/', (req, res) => {
//     res.status(200).send("Welcome");
// });

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

router.get('/status',authController.status)
module.exports = router;
