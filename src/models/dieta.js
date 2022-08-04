const mysql = require("mysql")

function selectDieta(connection, callback){
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



module.exports = {selectDieta}