const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
let recuperarContraseña = document.getElementById('recuperarContraseñaId');



recuperarContraseña.addEventListener('submit', (e) => {
    e.preventDefault();
    try{
        let email = document.getElementById('email');
        $.getJSON('http://localhost:8000/api/selectUsuario?email=' + email.value).done(function (result) {
            if(result.length > 0){
                let gmail = email.value           
                sendEmailPrueba(gmail)
            }else{dbox('El email no esta registrado en nuestra base de datos');} 
            
            email.value = ""       
        });
    }catch(error){
        console.log(error)
    }
})


function sendEmailPrueba(email) {
    var email = email;
    
   
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
        html: '<p>Entra a este link para recuperar tu contraseña <a href="http://localhost:8000/reset-password?email=' + email + '">link</a></p>'
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            dbox("Ha ocurrido un error")
        } else {
            dbox("Hemos enviado un correo a " + email + " para que puedas recuperar tu contraseña")
        }
    });
}

 
    