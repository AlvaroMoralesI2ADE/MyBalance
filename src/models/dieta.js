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



function selectDietaNombre(connection, param, callback) {
    try {
        let query = "SELECT * FROM mybalance.dieta "
        query += "LEFT JOIN mybalance.comidas_del_dia "
        query += "ON mybalance.dieta.dieta = mybalance.comidas_del_dia.dieta "
        query += "WHERE mybalance.dieta.dieta  = '" + param + "'"
  
        console.log(query)
        connection.query(query, param, function (err, result) {
            if (err) throw err
            callback(result)
        });
    } catch (err) {
        console.log(err)
    }
}







function createDieta(connection, param, callback){
    try{
        let nombreD = param.nombre
        let fecha_inicio = param.fechaI
        let suscripcion = param.suscripcion
        let query = "INSERT INTO dieta (dieta,fecha_inicio,suscripcion) VALUES ('" + nombreD + "', '" + fecha_inicio + "', " + suscripcion + ");"
        connection.query(query, function (err, result) {
            if (err) throw err
            callback(true)
        });
    }catch(error){
        console.log(error)
    }


}



function createComidasDieta(connection, param, callback){
    let call = true

    try{
        console.log("ENTRA A CREAR LAS COMIDAS")
        let fechasArray = JSON.parse(param.fechas)

        let nombreD = param.nombre
        let sql = ""
        connection.beginTransaction(function(err) {
            if (err) {                  //Transaction Error (Rollback and release connection)
                connection.rollback()
                call = false
                console.log(err)
            } else {
                for(let i = 0; i < 7; i++){
                    sql = "INSERT INTO comidas_del_dia (dia, dieta) VALUES ('" + fechasArray[i] + "', \"" + nombreD + "\"); \n"
                   
                    console.log("ESTA HACIENDO LA INSERCION")
                    connection.query(sql, function(err, results) {
                        if (err) {          //Query Error (Rollback and release connection)
                            conn.rollback()
                            call = false
                            console.log(err + "\n" + sql)
                        }else{
                            connection.commit(function(err) {
                                if (err) {
                                    conn.rollback()
                                    call = false
                                    console.log(err)
                                } 
                            });
                        }
                    });
                }
            }
        });
      
      
    }catch(error){
        console.log(error)
      
    }finally{
        callback(call)
    }
}




function transactionInsertAlimentosDieta(connection, params, callback) {
    let call = true
    try {
        console.log("ENTRA A LA TRANSAC ALIMENTOS")
        let alimentos = JSON.parse(params.alimentos)
        connection.beginTransaction(function(err) {
            if (err) {                  //Transaction Error (Rollback and release connection)
                connection.rollback()
                call = false
                console.log(err)
            } else {
                alimentos.forEach(alim => {
                    let sql = ""
                    let alimentoNombre = alim.alimento.split("-")
                    if(alim.eliminar == true){
                        let queryDelet = "(SELECT idcomidas_dia FROM comidas_del_dia WHERE comidas_del_dia.dieta = \"" + params.nombre + "\" "
                        queryDelet  += "AND comidas_del_dia.dia  = '" + alim.dia + "')"
                        sql = "DELETE FROM alimentos_comidas WHERE alimentos_comidas.comida = " + queryDelet + " AND "
                        sql += "alimentos_comidas.alimento = \"" + alimentoNombre[0] + "\"  AND alimentos_comidas.tipo = \"" + alim.tipo + "\""
                    }else{
                        sql  += "INSERT INTO alimentos_comidas (tipo, alimento, cantidad, consumido, modificar, comida) "
                        sql  += "VALUES (\"" + alim.tipo + "\", \"" + alimentoNombre[0] + "\", \"" + alim.cantidad + "\", "
                        sql +=  " 0, 0, "
                        sql  += "(SELECT idcomidas_dia FROM comidas_del_dia WHERE comidas_del_dia.dieta = \"" + params.nombre + "\" AND "
                        sql  += "comidas_del_dia.dia = '" + alim.dia + "')); \n"
                    }
               
                    connection.query(sql, function(err, results) {
                        if (err) {          //Query Error (Rollback and release connection)
                            connection.rollback()
                            call = false
                        
                       
                        }else{
                            connection.commit(function(err) {
                                if (err) {
                                    connection.rollback()
                                    call = false
                                    console.log(err + "\n" + sql)
                          
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









module.exports = {selectDieta, selectDietaNombre, createComidasDieta, createDieta, transactionInsertAlimentosDieta}