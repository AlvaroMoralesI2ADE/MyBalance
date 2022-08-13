const { param } = require("jquery");



function selectMessagesAdmin(connection, nombre, callback) {
    let query = "SELECT * FROM mybalance.mensajes_enviados_admin WHERE usuario='" + nombre + "';"
    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });

}



function selectMessagesUser(connection, nombre, callback) {
    let query = "SELECT * FROM mybalance.mensajes_enviados_usuario WHERE usuario='" + nombre + "';"
    console.log(query)
    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });

}


function insertMessageUser(connection, data, callback){
    let query = "INSERT INTO mybalance.mensajes_enviados_usuario" 
    query += "(usuario, admin, mensaje, fecha) "
    query += "VALUES ('" + data.email + "', 'admin@gmail.com', 'hola', " + data.fecha + ")"

    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });

}




function insertMessageAdmin(connection, data, callback){
    let query = "INSERT INTO mybalance.mensajes_enviados_admin" 
    query += "(usuario, admin, mensaje, fecha) "
    query += "VALUES ('" + data.email + "', 'admin@gmail.com', 'hola', " + data.fecha + ")"

    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });

}



module.exports = {insertMessageAdmin, insertMessageUser, selectMessagesUser, selectMessagesAdmin }
