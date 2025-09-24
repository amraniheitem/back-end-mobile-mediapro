const Conseille = require('../models/services/conseille');




const getAllConseille = async (req, res) => {
    try {
        const conseils = await Conseille.find(); // ← on garde le modèle 'Conseille' importé
        res.status(200).json(conseils); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const getOneConseille = async (req, res) => {
    try {
        const conseilleId = req.params.id; 
        const conseille = await Conseille.findById(conseilleId); 
        if (!conseille) {
            return res.status(404).json({ message: 'Conseille not found' });
        }

        res.status(200).json(conseille); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllConseille,
    getOneConseille,
};