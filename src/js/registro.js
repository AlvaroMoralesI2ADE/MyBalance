const usuario = document.getElementById("usuarioRegistro")
const email = document.getElementById("emailRegistro")
const contraseña = document.getElementById("contraseñaRegistro")
const contraseña2 = document.getElementById("contraseñaRepRegistro")
const bcrypt = require("bcryptjs");


const registrar = document.getElementById('registrarse');

const { getConnection } = require('C:/Users/alvar/Desktop/TFG2/MyBalance/src/js/database');

const conn = getConnection()

function createUser(user){
    try{
      
        var result = conn.query('INSERT INTO usuarios SET?',user)
        console.log(result)

        /*
        new Notification({
            title:"Registro",
            body: 'Usuario registrado'
        }).show();

        */
       conn.end(function(){
    // La conexión se ha cerrado
        });


    }catch(error){
        console.log(error)
    }
}



//HAY QUE HACER UNNA VALIDACION DE CONTRASEÑ
//VER SI ES SEGURA Y ESAS COSAS




registrar.addEventListener('submit', (e) => {
    e.preventDefault();
    

    try{
        var contraseñaEncriptada = bcrypt.hashSync(contraseña.value,10); //encriptamos la contraseña
        console.log(contraseñaEncriptada)
        const newUser = {
            email: email.value,
            nombre: usuario.value,
            contraseña: contraseñaEncriptada
        }
        createUser(newUser)
    }catch(error){
        console.log(error);
    }
  
})












//VALIDACION CUANDO DE AL CLICK.

/*
function ValidateEmail(inputText)
{
    var correct = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat))
    {
        document.form1.text1.focus();
        correct = true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
    
    }


    return correct;
}
*/




function Validation(){

    if( ValidateEmail(inputText)){


        alert("OK");

    }else{
        alert("Error");
    }






}