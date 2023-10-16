const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthControllers');

// Authentication routes
router.post('/login', authController.login);
// router.get('/logout', authController.logout);

module.exports = router;
