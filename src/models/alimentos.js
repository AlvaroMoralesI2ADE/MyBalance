
const mysql = require("mysql")


function selectAlimento(connection, alimento, callback){
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



module.exports = {selectAlimento}