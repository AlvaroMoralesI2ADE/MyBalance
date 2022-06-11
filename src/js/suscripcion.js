
const { getConnection } = require('C:/Users/34658/Desktop/MyBalance/src/js/database');
const conn = getConnection();
const { dbox } = require('C:/Users/34658/Desktop/MyBalance/src/js/popup');

var set = document.getElementById("setSuscripcion")

//IF TIENE SUSCRIPCION NO CADUCADA, PUES LO METES. CREO QUE HABRÍA QUE METER UN CAMPO DATEA

set.addEventListener('click', () => {
    checkInfo();
})





function checkInfo() {
    try{

        var email = localStorage.getItem('user');
        var sqlQuery = "SELECT * FROM usuarios WHERE email=?"
        conn.query(sqlQuery, email, (error,result,fields) => {
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
      


        
                         
        }catch(error){
            console.log(error);
        }




}



function setSuscripcion() {

    
    var email = localStorage.getItem('user');
    console.log(email);  
    /*
    var sqlQuery = "INSERT INTO suscripcion (usuario,caducada) VALUES (?,FALSE)" ;
    conn.query(sqlQuery,email,function (err, result) {
        if (err){
            dbox(err);
        }else{
            console.log("funciona");
        }
        
      });*/

}
