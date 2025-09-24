const express = require('express');
const router = express.Router();
const authController = require('../controllers/user');

router.post('/account_register/:userId', authController.account_register);
router.post('/info_register', authController.info_register);
router.post('/verify/:userId', authController.verifyCode);
router.post('/login', authController.login); 

module.exports = router;