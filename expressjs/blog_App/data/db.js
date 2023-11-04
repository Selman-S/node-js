const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection(config.db)

connection.connect(function(err){
    if(err){
       return console.log(err);
    }

        console.log('db connected');
    
});

module.exports = connection.promise();