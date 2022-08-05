
const { query } = require("express");
const mysql = require("mysql")


function selectAlimento(connection, alimento, callback) {
    connection.query('SELECT alimento FROM alimentos WHERE alimento LIKE "%' + alimento + '%"',
        function (err, rows, fields) {
            if (err) throw err;
            var data = [];
            for (i = 0; i < rows.length; i++) {
                if (i < 5) {
                    data.push(rows[i].alimento);
                }

            }
            callback(data);
        });
}



function selectAlimentosSuscripcion(connection, suscripcion, semana, callback) {
    let query = ""
    query += "SELECT alimentos_comidas.alimento, alimentos_comidas.comida, alimentos_comidas.tipo, alimentos_comidas.modificar,"
    query += "alimentos_comidas.cantidad, alimentos_comidas.consumido, comidas_del_dia.dia "
    query += "FROM comidas_del_dia, alimentos_comidas "
    query += "WHERE comidas_del_dia.idcomidas_dia = alimentos_comidas.comida "
    query += "AND comidas_del_dia.dieta IN (SELECT dieta FROM dieta "
    query += "WHERE suscripcion =" + suscripcion + " AND dieta.fecha_inicio = \"" + semana + "\")"
    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });
}



function UpdateAlimentosComidas(connection, param, callback){
    let query = "UPDATE alimentos_comidas "
    query += "SET alimentos_comidas.modificar = 1 "
    query += "WHERE alimentos_comidas.alimento = \"" + param.alimento + "\" AND "
    query += "alimentos_comidas.tipo = \"" + param.comida + "\" "
    query += "AND alimentos_comidas.comida = (SELECT idcomidas_dia "
    query += "FROM mybalance.comidas_del_dia "
    query += "WHERE mybalance.comidas_del_dia.dia = '" + param.año + "-" + param.mes + "-" + param.dia + "' AND mybalance.comidas_del_dia.dieta IN "
    query += "(SELECT dieta FROM mybalance.dieta "
    query += "WHERE mybalance.dieta.suscripcion = " + param.suscripcion + ")) "
    
 
    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });
}

module.exports = { selectAlimento, selectAlimentosSuscripcion,UpdateAlimentosComidas}