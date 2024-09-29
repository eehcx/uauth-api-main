const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    developerId: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
