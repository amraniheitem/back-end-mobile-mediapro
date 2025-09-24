const express = require("express");
const router = express.Router();
const {
  createBoutique,
  getBoutiques,
  getBoutiqueById,
  updateBoutique,
  deleteBoutique,
} = require("../controllers/boutiqueController");

// CRUD Boutiques
router.get("/", getBoutiques);          // Récupérer toutes les boutiques
router.get("/:id", getBoutiqueById);    // Récupérer une boutique par ID

module.exports = router;
