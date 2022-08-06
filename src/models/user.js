const mysql = require("mysql")




function selectSuscVigentes(connection, callback) {
    let sql = 'SELECT email, nombre, suscripcion.fecha_inicioS, suscripcion.fecha_finS,'
    sql += ' suscripcion.idsuscripcion FROM suscripcion, '
    sql += 'usuarios WHERE mybalance.usuarios.email = suscripcion.usuario '

    connection.query(sql, function (err, result) {
        if (err) throw err
        callback(result)

    });
}


function selectUsuario(connection, data, callback) {
    let sql = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(sql, data, function (err, result) {
        if (err) throw err
        callback(result)

    });
    
}


function createUser(connection, data, callback){
    let sql = "INSERT INTO usuarios SET ?"
    connection.query(sql, data, function (err, result) {
        if (err) throw err
        callback(result)
    });
 }




function selectAdmin(connection, data, callback) {
    let sql = 'SELECT * FROM administradores WHERE gmail = ?';
    connection.query(sql, data, function (err, result) {
        if (err) throw err
        callback(result)
    });
    
}



function selectSuscripcion(connection, data, callback) {
    var sql = "SELECT suscripcion.caducada, suscripcion.idsuscripcion, suscripcion.fecha_inicioS "
    sql += "FROM suscripcion WHERE "
    sql += "suscripcion.usuario = ? "
    sql += "AND (SELECT curdate()) <= suscripcion.fecha_finS "
    sql += "ORDER BY suscripcion.fecha_inicioS ASC"

    connection.query(sql, data, function (err, result) {
        if (err) throw err
        callback(result)

    });



}


function insertSuscripcion(connection, data, callback){
 
    var sqlQueryAdmin = "INSERT INTO suscripcion (usuario, caducada, fecha_inicioS, fecha_finS) VALUES ('"
    sqlQueryAdmin += data.email + "',false,'" + data.fechaInicio + "','" + data.fechaFinal + "')";
    console.log(sqlQueryAdmin)
    connection.query(sqlQueryAdmin, function (err, result) {
        if (err) throw err
        callback(result)
    });
}



function updateUsuario(connection, data, callback){
    var sqlSet = "UPDATE usuarios SET " + data.setValues + " WHERE email = " + data.email;
    connection.query(sql, function (err, result) {
        if (err) throw err
        callback(result)
    });
}


module.exports = { selectSuscVigentes, selectUsuario, selectSuscripcion, selectAdmin, createUser, insertSuscripcion, updateUsuario}