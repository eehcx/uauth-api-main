const http = require('http');
const Project = require('../models/project.model');
const UserService = require('./user.service');
const createDatabase = require('../services/database.service');

const createProject = async (developerId, projectName, projectToken) => {
    const dbName = `${projectName}_${projectToken.substring(0, 5)}`;

    try {
        const project = new Project({
            owner: developerId, 
            projectName,
            projectToken,
            dbName
        });
    
        await createDatabase(dbName);
    
        await project.save();
    
        await UserService.addUserProject(developerId, project._id);
    
        return project;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project already exists');
        }
        throw new Error('Error creating project');
    }
};

const getProjectByToken = async (projectToken) => {
    return await Project.findOne({ projectToken }); 
};

module.exports = {
    createProject,
    getProjectByToken,
};