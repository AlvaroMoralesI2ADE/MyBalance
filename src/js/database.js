const mysql = require('mysql');





const connection = mysql.createConnection({
      host:'localhost',
      database: 'mybalance',
      user: 'root',
      password: 'AlvaroDB',
      multipleStatements: true
})




function getConnection(){
  return connection;
}



module.exports = { getConnection }











    