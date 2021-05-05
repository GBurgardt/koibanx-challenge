const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    state: { type: Schema.ObjectId, ref: 'StateJob' },
    excelPath: { type: String, default: '' },
    mappingFormat: { type: Object, default: {} },
    excelJson: { type: Object, default: {} },
    formatErrors: [ { type: Object, default: {} } ]
});

module.exports = mongoose.model('Job', JobSchema);