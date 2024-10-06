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

const getUserProjects = async (req, res) => {
    const { id } = req.params;
    try {
        const query = await UserService.getUserProjects(id);
        return res.status(200).json(query);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching projects', details: error.message });
    }
}


module.exports = { 
    createUser,
    getUserProjects
};