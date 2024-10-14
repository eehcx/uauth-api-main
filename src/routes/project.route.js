const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controller');

router.post('/', ProjectController.createProject);
router.post('/:projectId/schema', ProjectController.upsertProjectSchema);
router.get('/token/:projectToken', ProjectController.getProjectByToken);

module.exports = router;