const express = require('express');
const router = express.Router();
const authController = require('../controllers/cateCourseController');

router.get('/list', authController.getCategories);
router.get('/getOne/:id', authController.getOneCategory);


module.exports = router;
