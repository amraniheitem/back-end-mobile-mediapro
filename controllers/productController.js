const { Product } = require('../models/product');
const { Category } = require('../models/categoryProduit');


// 📋 Obtenir tous les produits
const getProducts = async (req, res) => {
  try {
    const productList = await Product.find().populate('category');
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 🔍 Obtenir un produit par ID
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération produit', error });
  }
};

// ✏️ Mettre à jour un produit

module.exports = {
  getProducts,
  getOneProduct
};
