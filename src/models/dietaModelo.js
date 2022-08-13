const mysql = require('mysql');

function selectDietaModelo(connection, dieta, callback) {
    try {
        let query = "SELECT alimentos_comida_modelo.alimentos, alimentos_comida_modelo.tipo,"
        query += "alimentos_comida_modelo.cantidad, comidas_del_dia_modelo.dia "
        query += "FROM comidas_del_dia_modelo, alimentos_comida_modelo "
        query += "WHERE comidas_del_dia_modelo.dieta_modelo = \"" + dieta + "\" AND comidas_del_dia_modelo.idcomidas_dia_modelo = "
        query += "alimentos_comida_modelo.comidas_modelo"

        connection.query(query, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)
    }
}


function selectNameDietaModelo(connection, dieta ,callback) {
    try {
        connection.query('SELECT nombre FROM dieta_modelo WHERE nombre LIKE "%' + dieta + '%"',
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
    } catch (err) {
        console.log(err)
    }
}





function selectDietaModeloName(connection, param, callback) {
    try {
        let query = "SELECT nombre FROM dieta_modelo WHERE nombre = '" + param + "'"
        connection.query(query, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)
    }
}







function createDietaModelo(connection, param, callback){
    try{
        let query = "INSERT INTO dieta_modelo (nombre) VALUES (\"" + param + "\"); \n"
        connection.query(query, function (err, result) {
            if (err) throw err
            callback(true)
        });
    }catch(error){
        console.log(error)
    }


}

function createComidasDietaModelo(connection, param, callback){
    let call = true
    try{
        connection.beginTransaction(function(err) {
            if (err) {                  //Transaction Error (Rollback and release connection)
                connection.rollback()
                call = false
            } else {
                let sql = ""
                for(let i = 1; i <= 7; i++){
                    sql = "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo) VALUES (" + i + ", \"" + param + "\");"
                    console.log("ESTA HACIENDO TRANSACCIONES")
                    connection.query(sql, function(err, results) {
                        if (err) {          //Query Error (Rollback and release connection)
                            conn.rollback()
                            call = false
                        }else{
                            connection.commit(function(err) {
                                if (err) {
                                    conn.rollback()
                                    call = false
                                } 
                            });
                        }
                    });
                }
            }
        
        });
      
    }catch(error){
        console.log(error)
        callback(call)
    }finally {
        console.log("ENTRA ANTESS")
        callback(call)
    }
}



function transactionInsertAlimentosDietaModelo(connection, params, callback) {
    let call = true
    try {
        let comidas = JSON.parse(params.array)
        let nombre = params.nombre
        let attributes = ["tipo", "alimentos", "cantidad", "comidas_modelo"];
        let attributes_list = attributes.join(",");

        connection.beginTransaction(function(err) {
            if (err) {                  //Transaction Error (Rollback and release connection)
                connection.rollback()
                call = false
                console.log("error1")
            } else {
                comidas.forEach(alim => {
                    let sql = ""
                    let values = alim._alimentos.map(
                        element => {
                            let array = element._alimento.split("-")
                            let querySelect = ""
                            querySelect += "(SELECT idcomidas_dia_modelo FROM comidas_del_dia_modelo WHERE comidas_del_dia_modelo.dieta_modelo=\""
                            querySelect += nombre + "\" AND comidas_del_dia_modelo.dia = " + alim._dia + ")"
                            attributes = ["\"" + alim._tipo + "\"", "\"" + array[0] + "\"", "\"" + element._cantidad + "\"", querySelect]
                            return "(" + attributes.join(",") + ")";
                        }
                    ).join(",\n");
                    sql = `INSERT INTO alimentos_comida_modelo(${attributes_list}) VALUES ${values};`;
                    console.log(sql)
                    connection.query(sql, function(err, results) {
                        if (err) {          //Query Error (Rollback and release connection)
                            connection.rollback()
                            call = false
                            console.log(err)
                            console.log("error2")
                        }else{
                            connection.commit(function(err) {
                                if (err) {
                                    connection.rollback()
                                    call = false
                                    console.log("error3")
                                } 
                            });
                        }
                    });
                });
                callback(call)
                
            }
        });
       
    } catch (err) {
        console.log(err)
        callback(false)
    }  
}


module.exports = { selectDietaModelo, selectNameDietaModelo, transactionInsertAlimentosDietaModelo, createDietaModelo, createComidasDietaModelo, selectDietaModeloName}