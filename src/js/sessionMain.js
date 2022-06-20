const set = document.getElementById('setSuscripcion');
const { getConnection } = require('./../../src/js/database');
const Usuario = require('./../../src/js/user');

const conn = getConnection();
const { dbox } = require('./../../src/js/popup');

let button = document.getElementById('suscribirse');


$(document).ready(function(){
   
    try{
      
        var user = new Usuario( localStorage.getItem('user'), localStorage.getItem('nombre'),
        localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), "")
   
 

        var sqlQueryAdmin = "SELECT usuario AS email, caducada FROM suscripcion WHERE usuario = ?";
       
        conn.query(sqlQueryAdmin, user.email, (error,result,fields) => {
            if(error){
                dbox(error);
            }else{
                if(result.length > 0){
                    var suscripcionVigente = false;
                    for(i = 0; i < result.length; i++){
                        if(result[i].caducada == 0){
                            suscripcionVigente = true;
                        }
                    }

                    if(suscripcionVigente){
                        button.style.display = "none";

                    }else{
                      
                    }
                    

                }else{
                   
                   

                }
             
            }
        });


  
                         
        }catch(error){
            dbox(error);
        }








});




//COMPROBAR SI TIENE SUSCRIPCION





