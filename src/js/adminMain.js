
const { getConnection } = require('./../..//src/js/database');

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

    let sql = 'SELECT email, nombre, suscripcion.caducada FROM usuarios , suscripcion WhERE usuarios.email = suscripcion.usuario AND caducada = FALSE';
    conn.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }else{
      console.log(results);
      var tr;
      for (let i = 0; i < results.length; i++) {
        tr = $('<tr/>');
        tr.append("<td class=\"table-warning\">" + results[i].nombre + "</td>");
        tr.append("<td class=\"table-warning\">" + results[i].email + "</td>");
        tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + results[i].email  +  "\">Asignar dieta</a>" + "</td>");
        $('table').first().append(tr);
      }
    }

    });

}









$(document).ready(function(){
    TablaUsuarios();

    // setInterval(TablaUsuarios(), 3000);
});


