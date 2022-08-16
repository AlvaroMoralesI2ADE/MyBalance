const { app } = require('../../../src/controllers/expressApp');
const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');
const { selectAdmin, selectUsuario, createUser } = require('../../../src/models/user')

const { getConnection } = require('../../../src/database/database');
let recuperarContraseña = document.getElementById('recuperarContraseñaId');
const { dbox } = require('../../../src/views/js/popup.js');

const conn = getConnection()


app.listen(8000, () => {
    console.log("Sever is Running");
})


app.get("/api/selectUsuario", (req, res) => {
    selectUsuario(
      conn,
      req.query.email,
      (result) => {
        res.json(result);
      }
    );
});


recuperarContraseña.addEventListener('submit', (e) => {
    e.preventDefault();
    try{
        let email = document.getElementById('email');
        //$.getJSON('http://localhost:8000/api/selectUsuario?email=' + email.value).done(function (result) {
           // if(result.length > 0){
                let gmail = email.value           
                var token = randtoken.generate(20);
                sendEmailPrueba(gmail, token)
          //  }else{dbox('El email no esta registrado en nuestra base de datos');} 
            
            email.value = ""       
        //});



    }catch(error){
        console.log(error)
    }
})


function sendEmailPrueba(email, token) {
    var email = email;
    var token = token;
    
   
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mybalancenutricion@gmail.com', 
            pass: 'ohhz vnwz pczo yuvn'
        }
    });
    
 
    var mailOptions = {
        from: 'mybalancenutricion@gmail.com',
        to: email,
        subject: 'Reset Password Link - My Balance',
        html: '<p>Entra a este link para recuperar tu contraseña <a href="http://localhost:4000/reset-password?token=' + token + '">link</a></p>'
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            dbox("Ha ocurrido un error")
        } else {
            dbox("Hemos enviado un correo a " + email + " para que puedas recuperar tu contraseña")
        }
    });
}

 
    