const mongoose = require('mongoose');

const Job = mongoose.model('Job');
const StateJob = mongoose.model('StateJob');
const { statesJobsConstants } = require('../constants/statesjob-constants');

const createJob = ({ excelPath, mappingFormat }) => {
    const test = new StateJob();
    test.description = "processing";

    test.save().then(
        r => console.log(r)
    )

    const job = new Job();
    job.state = statesJobsConstants.pending;
    job.excelPath = excelPath;
    job.mappingFormat = mappingFormat;
    return job.save();
}

const getJobById = ({ idJob, includeExcelJson }) => Job
    .findById({_id: idJob}, { excelJson: includeExcelJson ? 1 : 0 })
    .populate({
        path: 'state',
        model: 'StateJob'
    })

module.exports = {
    createJob,
    getJobById
}