const User = require('../models/user.model');

const createUser = async (email) => {
    const user = new User({ email });
    await user.save();
    return user;
};

const getUserById = async (userId) => {
    return User.findById(userId).populate('projects');
};

const addUserProject = async (userId, projectId) => {
    const user = await getUserById(userId);
    if (user) {
        user.projects.push(projectId);
        await user.save();
        return user;
    }
    throw new Error('User not found');
};

module.exports = {
    createUser,
    getUserById,
    addUserProject
};
