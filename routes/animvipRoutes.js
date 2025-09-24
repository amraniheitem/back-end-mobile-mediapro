const express = require('express');
const router = express.Router();
const animController = require('../controllers/animateurVip');
const authMiddleware = require("../middlewares/authMiddleware");

// GET
router.get('/getAll', animController.getAll);
router.get('/getOne/:id', animController.getOne);
router.post('/:id/rate', authMiddleware, animController.ratingAnimateur);

module.exports = router;
