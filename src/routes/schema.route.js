const express = require('express');
const router = express.Router();
const SchemaController = require('../controllers/schema.controller');

router.get('/:SchemaId', SchemaController.getProjectSchema);

module.exports = router;