
const { getConnection } = require('C:/Users/34658/Desktop/MyBalance/src/js/database');

const conn = getConnection()



class Usuario {


    constructor(nombre, gmail, suscripcion) {
      this.nombre = nombre;
      this.gmail = gmail;
      this.suscrito = suscripcion;
    }
  }

//SET INTERVALO
function TablaUsuarios(){

    var usuarios = [];

    let sql = 'SELECT * FROM view_users';
    conn.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }else{
     
        for (let i = 0; i < results.length; i++) {

            if(results[i].suscripcion != null){
              usuarios.push(new Usuario(results[i].nombre, results[i].email,true));
            }else{
              usuarios.push(new Usuario(results[i].nombre, results[i].email,false)); 
            }
          
        }
      
        var tr;
        for (var i = 0; i <  usuarios.length; i++) {
          if(usuarios[i].suscrito == true){
            tr = $('<tr/>');
            tr.append("<td class=\"table-warning\">" + usuarios[i].nombre + "</td>");
            tr.append("<td class=\"table-warning\">" + usuarios[i].gmail + "</td>");
            tr.append("<td>" + "<button class=\"buttonTable\" id=\"AsignarDieta\">Asignar dieta</button>" + "</td>");
            $('table').first().append(tr);
          }
        }  

    }

    });

}



$(document).ready(function(){
    TablaUsuarios();

    // setInterval(TablaUsuarios(), 3000);
});


