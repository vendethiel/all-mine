var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodewebappdb');
module.exports = mongoose.connection;