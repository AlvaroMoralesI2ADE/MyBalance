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

        console.log("entra");
        const sqlQuery = "SELECT * FROM usuarios WHERE email=? AND contraseña=?"

        conn.query(sqlQuery, [user.email, user.contraseña], (error,results,fields) => {
            if(error){
                console.log("NO");
            }

            if(results.length > 0){

                window.location.href = "../html/sessionMain.html";
                //ipcRenderer.send('open-new-window', '../html/sessionMain');
                
                //var win = remote.getCurrentWindow();
                //win.close()
                //win.loadFile(path.join(__dirname, '../html/sessionMain.html'));
            }else{
               
                


               /*
                new Notification({
                    title:"login",
                    body: 'email'
                }).show()*/
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
