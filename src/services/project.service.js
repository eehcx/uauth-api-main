// services/ProjectService.js
const Project = require('../models/project.model');
const UserService = require('./user.service');

const createProject = async (developerId, projectName, projectToken) => {
    const dbName = `${projectName}_${projectToken.substring(0, 5)}`;

    const project = new Project({
        owner: developerId, 
        projectName,
        dbName,
        projectToken
    });
    await project.save();

    await UserService.addUserProject(developerId, project._id);

    return project;
};

const getProjectById = async (projectId) => {
    return Project.findById(projectId);
};

module.exports = {
    createProject,
    getProjectById
};