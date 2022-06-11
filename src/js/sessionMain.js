const set = document.getElementById('setSuscripcion');
const { getConnection } = require('C:/Users/34658/Desktop/MyBalance/src/js/database');
const { usuario } = require('./MyBalance/src/js/user')
const conn = getConnection();

let button = document.getElementById('suscribirse');


$(document).ready(function(){
   
    try{
      
      
        var a=   localStorage.getItem('altura');
        var p =localStorage.getItem('peso');
        var n = localStorage.getItem('nombre');
        var t = localStorage.getItem('tipo');

        console.log(a + " " + p + " " + n + " " + t);

        
        var user = localStorage.getItem('user');  
       /*
        var sqlQueryAdmin = "SELECT usuario AS email, caducada FROM suscripcion WHERE usuario = ?";
       
        conn.query(sqlQueryAdmin, user, (error,result,fields) => {
            if(error){
                dbox(error);
            }else{
                console.log(result);
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
*/

        
                         
        }catch(error){
            dbox(error);
        }








});




//COMPROBAR SI TIENE SUSCRIPCION





