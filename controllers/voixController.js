const Voix = require("../models/voix");
const mongoose = require("mongoose");

// GET ALL
const getAll = async (req, res) => {
  try {
    const voixList = await Voix.find().select({
      nom: 1,
      prenom: 1,
      wilaya: 1,
      photo_profil: 1,
      nbrLike: 1,
      ratings: 1,
      averageRating: 1,
      email: 1,
      numero: 1,
      sex: 1,
      adresse: 1,
      available: 1,
      langue: 1,
      video_presentatif: 1,
      video_fa: 1,
      description: 1,
      nbrLike: 1,
      ratings: 1,
      prix_minute: 1,

      averageRating: 1,
      ranking: 1,
    });

    if (!voixList) {
      return res
        .status(404)
        .json({ success: false, message: "Aucune voix off trouvée" });
    }

    res
      .status(200)
      .json({ success: true, count: voixList.length, data: voixList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ONE
const getOne = async (req, res) => {
  try {
    const voix = await Voix.findById(req.params.id);

    if (!voix) {
      return res
        .status(404)
        .json({ success: false, message: "Voix off non trouvée" });
    }

    res.send(voix);
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


// RATING
const ratingVoix = async (req, res) => {
  try {
    const voix = await Voix.findById(req.params.id);
    const userId = req.user.userId;

    const existingRating = voix.ratings?.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "Vous avez déjà noté cette voix-off",
      });
    }

    if (!voix.ratings) voix.ratings = [];

    voix.ratings.push({
      userId: new mongoose.Types.ObjectId(userId),
      value: req.body.rating,
    });

    const total = voix.ratings.reduce((sum, r) => sum + r.value, 0);
    voix.averageRating = total / voix.ratings.length;

    await voix.save();

    res.status(201).json({
      success: true,
      averageRating: voix.averageRating.toFixed(1),
      totalRatings: voix.ratings.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  ratingVoix,
};
