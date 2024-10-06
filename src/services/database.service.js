const mongoose = require('mongoose');
const logger = require("../utils/logger");

const connections = {};

const createDatabase = async (dbName) => {
    const dbUri = `mongodb://localhost:27017/${dbName}`;
    const dbConnection = mongoose.createConnection(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    await dbConnection.once('open', async () => {
        logger.info(`Conexión establecida a la base de datos: ${dbName}`);

        const TestSchema = new mongoose.Schema({}, { collection: 'test' });
        const TestModel = dbConnection.model('Test', TestSchema);

        await TestModel.create({});
        logger.info(`Colección 'test' creada en la base de datos: ${dbName}`);
    });

    connections[dbName] = dbConnection;
    return dbConnection;
};

module.exports = createDatabase;