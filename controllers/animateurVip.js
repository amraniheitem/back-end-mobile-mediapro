const Animateur = require("../models/animateurVip");
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


// Vérification du type de fichier

const { getCloudinaryStorage} = require("../utils/cloudinary");

// ✅ Cloudinary storage
const upload = multer({ storage: getCloudinaryStorage("animateurVip") });
const uploadOptions = upload.single("photo_profil");

// ✅ GET ALL
const getAll = async (req, res) => {
    try {
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
            sex: 1,
            prix_heure:1,

            adresse: 1
        });

        res.send(animateurList);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ GET ONE
const getOne = async (req, res) => {
    try {
        const animateur = await Animateur.findById(req.params.id);
        if (!animateur) {
            return res.status(404).json({ success: false, message: "Animateur non trouvé" });
        }
        res.send(animateur);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




// ✅ RATING
const ratingAnimateur = async (req, res) => {
    try {
        const animateur = await Animateur.findById(req.params.id);
        const userId = req.user.userId;

        const existingRating = animateur.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            return res.status(400).json({ success: false, message: "Déjà noté" });
        }

        animateur.ratings.push({
            userId: new mongoose.Types.ObjectId(userId),
            value: req.body.rating
        });

        const total = animateur.ratings.reduce((sum, r) => sum + r.value, 0);
        animateur.averageRating = total / animateur.ratings.length;

        await animateur.save();

        res.status(201).json({
            success: true,
            averageRating: animateur.averageRating.toFixed(1),
            totalRatings: animateur.ratings.length
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAll,
    getOne,
    ratingAnimateur,
    uploadOptions
};
