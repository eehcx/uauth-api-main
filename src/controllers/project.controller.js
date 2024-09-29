const ProjectService = require('../services/project.service');
//const LogService = require('../services/log.service');

const createProject = async (req, res) => {
    const { developerId, projectName, projectToken } = req.body;
    try {
        const project = await ProjectService.createProject(developerId, projectName, projectToken);

        //await LogService.createLog(developerId, 'CREATE_PROJECT', `Project created: ${projectName}`);

        return res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating project', details: error.message });
    }
};

module.exports = { 
    createProject 
};