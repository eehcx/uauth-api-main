const Log = require('../models/log.model');

const createLog = async (developerId, action, details = '') => {
    const log = new Log({
        developerId,
        action,
        details
    });
    await log.save();
    return log;
};

module.exports = {
    createLog
};
