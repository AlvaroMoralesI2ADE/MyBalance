const mysql = require("mysql")




function selectSuscVigentes(connection, callback) {
    try {
        let sql = 'SELECT email, nombre, suscripcion.fecha_inicioS, suscripcion.fecha_finS,'
        sql += ' suscripcion.idsuscripcion FROM suscripcion, '
        sql += 'usuarios WHERE mybalance.usuarios.email = suscripcion.usuario '

        connection.query(sql, function (err, result) {
            if (err) throw err
            callback(result)

        });
    } catch (err) {
        console.log(err)
    }
}



function selectUsuario(connection, data, callback) {
    try {
        let sql = 'SELECT * FROM usuarios WHERE email = ?';
        connection.query(sql, data, function (err, result) {
            if (err) throw err
            callback(result)

        });
    } catch (err) {
        console.log(err)
    }

}


function createUser(connection, data, callback) {
    try {
        let sql = "INSERT INTO usuarios SET ?"
        connection.query(sql, data, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)
    }
}




function selectAdmin(connection, data, callback) {
    try {
        let sql = 'SELECT * FROM administradores WHERE gmail = ?';
        connection.query(sql, data, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (Err) {
        console.log(Err)
    }

}



function selectSuscripcion(connection, data, callback) {
    try {
        var sql = "SELECT suscripcion.caducada, suscripcion.idsuscripcion, suscripcion.fecha_inicioS "
        sql += "FROM suscripcion WHERE "
        sql += "suscripcion.usuario = ? "
        sql += "AND (SELECT curdate()) <= suscripcion.fecha_finS "
        sql += "ORDER BY suscripcion.fecha_inicioS ASC"

        connection.query(sql, data, function (err, result) {
            if (err) throw err
            callback(result)

        });
    } catch (Err) {
        console.log(Err)
    }


}


function insertSuscripcion(connection, data, callback) {
    try {
        var sqlQueryAdmin = "INSERT INTO suscripcion (usuario, caducada, fecha_inicioS, fecha_finS) VALUES ('"
        sqlQueryAdmin += data.email + "',false,'" + data.fechaInicio + "','" + data.fechaFinal + "')";
        console.log(sqlQueryAdmin)
        connection.query(sqlQueryAdmin, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (Err) {
        console.log(Err)
    }
}



function updateUsuario(connection, data, callback) {
    try {
        console.log(data.setValues)
        console.log(data.email)
        console.log("etnta")
        let sql = "UPDATE usuarios SET " + data.setValues + " WHERE email = '" + data.email + "'";

        console.log(sql)
        connection.query(sql, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (Err) {
        console.log(Err)
    }
}


module.exports = { selectSuscVigentes, selectUsuario, selectSuscripcion, selectAdmin, createUser, insertSuscripcion, updateUsuario }