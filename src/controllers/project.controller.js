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

const upsertProjectSchema = async (req, res) => {
    const { projectId } = req.params;
    const { schema } = req.body;
    try {
        if (!schema || typeof schema !== 'object') {
            return res.status(400).json({ error: 'Invalid schema format' });
        }

        const result = await ProjectService.upsertProjectSchema(projectId, schema)

        return res.status(200).json({ message: 'Schema saved successfully', result });
    } catch (error) {
        return res.status(500).json({ error: 'Error saving schema', details: error.message });
    }
}

module.exports = { 
    createProject,
    getProjectByToken,
    upsertProjectSchema,
};