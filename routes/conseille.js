// conseilleRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/conseilleController');
const multer = require('multer');
const { getCloudinaryStorage } = require('../utils/cloudinary');

// ⚡ Utiliser Cloudinary au lieu de diskStorage
const upload = multer({
  storage: getCloudinaryStorage('conseille'), // MediaPro/conseille dans Cloudinary
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
}).single('image');

// Middleware pour gérer les erreurs d'upload
const handleUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
};

router.route('/')
  .get(controller.getAllConseille);

router.route('/:id')
  .get(controller.getOneConseille)

module.exports = router;
