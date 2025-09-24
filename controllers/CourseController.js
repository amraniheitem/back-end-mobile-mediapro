const Course = require('../models/course');

// 📋 Obtenir tous les cours
const getcourses = async (req, res) => {
    try {
        const courseList = await Course.find().populate('category');
        res.status(200).json({
            success: true,
            data: courseList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 🔍 Obtenir un seul cours
const getOnecourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('category');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Cours non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur récupération cours',
            error: error.message
        });
    }
};

module.exports = {
    getcourses,
    getOnecourse,
};
