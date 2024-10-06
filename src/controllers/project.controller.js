const ProjectService = require('../services/project.service');

const createProject = async (req, res) => {
    const { developerId, projectName, projectToken } = req.body;
    try {
        const project = await ProjectService.createProject(developerId, projectName, projectToken);

        return res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating project', details: error.message });
    }
};

const getProjectByToken = async (req, res) => {
    const { projectToken } = req.params;
    try {
        const query = await ProjectService.getProjectByToken(projectToken);

        if (!query) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(201).json(query);
    } catch (error) {
        return res.status(500).json({ error: 'Error when querying the project', details: error.message });
    }
}

module.exports = { 
    createProject,
    getProjectByToken,
};