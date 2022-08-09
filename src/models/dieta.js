const mysql = require("mysql")




function selectDieta(connection, param, callback){
    try{
        let query = "SELECT alimentos_comidas.alimento, alimentos_comidas.comida, alimentos_comidas.tipo, alimentos_comidas.modificar,"
        query += "alimentos_comidas.cantidad, alimentos_comidas.consumido, comidas_del_dia.dia "
        query += "FROM comidas_del_dia, alimentos_comidas "
        query += "WHERE comidas_del_dia.idcomidas_dia = alimentos_comidas.comida "
        query += "AND comidas_del_dia.dieta IN (SELECT dieta FROM dieta "
        query += "WHERE suscripcion =" + param.suscripcion + " AND dieta.fecha_inicio = \"" + param.semSql + "\")"
        connection.query(query, function (err, result) {
            if (err) throw err
            callback(result)
        });
    }catch(Err){
        console.log(Err)
    }
}


module.exports = { selectDieta }