const logIn = document.getElementById('iniciar-sesion');
const contraseñaLog = document.getElementById('contraseñaLogIn');
const emailLog = document.getElementById("emailLogIn")
//const { BrowserWindow } = require('@electron/remote')
const {ipcRenderer} = require('electron');

//const remote = require('@electron/remote')
//const app = require('electron').remote.app
const path = require('path');



function ValidateUser(user){
    
    try{

        var sqlQueryAdmin = "SELECT * FROM administradores WHERE gmail=?";
        conn.query(sqlQueryAdmin, [user.email], (error,result,fields) => {
            if(error){
                alert(error);
            }else{
                if(result.length > 0){
                    var contraseñaAdmin = result[0]["contraseña"]; 
                    console.log(contraseñaAdmin) ;
                    console.log(user.contraseña);
                    bcrypt.compare(user.contraseña, contraseñaAdmin, (err, coinciden) => {

                        if (err) {
                            alert(err);
                        } else {
                            if (coinciden) {
                                window.location.href = "../html/adminMain.html";
                            } else {
                                alert('La contraseña es incorrecta');
                            }
                        }
                    });

                }else{
                    var sqlQuery = "SELECT * FROM usuarios WHERE email=?"
                    conn.query(sqlQuery, [user.email], (error,result,fields) => {
                        if(error){
                            alert(error);
                        }else{
                            if(result.length > 0){
                                var contraseñaDB = result[0]["contraseña"]; 
                                console.log(contraseñaDB) ;
                                bcrypt.compare(user.contraseña, contraseñaDB, (err, coinciden) => {
                                    if (err) {
                                        alert(err);
                                    } else {
                                        if (coinciden) {
                                            window.location.href = "../html/sessionMain.html";
                                        }
                                        else {
                                            alert('La contraseña es incorrecta');
                                        }
                                    }
                                });
                            }else{alert('El email no esta registrado en nuestra base de datos');}        
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
