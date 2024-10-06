const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/', UserController.createUser);
router.get('/:id/projects', UserController.getUserProjects);

module.exports = router;