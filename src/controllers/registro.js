const usuario = document.getElementById("usuarioRegistro")
const email = document.getElementById("emailRegistro")
const contraseña = document.getElementById("contraseñaRegistro")
const contraseña2 = document.getElementById("contraseñaRepRegistro")
const nombreUsuario = document.getElementById("usuarioRegistro")
const registrar = document.getElementById('registrarse');
var nodemailer = require('nodemailer')







function sendEmail(email, password, nombre) {
    var email = email;
    
   
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mybalancenutricion@gmail.com', 
            pass: 'ohhz vnwz pczo yuvn'
        }
    });
    
    let request = 'http://localhost:8000/verifyAccount?email=' + email + '&password=' + password + '&nombre=' + nombre
    var mailOptions = {
        from: 'mybalancenutricion@gmail.com',
        to: email,
        subject: 'Verificación crear cuenta- My Balance',
        html: '<p>Pulsa este link para suscribirte a My Balance <a href="' + request + '" >link</a></p>'
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            dbox("Ha ocurrido un error")
        } else {
            dbox("Hemos enviado un correo a " + email + " para que puedas verificar tu cuenta")
        }
    });
}

 
    



//HAY QUE HACER UNNA VALIDACION DE CONTRASEÑ
//VER SI ES SEGURA Y ESAS COSAS




registrar.addEventListener('submit', (e) => {
    e.preventDefault();
    

    try{
        if(Validation()){
            $.getJSON('http://localhost:8000/api/selectUsuario?email=' + email.value).done(function (result) {
                
                if(result.length > 0){
                    dbox('El email ya esta registrado en nuestra base de datos');
                }else{
                    var contraseñaEncriptada = bcrypt.hashSync(contraseña.value,10); //encriptamos la contraseña
                    sendEmail(email.value, contraseñaEncriptada, usuario.value)
                }
            });              
        }
    }catch(error){
        dbox(error);
    }
  
})






 
//VALIDACION

function ValidateEmail(inputText)
{

    var correct = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat))
    {
        correct = true;
    }
   
    return correct;
}



function ContraseñasCoinciden(){
    var correcto = false;
   
    if(contraseña.value.length > 0){
        if(contraseña2.value  == contraseña.value){
            correcto = true;
        }else{
            dbox("Las contraseñas no coinciden")
        }
    }

    return correcto;

}





function Validation(){

    var correcto = true;
    let errors = [];
    // También una variable para poner foco al primer campo que tenga error
    let input = false;
   

    //BUSCAR EL EMAIL EN LA BASE DE DATOS




    if(nombreUsuario.value.length <= 3 || nombreUsuario.value.length >= 20) {
                errors.push("Usuario: El nombre usuario debe tener entre 4 y 19 caracteres...");
                input = usuario;
    }

    
    if(!ContraseñasCoinciden()){
        errors.push("Las contraseñas no coinciden...");
        input = contraseña;
    }

    if(!ValidateEmail(email)){
        errors.push("El email no tiene formato correcto...");
        input = email;
    }
 
    if(errors.length > 0) { 
        dbox('Errores en formulario, por favor corrija:<br>' + errors.join('<br>'));
        input.focus();
        correcto = false;

    }


    
    

    return correcto;
    

}




