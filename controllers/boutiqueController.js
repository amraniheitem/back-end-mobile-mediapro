const { Boutique } = require("../models/boutique");

const getBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.find();
    res.status(200).json({ success: true, data: boutiques });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Récupérer une seule boutique par ID
const getBoutiqueById = async (req, res) => {
  try {
    const boutique = await Boutique.findById(req.params.id);
    if (!boutique) {
      return res.status(404).json({ success: false, message: "Boutique non trouvée" });
    }
    res.status(200).json({ success: true, data: boutique });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Mettre à jour une boutique

module.exports = {
  getBoutiques,
  getBoutiqueById,
};
