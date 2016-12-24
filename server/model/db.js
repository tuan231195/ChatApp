var mongoose = require('mongoose');

var dbURI = process.env.dbURI;
mongoose.connect(dbURI);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('disconnect', function () {
    console.log('Mongoose disconnected');
});


process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});


var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

require('./schema/messages');
require('./schema/users');
