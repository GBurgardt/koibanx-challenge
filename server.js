const express = require('express');
const config = require('./config/config.json');
const mongoose = require('mongoose');
const http = require('http');
const app = express();

require('./app/models/job');
require('./app/models/stateJob');
require('./config/express')(app);
require('./config/routes')(app);

const queueService = require('./app/services/queue-service')

const httpServer = http.createServer(app);

listen = () => {
    httpServer.listen(3000, () => {
        console.log('HTTP Server running on port 3000');
    });
}

connect = () => {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    
    return mongoose.connect(config.urldb, { useNewUrlParser: true });
}

connect();



setInterval(
    () => {
        queueService.updateQueue();
    },
    2000
)


module.exports = app;