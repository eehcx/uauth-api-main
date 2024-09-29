const express = require('express');
const projectRoutes = require('./project.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/users', userRoutes);

module.exports = router;