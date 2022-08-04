const usuario = document.getElementById("usuarioRegistro")
const email = document.getElementById("emailRegistro")
const contraseña = document.getElementById("contraseñaRegistro")
const contraseña2 = document.getElementById("contraseñaRepRegistro")
const nombreUsuario = document.getElementById("usuarioRegistro")
const bcrypt = require("bcryptjs");

const registrar = document.getElementById('registrarse');

const { getConnection } = require('./../../src/js/database');

const conn = getConnection()

function createUser(user){
        var sqlQuery = 'INSERT INTO usuarios SET?'
        conn.query(sqlQuery, user, (error,result,fields) => {
            if(error){
                dbox(error);
            }else{
                dbox("Usuario registrado en nuestra base de datos");
            }
          
        });

        /*
        new Notification({
            title:"Registro",
            body: 'Usuario registrado'
        }).show();
*/
        
    

}



//HAY QUE HACER UNNA VALIDACION DE CONTRASEÑ
//VER SI ES SEGURA Y ESAS COSAS




registrar.addEventListener('submit', (e) => {
    e.preventDefault();
    

    try{
        if(Validation()){
            var sqlQuery = "SELECT * FROM usuarios WHERE email=?";
            conn.query(sqlQuery, email.value,(error,result,fields) => {
                if(error){
                    errors.push(error);
                }else{

                    
                    if(result.length > 0){
                        dbox('El email ya esta registrado en nuestra base de datos');
                    }else{
                        var contraseñaEncriptada = bcrypt.hashSync(contraseña.value,10); //encriptamos la contraseña
                        const newUser = {
                            email: email.value,
                            nombre: usuario.value,
                            contraseña: contraseñaEncriptada
                        }
                        createUser(newUser)
                    }
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