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
      if (data.length > 0) {
        let dataMod = []
        let dataVer = []
        let cont = 0
        let pos = -1
        let dateNow = new Date()
        data.sort((a, b) => a.fecha_inicio > b.fecha_inicio)
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          cont++
          let fechaInicioFormat = data[i].fecha_inicioS
          console.log("entraaaa en else" + cont)
          if (data[i].fecha_inicio != null) {
            let fechaInicioFormatD = data[i].fecha_inicio
            let fechaInicioD = new Date(fechaInicioFormatD);
            let fechaInicioFormatSemana = fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear()
            let d = fechaInicioFormatSemana.split("-");
            var fechaInit = new Date(d[2] + '/' + d[1] + '/' + d[0]);


            if (fechaInit > dateNow) {
              if (data[i].dietaAsignada > 0 && data[i].modificar == 0) {
                dataVer.push(data[i])
              } else if (data[i].modificar > 0) {
                dataMod.push(data[i])
              } else {
                renderSuscripcion(fechaInicioFormat, fechaInicioFormatD,
                  data[i].nombre, data[i].email, data[i].idsuscripcion, data[i].dietaAsignada, data[i].Novistos, data[i].modificar, 1)
              }
            }
          } else {
            renderSuscripcion(fechaInicioFormat, fechaInicioFormat,
              data[i].nombre, data[i].email, data[i].idsuscripcion, data[i].dietaAsignada, data[i].Novistos, data[i].modificar, 1)
          }
        }
        if (dataMod.length > 0) {
          for (let i = 0; i < dataMod.length; i++) {
            let fechaInicioFormat = dataMod[i].fecha_inicioS
            let fechaInicioFormatD = dataMod[i].fecha_inicio
            renderSuscripcionMod(fechaInicioFormat, fechaInicioFormatD,
              dataMod[i].nombre, dataMod[i].email, dataMod[i].idsuscripcion, dataMod[i].dietaAsignada, dataMod[i].Novistos, dataMod[i].modificar, 1)

          }
        }

        if (dataVer.length > 0) {
          for (let i = 0; i < dataVer.length; i++) {
            let fechaInicioFormat = dataVer[i].fecha_inicioS
            let fechaInicioFormatD = dataVer[i].fecha_inicio
            renderSuscripcionVer(fechaInicioFormat, fechaInicioFormatD,
              dataVer[i].nombre, dataVer[i].email, dataVer[i].idsuscripcion, dataVer[i].dietaAsignada, dataVer[i].Novistos, dataVer[i].modificar, 1)

          }
        }
      }
    });

  } catch (error) {
    console.log(error)
    dbox(error)
  }
}


$(document).ready(function () {
  TablaUsuarios();
});


