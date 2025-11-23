const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// (Opsional) Hanya jalankan sekali untuk buat admin
// router.post('/register', adminController.registerAdmin);

router.post('/login', adminController.login);

// Rute di bawah ini diproteksi oleh authMiddleware
router.get('/dashboard', authMiddleware, adminController.getDashboardData);
router.put('/keys/:id', authMiddleware, adminController.updateApiKey);

module.exports = router;