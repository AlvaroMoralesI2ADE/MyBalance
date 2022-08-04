const mysql = require("mysql")


function selectSusc(connection, callback){
    let sql = 'SELECT email, nombre, suscripcion.fecha_inicioS, '
    sql += 'suscripcion.fecha_finS, dieta.dieta, dieta.fecha_inicio, '
    sql += 'dieta.fecha_fin, suscripcion.idsuscripcion FROM dieta, suscripcion, usuarios '
    sql +=  'WHERE usuarios.email = suscripcion.usuario AND dieta.suscripcion =  '
    sql += 'suscripcion.idsuscripcion AND suscripcion.caducada = FALSE ORDER BY dieta.fecha_inicio ASC'

    connection.query(sql, function(err,result) {
        if(err) throw err
        callback(result)
       
    });
}


function selectUsuario(connection, data ,callback){
    let sql = 'SELECT nombre, sexo, altura, peso, tipoAlimentacion, edad FROM mybalance.usuarios WHERE email = ?';
    connection.query(sql, data.email, function(err,result) {
        if(err) throw err
        callback(result)
       
    });
}

module.exports = {selectSusc, selectUsuario}