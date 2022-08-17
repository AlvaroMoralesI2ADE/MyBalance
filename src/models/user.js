const mysql = require("mysql")
const bcrypt = require("bcryptjs");




function selectSuscVigentes(connection, callback) {
    try {

        let sql = "SELECT email, nombre, suscripcion.fecha_inicioS, suscripcion.fecha_finS, "
        sql += "suscripcion.idsuscripcion,  ("
        sql += "SELECT count(*) FROM mybalance.mensajes_usuario "
        sql += "WHERE mybalance.mensajes_usuario.visto = false "
        sql += "AND mybalance.mensajes_usuario.usuario = email) as Novistos, "
        sql += "(SELECT COUNT(*) FROM mybalance.alimentos_comidas "
        sql += "WHERE mybalance.alimentos_comidas.modificar = true "
        sql += "AND mybalance.alimentos_comidas.comida IN (SELECT "
        sql += "mybalance.comidas_del_dia.idcomidas_dia FROM mybalance.comidas_del_dia "
        sql += "WHERE mybalance.comidas_del_dia.dieta IN "
        sql += "(SELECT mybalance.dieta.dieta "
        sql += "FROM mybalance.dieta WHERE mybalance.dieta.suscripcion = mybalance.suscripcion.idsuscripcion))) as "
        sql += "modificar, "
        sql += "(SELECT COUNT(*) FROM mybalance.alimentos_comidas "
        sql += "WHERE mybalance.alimentos_comidas.comida IN (SELECT "
        sql += "mybalance.comidas_del_dia.idcomidas_dia FROM mybalance.comidas_del_dia "
        sql += "WHERE mybalance.comidas_del_dia.dieta IN "
        sql += "(SELECT mybalance.dieta.dieta "
        sql += "FROM mybalance.dieta WHERE mybalance.dieta.suscripcion = mybalance.suscripcion.idsuscripcion))) as dietaAsignada "
        sql += "FROM mybalance.suscripcion, "
        sql += "mybalance.usuarios WHERE mybalance.usuarios.email = mybalance.suscripcion.usuario "
        sql += "AND mybalance.suscripcion.caducada = false "

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
        console.log("selectUsuario")
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
            callback(true)
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
        var sql = "SELECT suscripcion.caducada, suscripcion.idsuscripcion, suscripcion.fecha_inicioS, suscripcion.fecha_finS "
        sql += "FROM suscripcion WHERE "
        sql += "suscripcion.usuario = ? AND suscripcion.caducada = 0 "
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


function updatePassword(connection, data, callback) {
    try {
        console.log("entra")
        let pass = bcrypt.hashSync(data.password,10);
        let sql = "UPDATE usuarios SET contraseña = '" + pass +  "' WHERE email = '" + data.email + "'";

        console.log(sql)
        connection.query(sql, function (err, result) {
            if (err) throw err
            callback(true)
        });
    } catch (Err) {
        console.log(Err)
    }
}


function cancelarSuscripcion(connection, email, callback) {
    try {
        console.log("entra")
        let sql = "UPDATE Suscripcion SET caducada = 1 WHERE suscripcion.usuario = ?"
        console.log(sql)
        connection.query(sql, email, function (err, result) {
            if (err) { throw err}
            else{ callback(true)}
        });
    } catch (Err) {
        console.log(Err)
    }


}



function insertAlergia(connection, param, callback) {
    try {
        console.log("ENTRA")
        let sql = "INSERT INTO alergias_intolerancias (alimento, usuario) VALUES ('" + param.alimento + "','" + param.email + "')"
        connection.query(sql, function (err, result) {
            if (err) { throw err
            }
            else{ callback(true)}
        });
    } catch (Err) {
        console.log(Err)
    }

}



function selectAlergia(connection, data, callback) {
    try {
        let sql = 'SELECT * FROM alergias_intolerancias WHERE usuario = ?';
        connection.query(sql, data, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (Err) {
        console.log(Err)
    }

}



module.exports = { selectSuscVigentes, selectUsuario, selectSuscripcion, 
    selectAdmin, createUser, insertSuscripcion,
    updateUsuario, cancelarSuscripcion, insertAlergia, selectAlergia, updatePassword }