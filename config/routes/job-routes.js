const jobController = require('../../app/controllers/job-controller');
const uploadService = require('../../app/services/upload-service')

module.exports = (app, urlapi) => {
    app.post(`${urlapi}/job`, uploadService.upload, jobController.create);
    app.get(`${urlapi}/job/:idJob`, jobController.getById);
};