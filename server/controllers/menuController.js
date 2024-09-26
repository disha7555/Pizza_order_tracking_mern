//menu items list
const menu=require('../models/Menu');
exports.index= async(req, res) => {
    try {
        const menuItems = await menu.find();
        res.json(menuItems); // Send the menu items as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
};
