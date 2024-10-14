const express = require('express');
const projectRoutes = require('./project.route');
const userRoutes = require('./user.route');
const schemaRoutes = require('./schema.route');

const router = express.Router();

router.use('/project', projectRoutes);
router.use('/user', userRoutes);
router.use('/schema', schemaRoutes);

module.exports = router;