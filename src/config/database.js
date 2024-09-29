
const mongoose = require('mongoose');
const logger = require('../utils/logger');

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

const connections = {};

const connectToMainDatabase = async () => {
    if (mongoose.connection.readyState) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(process.env.NODE_ENV === 'production' 
            ? process.env.MONGO_URI_PROD // URI para la producción
            : process.env.MONGO_URI_DEV, // URI para desarrollo local
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info("Successfully connected to the main MongoDB database.");
        return mongoose.connection;
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

// Función para conectar a una base de datos específica (por ejemplo, un proyecto)
const connectToProjectDatabase = async (projectDbName) => {
    if (connections[projectDbName]) {
        return connections[projectDbName];
    }

    try {
        const dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${projectDbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        dbConnection.once('open', () => {
            logger.info(`Successfully connected to MongoDB database: ${projectDbName}`);
        });

        dbConnection.on('error', (error) => {
            logger.error(`Error connecting to MongoDB database: ${projectDbName}`, error);
        });

        // Guardamos la conexión en el objeto de conexiones
        connections[projectDbName] = dbConnection;
        return dbConnection;
    } catch (error) {
        logger.error(`Error creating connection to MongoDB database: ${projectDbName}`, error);
        throw error;
    }
};

const closeMainConnection = async () => {
    if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        logger.info("Main MongoDB connection closed.");
    }
};

// Función para cerrar todas las conexiones a las bases de datos de proyectos
const closeProjectConnections = async () => {
    for (const dbName in connections) {
        if (connections[dbName]) {
            await connections[dbName].close();
            logger.info(`Connection to database ${dbName} closed.`);
        }
    }
};

module.exports = {
    connectToMainDatabase,
    connectToProjectDatabase,
    closeMainConnection,
    closeProjectConnections
};