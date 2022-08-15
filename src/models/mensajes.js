const { param } = require("jquery");



function selectMessagesAdmin(connection, nombre, callback) {
    try {
        let query = "SELECT * FROM mybalance.mensajes_admin WHERE usuario='" + nombre + "';"
        connection.query(query, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)
    }

}



function createDate(connection, nombre, callback) {
    //INSERT INTO mensajes (`mensaje`) VALUES ('hola');

}




function selectMessagesUser(connection, nombre, callback) {

    try {
        let query = "SELECT * FROM mybalance.mensajes_usuario WHERE usuario='" + nombre + "';"
        connection.query(query, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)

    }
}


function insertMessageUser(connection, data, callback) {

    try {
        var d = new Date,
            dFormat = [d.getFullYear(), ('0' + (d.getMonth() + 1)).substr(-2),
            ('0' + d.getDate()).substr(-2)
            ].join('-') + ' ' +
                [('0' + d.getHours()).substr(-2),
                ('0' + d.getMinutes()).substr(-2),
                ('0' + d.getSeconds()).substr(-2),].join(':');


        console.log(dFormat)
        // dFormat = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let query = "INSERT INTO mensajes_usuario"
        query += "(usuario, admin, mensaje, fecha, visto) "
        query += "VALUES ('" + data.email + "', 'admin@gmail.com','"
        query += data.mensaje + "', '" + dFormat + "'," + false + ")"

        console.log(query)

        connection.query(query, function (err, result) {
            if (err) {
                console.log(err)
                throw err
            } else {
                callback(true)
            }
        });
    } catch (err) {
        console.log(err)
    }

}




function insertMessageAdmin(connection, data, callback) {
    try {
        var d = new Date,
            dFormat = [d.getFullYear(), ('0' + (d.getMonth() + 1)).substr(-2),
            ('0' + d.getDate()).substr(-2)
            ].join('-') + ' ' +
                [('0' + d.getHours()).substr(-2),
                ('0' + d.getMinutes()).substr(-2),
                ('0' + d.getSeconds()).substr(-2),].join(':');


        console.log(dFormat)
        // dFormat = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let query = "INSERT INTO mensajes_admin"
        query += "(admin, usuario, mensaje, fecha) "
        query += "VALUES ('admin@gmail.com','" + data.email + "', '"
        query += data.mensaje + "', '" + dFormat + "')"

        console.log(query)

        connection.query(query, function (err, result) {
            if (err) {
                console.log(err)
                throw err
            } else {
                callback(true)
            }
        });
    } catch (err) {
        console.log(err)
    }

}


function countMensajesNoVistos(connection, usuario, callback) {
    try {
        let query = "SELECT count(*) FROM mensajes_usuario "
        query += "WHERE mensajes_usuario.visto = false "
        query += "AND mybalance.mensajes_usuario.usuario = '" + usuario + "'"

        connection.query(query, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)
    }


}




function insertMessageAdmin(connection, data, callback) {
    try {
        var d = new Date,
            dFormat = [d.getFullYear(), ('0' + (d.getMonth() + 1)).substr(-2),
            ('0' + d.getDate()).substr(-2)
            ].join('-') + ' ' +
                [('0' + d.getHours()).substr(-2),
                ('0' + d.getMinutes()).substr(-2),
                ('0' + d.getSeconds()).substr(-2),].join(':');


        console.log(dFormat)
        // dFormat = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let query = "INSERT INTO mensajes_admin"
        query += "(admin, usuario, mensaje, fecha) "
        query += "VALUES ('admin@gmail.com','" + data.email + "', '"
        query += data.mensaje + "', '" + dFormat + "')"

        console.log(query)

        connection.query(query, function (err, result) {
            if (err) {
                console.log(err)
                throw err
            } else {
                callback(true)
            }
        });
    } catch (err) {
        console.log(err)
    }

}


function updateVistosMensajes(connection, data, callback) {
    try {
        let query = "UPDATE mensajes_usuario SET visto = 1 WHERE usuario = '" + data.email + "'";

        connection.query(query, function (err, result) {
            if (err) {
                console.log(err)
                throw err
            } else {
                callback(true)
            }
        });
    } catch (err) {
        console.log(err)
    }


}








module.exports = { insertMessageAdmin, insertMessageUser, selectMessagesUser, selectMessagesAdmin, countMensajesNoVistos, updateVistosMensajes }