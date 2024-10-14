const Schema = require('../models/schema.model');
const logger = require("../utils/logger");

const getProjectSchema = async (SchemaId) => {
    try {
        const schema = await Schema.findById(SchemaId); // , 'schema'
        delete schema._doc.__v;
        delete schema._doc.projectId;
        // logger.info(schema);

        return schema;
    } catch (error) {
        throw new Error(`Error consulting schema: ${error.message}`);
    }
}

module.exports = {
    getProjectSchema,
};