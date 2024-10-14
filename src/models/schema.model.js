const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: { type: String, required: true, unique: true }, 
    schema: { type: Object, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schema', projectSchema);