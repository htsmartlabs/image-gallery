//This is the database connection file. The contains the details of the connection to the database.

const mongoose = require('mongoose');
const connection = require('./environment.variable');

mongoose.connect('mongodb://'+connection.username+':' +connection.password + connection.database, { useNewUrlParser: true } , error =>{
    !error ? console.log('Database connected') : console.log('Error: '+ error);
});

module.exports = mongoose;