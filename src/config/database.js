
const mongoose = require('mongoose');
const logger = require('../utils/logger');

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

//const connections = {};

const connectToDatabase = async () => {
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

const closeConnection = async () => {
    if (mongoose.connection.readyState) {
        await mongoose.connection.close();
        logger.info("Main MongoDB connection closed.");
    }
};

module.exports = {
    connectToDatabase,
    closeConnection
};