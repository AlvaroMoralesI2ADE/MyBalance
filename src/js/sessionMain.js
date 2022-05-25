const set = document.getElementById('setSuscripcion');
const { getConnection } = require('C:/Users/34658/Desktop/MyBalance/src/js/database');

const conn = getConnection();



set?.addEventListener('click', () => {
    console.log("ola");
    setSuscripcion();
})




function setSuscripcion() {
    var email = "alvaro@gmail.com";
    console.log("ola");
    var sqlQuery = "UPDATE usuarios SET suscripcion = (SELECT tipoSuscripcion FROM suscripcion where tipoSuscripcion = 'mensual') WHERE email = ?" ;
    conn.query(sqlQuery,email,function (err, result) {
        if (err){
            alert(err);
        }else{
            console.log("funsiono");
        }

        
      });

}
//AQUI HACER UN SET 
/*
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


                    */