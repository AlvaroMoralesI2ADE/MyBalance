
function selectDietaModelo(connection, dieta, callback){
    let query = "SELECT alimentos_comida_modelo.alimentos, alimentos_comida_modelo.tipo,"
    query += "alimentos_comida_modelo.cantidad, comidas_del_dia_modelo.dia "
    query += "FROM comidas_del_dia_modelo, alimentos_comida_modelo "
    query += "WHERE comidas_del_dia_modelo.dieta_modelo = \"" + dieta + "\" AND comidas_del_dia_modelo.idcomidas_dia_modelo = "
    query += "alimentos_comida_modelo.comidas_modelo"

    connection.query(query, function (err, result) {
        if (err) throw err
        callback(result)
    });
}

function selectNameDietaModelo (connection, callback){
    connection.query('SELECT nombre FROM dieta_modelo', 
    function (err, rows, fields) {
        if (err) throw err;
        var data = []; 
        for (i = 0; i < rows.length; i++) {
            if (i < 5) {
                data.push(rows[i].nombre);
            }
        }
        callback(data);
    });
}


module.exports = { selectDietaModelo, selectNameDietaModelo }