const UserService = require('../services/user.service');

const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserService.createUser(email);
        res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user', details: error.message });
    }
};

module.exports = { 
    createUser 
};