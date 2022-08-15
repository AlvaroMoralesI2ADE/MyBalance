const { getConnection } = require('../../../src/database/database');
const conn = getConnection();
const { app } = require('../../../src/controllers/expressApp.js');
const Mensaje  = require('../../../src/controllers/mensaje.js');
const { insertMessageUser, selectMessagesUser, selectMessagesAdmin, insertMessageAdmin, updateVistosMensajes} = require('../../../src/models/mensajes.js');
const { dbox } = require('../../../src/views/js/popup.js');
const bcrypt = require("bcryptjs");
var mensajes = []
var usuario


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




app.get("/api/updateVistosMensajes", (req, res) => {
    updateVistosMensajes(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});


app.get("/api/insertMessageAdmin", (req, res) => {
    insertMessageAdmin(
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





function prepareMessages(usuario, isUser){
    console.log(usuario)
    $.getJSON('http://localhost:8000/api/selectMessagesUser?nombre=' + usuario).done(function (results) {
        console.log(results)
        if (results.length > 0) {
            results.forEach(mens => {
                if(isUser){
                    mensajes.push(new Mensaje(mens.mensaje, new Date(mens.fecha) , true))
                }else{
                    mensajes.push(new Mensaje(mens.mensaje, new Date(mens.fecha) , false))
                }
              });
        }

        $.getJSON('http://localhost:8000/api/selectMessagesAdmin?nombre=' + usuario).done(function (results) {
            if (results.length > 0) {
                results.forEach(mens => {
                    if(isUser){
                        mensajes.push(new Mensaje(mens.mensaje, new Date(mens.fecha) , false))
                    }else{
                        mensajes.push(new Mensaje(mens.mensaje, new Date(mens.fecha) , true))
                    }
                });
            }

            if(mensajes.length > 0){
                mensajes.sort( function( a , b){
                    if(a.fecha > b.fecha) return 1;
                    if(a.fecha < b.fecha) return -1;
                    return 0;
                });
                
             
             
                mensajes.forEach(element => {
                    console.log(element)
                    if(element.enviado == true){
                        sendMessageRender(element.mensaje, element.fecha)
                    }else{
                        receivedMessageRender(element.mensaje, element.fecha)
                    }
                });
            }
        
        });
    });
}



    /*
   
    */




function sendMessage(){
    var input = document.getElementById("replyText");
    var message = input.value;
    
    if(message != ""){
        console.log(message)
        d = new Date()
        let request = "http://localhost:8000/api/insertMessageUser?email=" + usuario
        request += "&mensaje=" + message
       
       
        $.getJSON(request).done(function (results) {
            if(results){
                sendMessageRender(message, d)
            }else{
                dbox("Ha ocurrido un error al enviar el mensaje")
            }
            
                 
        });
    }


}






function sendMessageAdmin(){
    var input = document.getElementById("replyText");
    var message = input.value;
    
    if(message != ""){
        d = new Date()
        let request = "http://localhost:8000/api/insertMessageAdmin?email=" + usuario
        request += "&mensaje=" + message
       
       
        $.getJSON(request).done(function (results) {
            if(results){
                sendMessageRender(message, d)
            }else{
                dbox("Ha ocurrido un error al enviar el mensaje")
            }
            
                 
        });
    }
}


function marcarComoVisto(usuario){
    try{
        let request = "http://localhost:8000/api/updateVistosMensajes?email=" + usuario

        $.getJSON(request).done(function (results) {
            if(results){
                
            }else{
                dbox("Ha ocurrido un error")
            }
            
                 
        });
    }catch(err){
        console.log(err)
    }
}