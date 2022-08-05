const mysql = require("mysql")


function selectSuscVigentes(connection, callback) {
    let sql = 'SELECT email, nombre, suscripcion.fecha_inicioS, '
    sql += 'suscripcion.fecha_finS, dieta.dieta, dieta.fecha_inicio, '
    sql += 'dieta.fecha_fin, suscripcion.idsuscripcion FROM dieta, suscripcion, usuarios '
    sql += 'WHERE usuarios.email = suscripcion.usuario AND dieta.suscripcion =  '
    sql += 'suscripcion.idsuscripcion AND suscripcion.caducada = FALSE ORDER BY dieta.fecha_inicio ASC'

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
    var sqlQueryAdmin = "INSERT INTO suscripcion (usuario, caducada, fecha_inicio, fecha_fin) VALUES ('"
    sqlQueryAdmin += data.email + "',false,'" + data.fechaInicio + "','" + data.fechaFinal + "')";
    connection.query(sql, function (err, result) {
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