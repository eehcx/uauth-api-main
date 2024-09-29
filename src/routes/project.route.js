const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controller');

router.post('/', ProjectController.createProject);

module.exports = router;