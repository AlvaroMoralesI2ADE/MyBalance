const mysql = require('mysql');



const connection = mysql.createConnection({
      host:'localhost',
      database: 'mybalance',
      user: 'root',
      password: 'AlvaroDB',
      multipleStatements: true
})


connection.connect((err) => {
  if(err) throw err;
  console.log("connected to database")
});



function getConnection(){
  return connection;
}



module.exports = { getConnection }











    