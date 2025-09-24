const { Category } = require('../models/category_course');


const getCategories = async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        return res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
};

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving category', error });
    }
};


module.exports = {
    getCategories,
    getOneCategory
};
