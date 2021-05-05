const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateJobSchema = new Schema({
    description: { type: String, default: '' }
});

module.exports = mongoose.model('StateJob', StateJobSchema);