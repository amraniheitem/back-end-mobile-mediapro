const express = require('express');
const router = express.Router();
const authController = require('../controllers/categoryController');

router.get('/list', authController.getCategories);
router.get('/getOne/:id', authController.getOneCategory);


module.exports = router;
