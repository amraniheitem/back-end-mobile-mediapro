const express = require("express");
const router = express.Router();
const animController = require("../controllers/animController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const { getCloudinaryStorage } = require('../utils/cloudinary');

// Storage sur Cloudinary
const upload = multer({
  storage: getCloudinaryStorage("animateurs"), // 👉 ton dossier Cloudinary
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});


router.get("/getAll", animController.getAll);
router.get("/getOne/:id", animController.getOne);
router.post("/:id/rate", authMiddleware, (req, res) => {
  animController.ratingAnimateur(req, res);
});

module.exports = router;
