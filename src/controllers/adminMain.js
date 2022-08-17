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
function TablaUsuarios() {
  try {
    $.getJSON('http://localhost:8000/api/selectSuscVigentes').done(function (data) {
      if(data.length > 0){
        for (let i = 0; i < data.length; i++) {

            console.log(data[i].idsuscripcion)
             renderSuscripcion(data[i].fecha_inicioS, data[i].fecha_finS, 
              data[i].nombre, data[i].email, data[i].idsuscripcion,  data[i].dietaAsignada, data[i].Novistos, data[i].modificar)
      
        }
      }
    })
  } catch (error) {
    console.log(error)
    dbox(error)
  }
}



$(document).ready(function () {
  TablaUsuarios();
});


