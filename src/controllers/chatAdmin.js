const { getConnection } = require('../../../src/database/database');
const conn = getConnection();
const { app } = require('../../../src/controllers/expressApp.js');
const { insertMessageAdmin, selectMessagesAdmin} = require('../../../src/models/mensajes.js');

var usuario

app.listen(8000, () => {
    console.log("Sever is Running");
})



app.get("/api/insertMessageAdmin", (req, res) => {
    insertMessageUser(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});


app.get("/api/selectMessagesAdmin", (req, res) => {
    selectMessages(
        conn,
        req.query.nombre,
        (result) => {
            res.json(result);
        }
    );
});


$(document).ready(function () {
    var param = window.location.search.substr(1);
    var listaParametros = param.split('&');
    console.log(listaParametros)
    usuario = listaParametros[0].split('=');
});
