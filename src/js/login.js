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


        var sqlQuery = "SELECT * FROM usuarios WHERE email=?"

        conn.query(sqlQuery, [user.email], (error,result,fields) => {
            if(error){
                console.log(error);
            }else{
                if(result.length > 0){
                    const contraseñaDB = result[0]["contraseña"];            
                    bcrypt.compare(user.contraseña, contraseñaDB , (err, coinciden) => {
                  
                        if (err) {
                            console.log("Error comprobando:", err);
                        } else {
                            if(coinciden){
                                window.location.href = "../html/sessionMain.html";
                            }
                            else{
                                console.log("La contraseña es incorrecta");
                            }
                        }
                    });
                   
                    //ipcRenderer.send('open-new-window', '../html/sessionMain');
                    
                    //var win = remote.getCurrentWindow();
                    //win.close()
                    //win.loadFile(path.join(__dirname, '../html/sessionMain.html'))
                }else{
                    console.log("El email no existe en nuestra base de datos");
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
