const User = require('../models/user.model');

const createUser = async (email) => {
    try {
        const user = new User({ email });
        await user.save();
        return user;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Email already exists');
        }
        throw new Error('Error creating user');
    }
};

const getUserById = async (userId) => {
    return User.findById(userId).populate('projects');
};

const getUserProjects = async (id) => {
    try {
        const user = await User.findById(id).populate('projects');

        if (!user) {
            throw new Error('User not found');
        }

        return user.projects;
    } catch (error) {
        throw new Error(`Error fetching user projects: ${error.message}`);
    }
}


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
    getUserProjects,
    addUserProject
};
