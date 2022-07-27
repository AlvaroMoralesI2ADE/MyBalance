const set = document.getElementById('setSuscripcion')
const { getConnection } = require('./../../src/js/database')
const Usuario = require('./../../src/js/user')

const conn = getConnection();
const { dbox } = require('./../../src/js/popup')

let buttonSus = document.getElementById('botonSus')

let head = document.getElementById('header')

let fechasArray = []




$(document).ready(function(){
    try{     
        var user = new Usuario( localStorage.getItem('user'), localStorage.getItem('nombre'),
        localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), "")
   

        /*
        var sqlQueryAdmin = "SELECT dieta.fecha_inicio, suscripcion.caducada, suscripcion.idsuscripcion "
        sqlQueryAdmin += "FROM suscripcion, dieta "
        sqlQueryAdmin += "WHERE dieta.suscripcion = idsuscripcion AND "
        sqlQueryAdmin += "suscripcion.usuario = ? "
        sqlQueryAdmin += "AND (SELECT curdate()) <= dieta.fecha_fin "
        sqlQueryAdmin += "ORDER BY fecha_inicio ASC"*/

        var sqlQueryAdmin = "SELECT suscripcion.caducada, suscripcion.idsuscripcion, suscripcion.fecha_inicio "
        sqlQueryAdmin += "FROM suscripcion "
        sqlQueryAdmin += "WHERE "
        sqlQueryAdmin += "suscripcion.usuario = ? "
        sqlQueryAdmin += "AND (SELECT curdate()) <= suscripcion.fecha_fin "
        sqlQueryAdmin += "ORDER BY suscripcion.fecha_inicio ASC"
        

        conn.query(sqlQueryAdmin, user.email, (error,result,fields) => {
            if(error){
                dbox(error);
                console.log(error)
            }else{
                if(result.length > 0){
                    var suscripcionVigente = false;
                  
              
                    for(i = 0; i < result.length; i++){
                        if(result[i].caducada == 0){
                            suscripcionVigente = true;
                        }
                    }

                    if(suscripcionVigente){
                        let fechaInicio = result[0].fecha_inicio
                        let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()                    
                        console.log(fechaInicioFormat)
                        window.location.href = "miDieta.html?suscripcion=" + result[0].idsuscripcion + "&fechaInicio=" + fechaInicioFormat 
                     
                    }else{
                        buttonSus.innerHTML += "<a class=\"botonComenzar\" id = \"suscribirse\" href=\"suscripcion.html\">suscripcion</a>"
                        //INSTRUCCIONES
                    }
                }else{
                    buttonSus.innerHTML += "<a class=\"botonComenzar\" id = \"suscribirse\" href=\"suscripcion.html\">Suscribirse a mybalance</a>"
                }
             
            }
        });                         
        }catch(error){
            console.log(error)
            dbox(error);
        }
});


