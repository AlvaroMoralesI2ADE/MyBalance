const { getConnection } = require('../../../src/database/database');
const conn = getConnection();
const { app } = require('../../../src/controllers/expressApp.js');
const Mensaje  = require('../../../src/controllers/mensaje.js');
const { insertMessageUser, selectMessagesUser, selectMessagesAdmin} = require('../../../src/models/mensajes.js');
const { dbox } = require('../../../src/views/js/popup.js');
var usuario
var mensajes = []



app.listen(8000, () => {
    console.log("Sever is Running");
})



app.get("/api/insertMessageUser", (req, res) => {
    insertMessageUser(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});


app.get("/api/selectMessagesUser", (req, res) => {
    selectMessagesUser(
        conn,
        req.query.nombre,
        (result) => {
            res.json(result);
        }
    );
});



app.get("/api/selectMessagesAdmin", (req, res) => {
    selectMessagesAdmin(
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
    prepareMessages(usuario[1])
});



function prepareMessages(usuario){
    $.getJSON('http://localhost:8000/api/selectMessagesUser?nombre=' + usuario).done(function (results) {
        
        console.log(results)
        if (results.length > 0) {
            results.forEach(mens => {
                let d = new Date(mens.fecha)
                dFormat = [d.getMonth()+1,
                    d.getDate(),
                    d.getFullYear()].join('/')+' '+
                [d.getHours(),
                    d.getMinutes()
                    ].join(':');
                mensajes.push(new Mensaje(mens.mensaje, dFormat, true))
            });
        }

        $.getJSON('http://localhost:8000/api/selectMessagesAdmin?nombre=' + usuario).done(function (results) {
            if (results.length > 0) {
                results.forEach(mens => {
                let d = new Date(mens.fecha)
                dFormat = [d.getMonth()+1,
                    d.getDate(),
                    d.getFullYear()].join('/')+' '+
                [d.getHours(),
                    d.getMinutes()
                    ].join(':');
                    mensajes.push(new Mensaje(mens.mensaje,  dFormat, false))
                });
            }

            if(mensajes.length > 0){
                mensajes.forEach(element => {
                    console.log(element)
                    if(element.enviado == true){
                        receivedMessageRender(element.mensaje, element.fecha)
                        sendMessageRender(element.mensaje, element.fecha)
                    }else{
                        console.log("recibido")
                        receivedMessageRender(element.mensaje, element.fecha)
                    }
                });
            }
        
        });

        

    });
}



    /*
   
    */



/*
function sendMessage(){

    sendMessageRender(message)
   
    sendMessageRender(message, date)   
    var input = document.getElementById("replyText");
    var message = input.value;
    



}



let d = new Date()
    dFormat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes()
        ].join(':');*/