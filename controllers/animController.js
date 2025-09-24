const Animateur = require("../models/animateur");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  const animateurList = await Animateur.find().select({
    nom: 1,
    prenom: 1,
    wilaya: 1,
    photo_profil: 1,
    nbrLike: 1,
    ratings: 1,
    event: 1,
    averageRating: 1,
    email: 1,
    numero: 1,
    prix_heure: 1,
    sex: 1,
    adresse: 1,
  });

  if (!animateurList) {
    res.status(500).json({ success: false });
  }
  res.send(animateurList);
};

const getOne = async (req, res) => {
  try {
    const animateur = await Animateur.findById(req.params.id);

    if (!animateur) {
      return res
        .status(404)
        .json({ success: false, message: "Animateur non trouvé" });
    }

    res.send(animateur);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur serveur",
        error: error.message,
      });
  }
};

const ratingAnimateur = async (req, res) => {
  try {
    const animateur = await Animateur.findById(req.params.id);
    const userId = req.user.userId; // Récupéré du middleware

    // Vérifier si l'utilisateur a déjà noté
    const existingRating = animateur.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "Vous avez déjà noté cet animateur",
      });
    }

    // Ajouter la nouvelle note AVEC userId
    animateur.ratings.push({
      userId: new mongoose.Types.ObjectId(userId), // Conversion explicite
      value: req.body.rating,
    });

    // Calculer la moyenne
    const total = animateur.ratings.reduce((sum, r) => sum + r.value, 0);
    animateur.averageRating = total / animateur.ratings.length;

    await animateur.save();

    res.status(201).json({
      success: true,
      averageRating: animateur.averageRating.toFixed(1),
      totalRatings: animateur.ratings.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  getOne,
  ratingAnimateur,
};
