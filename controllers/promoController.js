const Promo = require('../models/services/promo');


// GET ALL
const getAllPromo = async (req, res) => {
  try {
    const promos = await Promo.find(); 
    res.status(200).json(promos); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// GET ONE
const getOnePromo = async (req, res) => {
  try {
    const promoId = req.params.id; 
    const promo = await Promo.findById(promoId); 
    if (!promo) {
      return res.status(404).json({ message: 'Promo non trouvée' });
    }

    res.status(200).json(promo); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPromo,
  getOnePromo,
};
