//LET
let  logIn = document.getElementById('iniciar-sesion');
let  contraseñaLog = document.getElementById('contraseñaLogIn');
let  emailLog = document.getElementById("emailLogIn")
//const { BrowserWindow } = require('@electron/remote')
const {ipcRenderer} = require('electron');
const { dbox } = require('C:/Users/34658/Desktop/MyBalance/src/js/popup');
//const remote = require('@electron/remote')
//const app = require('electron').remote.app
const path = require('path');



function ValidateUser(user){
    
    try{

        
        var sqlQueryAdmin = "SELECT * FROM administradores WHERE gmail=?";
        conn.query(sqlQueryAdmin, [user.email], (error,result,fields) => {
            if(error){
                dbox(error);
            }else{
                if(result.length > 0){
                    var contraseñaAdmin = result[0]["contraseña"]; 
                    console.log(contraseñaAdmin) ;
                    console.log(user.contraseña);
                    bcrypt.compare(user.contraseña, contraseñaAdmin, (err, coinciden) => {

                        if (err) {
                            dbox(err);
                        } else {
                            if (coinciden) {
                                localStorage.setItem('admin', user.email);
                                window.location.href = "../html/adminMain.html";
                            } else {
                                dbox('La contraseña es incorrecta');
                            }
                        }
                    });

                }else{
                    var sqlQuery = "SELECT * FROM usuarios WHERE email=?"
                    conn.query(sqlQuery, [user.email], (error,result,fields) => {
                        if(error){
                            dbox(error);
                        }else{
                            if(result.length > 0){
                                var contraseñaDB = result[0]["contraseña"]; 
                                console.log(contraseñaDB) ;
                                bcrypt.compare(user.contraseña, contraseñaDB, (err, coinciden) => {
                                    if (err) {
                                        dbox(err);
                                    } else {
                                        if (coinciden) {
                                            localStorage.setItem('user', user.email);
                                            localStorage.setItem('altura', result[0].altura);
                                            localStorage.setItem('peso', result[0].peso);
                                            localStorage.setItem('nombre', result[0].nombre);
                                            localStorage.setItem('tipo', result[0].tipoAlimentacion);
                                            //COGER ALIMENTOS?

                                            window.location.href = "../html/sessionMain.html";
                                        }
                                        else {
                                            dbox('La contraseña es incorrecta');
                                        }
                                    }
                                });
                            }else{dbox('El email no esta registrado en nuestra base de datos');}        
                        }
                    });
                }
            }
        });


        
                         
        }catch(error){
            console.log(error);
        }

}


logIn.addEventListener('submit', (e) => {
    e.preventDefault();

    
    try{
        const user = {
            email: emailLog.value,
            contraseña: contraseñaLog.value
        }

        ValidateUser(user)
    }catch(error){
        console.log(error)
    }

    
    
})
