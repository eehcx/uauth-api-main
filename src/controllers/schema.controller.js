const SchemaService = require('../services/schema.service');

const getProjectSchema = async (req, res) => {
    const { SchemaId } = req.params;
    try {
        const query = await SchemaService.getProjectSchema(SchemaId);

        if (!query) {
            return res.status(404).json({ error: 'Schema not found' });
        }

        return res.status(201).json(query);
    } catch (error) {
        return res.status(500).json({ error: 'Error querying schema', details: error.message });
    }
}

module.exports = { 
    getProjectSchema,
};