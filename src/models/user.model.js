const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
