const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Dipakai tombol "Generate API Key" di frontend
router.get('/generate-key', userController.generateKey);

// Dipakai tombol "Save" di frontend
router.post('/save-user', userController.saveUserData);

module.exports = router;