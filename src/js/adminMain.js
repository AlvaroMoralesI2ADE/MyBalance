
const { getConnection } = require('./../../src/js/database');


const { dbox } = require('./../../src/js/popup.js');


const conn = getConnection()



class Usuario {


    constructor(nombre, gmail, suscripcion, inicio, final) {
      this.nombre = nombre;
      this.gmail = gmail;
      this.suscrito = suscripcion;
      this.fechaInicio = inicio;
      this.fechaFinal = final;
    }
  }

//SET INTERVALO
function TablaUsuarios(){
    try{
      var usuarios = [];

      let sql = 'SELECT email, nombre, fecha_inicio, fecha_fin, suscripcion.idsuscripcion, suscripcion.caducada FROM usuarios , suscripcion WhERE usuarios.email = suscripcion.usuario AND caducada = FALSE';
      let sqlD = "SELECT dieta, fecha_inicio, fecha_fin "
      sqlD += "FROM dieta "
      sqlD += "WHERE dieta.suscripcion = ? ORDER BY fecha_inicio ASC"
      
      conn.query(sql, (error, results, fields) => {
      if (error) {
          return console.error(error.message);
      }else{
        console.log(results);
        var tr;
        for (let i = 0; i < results.length; i++) {
          conn.query(sqlD, results[i].idsuscripcion, (error, dieta, fields) => {
            if(error){
              console.log(error)
            }else{
              tr = $('<tr/>');
              let fechaInicio = results[i].fecha_inicio
              let fechaFin = results[i].fecha_fin
              let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear() 
         
              if(dieta.length > 0){
                tr.append("<td class=\"table-warning\">" + results[i].nombre + "</td>");
                tr.append("<td class=\"table-warning\">" + results[i].email + "</td>");
                tr.append("<td class=\"table-warning\">" +  fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear() + "</td>");
                tr.append("<td class=\"table-warning\">" +  fechaFin.getDate().toString().padStart(2, "0") + "-" + (fechaFin.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaFin.getFullYear() + "</td>");      
           
                tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + results[i].email  + "&idSuscripcion=" + fechaInicioFormat  + "&suscripcion=" + results[i].idsuscripcion + "\">Modificar dieta</a>" + "</td>");
                $('table').first().append(tr);
              }else{
                tr.prepend("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + results[i].email  + "&idSuscripcion=" + fechaInicioFormat  + "&suscripcion=" + results[i].idsuscripcion + "\">Asignar dieta</a>" + "</td>");
                $('table').first().prepend(tr);
                tr.prepend("<td class=\"table-warning\">" +  fechaFin.getDate().toString().padStart(2, "0") + "-" + (fechaFin.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaFin.getFullYear() + "</td>");      
                tr.prepend("<td class=\"table-warning\">" +  fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear() + "</td>");
                tr.prepend("<td class=\"table-warning\">" + results[i].email + "</td>");
                tr.prepend("<td class=\"table-warning\">" + results[i].nombre + "</td>");
              }
    
            }
   
          });
        }
      }
    });
    }catch(error){
      dbox(error)
    }

}




$(document).ready(function(){
    TablaUsuarios();
});


