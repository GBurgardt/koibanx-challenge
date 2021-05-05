const config = require('./config.json')

module.exports = app => {
    require('./routes/job-routes')(app, config.urlapi);
};