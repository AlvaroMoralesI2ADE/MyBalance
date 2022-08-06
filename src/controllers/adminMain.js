const { read } = require('original-fs');
const { getConnection } = require('../../../src/database/database')
//const { app } = require('electron');
const { app } = require('../../../src/controllers/expressApp.js');

const { dbox } = require('../../../src/views/js/popup.js');

const { selectSuscVigentes } = require('../../../src/models/user')


/*
app.use(express.json());*/


const conn = getConnection()

app.listen(8000, () => {
  console.log("Sever is Running");
})


class Usuario {

  constructor(nombre, gmail, suscripcion, inicio, final) {
    this.nombre = nombre;
    this.gmail = gmail;
    this.suscrito = suscripcion;
    this.fechaInicio = inicio;
    this.fechaFinal = final;
  }
}


app.get("/api/selectSuscVigentes", (req, res) => {
  selectSuscVigentes(
    conn,
    (result) => {
      console.log(result)
      res.json(result);
    }
  );
});

/*
app.listen(3000, function () {
  console.log("started at 3000");
});*/



//SET INTERVALO
function TablaUsuarios() {
  try {
    $.getJSON('http://localhost:8000/api/selectSuscVigentes').done(function (data) {
      for (let i = 0; i < data.length; i++) {
        renderSuscripcion(data[i].fecha_inicioS, data[i].fecha_finS, 
          data[i].nombre, data[i].email, data[i].idsuscripcion, data.length)
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


