//LET
let  logIn = document.getElementById('iniciar-sesion');
let  contraseñaLog = document.getElementById('contraseñaLogIn');
let  emailLog = document.getElementById("emailLogIn")
//const { BrowserWindow } = require('@electron/remote')
const {ipcRenderer} = require('electron');
const { dbox } = require('../js/popup');
//const remote = require('@electron/remote')
//const app = require('electron').remote.app
const path = require('path');
const { app } = require('../js/renderApp.js');
const bcrypt = require("bcryptjs");
const { selectAdmin, selectUsuario, createUser } = require('../models/user')

const { getConnection } = require('../js/database');

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


app.get('/api/selectAdmin', (req, res)  => {
    selectAdmin(
        conn,
        req.query.email,
        (result) => {
          res.json(result);
        }
      );
});



function ValidateUser(user){
    
    try{
        
        $.getJSON('http://localhost:8000/api/selectAdmin?email=' + user.email).done(function (result) {
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
                $.getJSON('http://localhost:8000/api/selectUsuario?email=' + user.email).done(function (result) {
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
                                    localStorage.setItem('edad', result[0].edad);
                                    localStorage.setItem('sexo', result[0].sexo);
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
                });
            }
        })

                             
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
