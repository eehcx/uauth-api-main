require("dotenv").config();
const express = require("express");

const { connectToDatabase, closeConnection } = require("./src/config/database");
const routes = require("./src/routes/app.routes");
const logger = require("./src/utils/logger");
const cors = require("cors");
//const helmet = require('helmet');
//const morgan = require('morgan');

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

const app = express();

// Middleware
app.use(cors(corsOptions));
//app.use(helmet());
//app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/resources/v1", routes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  logger.warn(`Ruta no encontrada: ${req.originalUrl}`);
  res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();

process.on("SIGTERM", async () => {
  logger.info("SIGTERM recibido. Cerrando servidor HTTP");
  await closeConnection();
  process.exit(0);
});

process.on("SIGINT", async () => {
  logger.info("SIGINT recibido. Cerrando servidor HTTP");
  await closeConnection();
  process.exit(0);
});

module.exports = app;