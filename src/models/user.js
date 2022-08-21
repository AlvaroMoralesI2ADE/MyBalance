const mysql = require("mysql")
const bcrypt = require("bcryptjs");




function selectSuscVigentes(connection, callback) {
    try {

        let sql = "SELECT email, nombre, suscripcion.fecha_inicioS, mybalance.dieta.fecha_inicio,  "
        sql += "suscripcion.idsuscripcion,  ("
        sql += "SELECT count(*) FROM mybalance.mensajes_usuario "
        sql += "WHERE mybalance.mensajes_usuario.visto = false "
        sql += "AND mybalance.mensajes_usuario.usuario = email) as Novistos, "
        sql += "(SELECT COUNT(*) FROM mybalance.alimentos_comidas "
        sql += "LEFT JOIN mybalance.comidas_del_dia "
        sql += "ON mybalance.comidas_del_dia.idcomidas_dia = mybalance.alimentos_comidas.comida "
        sql += "WHERE mybalance.comidas_del_dia.dieta =  mybalance.dieta.dieta) AS dietaAsignada, "
        sql += "(SELECT COUNT(*) FROM mybalance.alimentos_comidas "
        sql += "LEFT JOIN mybalance.comidas_del_dia "
        sql += "ON mybalance.comidas_del_dia.idcomidas_dia = mybalance.alimentos_comidas.comida "
        sql += "WHERE mybalance.comidas_del_dia.dieta =  mybalance.dieta.dieta "
        sql += "AND mybalance.alimentos_comidas.modificar = true "
        sql += ") AS modificar "
        sql += "FROM mybalance.usuarios, mybalance.suscripcion "
        sql += "LEFT JOIN mybalance.dieta on mybalance.suscripcion.idsuscripcion = mybalance.dieta.suscripcion "
        sql += "WHERE mybalance.usuarios.email = mybalance.suscripcion.usuario AND mybalance.suscripcion.caducada = false "
        sql += "order by mybalance.dieta.fecha_inicio, mybalance.suscripcion.fecha_inicioS ASC "
        
        console.log(sql)
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

        var sql = "SELECT mybalance.suscripcion.caducada, mybalance.suscripcion.idsuscripcion, mybalance.suscripcion.fecha_inicioS, "
        sql += "mybalance.dieta.fecha_inicio "
        sql += "FROM mybalance.suscripcion LEFT JOIN mybalance.dieta "
        sql += "ON mybalance.dieta.suscripcion = mybalance.suscripcion.idsuscripcion "
        sql += "WHERE mybalance.suscripcion.usuario = ? "
        sql += "AND suscripcion.caducada = 0 "
        sql += "order by mybalance.dieta.fecha_inicio ASC"
       

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
        var sqlQueryAdmin = "INSERT INTO suscripcion (usuario, caducada, fecha_inicioS) VALUES ('"
        sqlQueryAdmin += data.email + "',false,'" + data.fechaInicio + "')";
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