const { getConnection } = require('./../../src/js/database');
const conn = getConnection();
//const { app } = require('./../../src/js/renderApp.js');
const Comida = require('./../../src/js/comida');
const { selectUser } = require('./../../src/models/user')
const { selectAlimento } = require('./../../src/models/alimentos')
const { selectDieta } = require('./../../src/models/dieta')


const { app } = require('./../../src/js/renderApp.js');


const cargarDieta = document.getElementById('CargarDieta');
const añadir = document.getElementById('Añadir');
const guardar = document.getElementById('GuardarDieta');
var semana = document.getElementById("semana");
var cantidad = document.getElementById("Idcantidad");
var dia = document.getElementById("dia");
var comida = document.getElementById("comida");
var alimento = document.getElementById("Buscador");
var nombreUsuario = ""
var suscripcion = 0
let comidas = []
let fechasArray = []


$(function () {
    $("#Buscador").autocomplete({
      classes: {
        "ui-autocomplete": "highlight"
      },
      name: 'buscador',
      source: 'http://localhost:8000/api/searchAlimento?key=%QUERY',
      messages: {
        noResults: 'No se ha encontrado ningun alimento',

      },
      limit: 4
    });
  });


  $(function () {
    $("#BuscadorDieta").autocomplete({
      classes: {
        "ui-autocomplete": "highlight"
      },
      name: 'buscadorDieta',
      source: 'http://localhost:8000/api/searchDieta?key=%QUERY',
      messages: {
        noResults: 'No se ha encontrado ninguna dieta',

      },
      limit: 4
    });
  });




app.listen(8000, () => {
    console.log("Sever is Running");
  })





app.get("/api/searchAlimento", (req, res) => {
    selectAlimento(
      conn,
      req.query.term,
      (result) => {
        res.json(result);
      }
    );
});


app.get('/api/searchDieta', (req, res)  => {
    selectDieta(
        conn,
        (result) => {
          res.json(result);
        }
      );
});






$(document).ready(function () {
    var param = window.location.search.substr(1);
    var listaParametros = param.split('&');
    var usuario = listaParametros[0].split('=');
    var semana = listaParametros[1].split('=');
    var suscripcionSplit = listaParametros[2].split('=');
    suscripcion = suscripcionSplit[1]
    nombreUsuario = usuario[1]
    prepararSemana(semana[1])
    mostrarDatosUsuario(usuario[1])
    rellenarAlimentos(suscripcion,semana[1])
   
    //PRIMERO CARGAS LA DIETA.  -> VEMOS EL DIA QUE ES HOY. Y CARGAS TODAS LAS DIETAS Q > 
    //CARGAR TODOS LOS DATOS DEL USUARIO PARA EL PLAN
});

app.get("/api", (req, res) => {
    console.log('hello world')
});

app.get("/api/selectUser", (req, res) => {
    selectUser(
      conn,
       {email : nombreUsuario},
      (result) => {
        console.log(result)
        res.json(result);
      }
    );
});


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getFechas(sem) {
    const fechas = new Map()

    semanaArray = sem.split("-")


    let semana = new Date(Number(semanaArray[2]), (Number(semanaArray[1])- 1), Number(semanaArray[0]))


    /*let Fechahoy = Date.now();
    let s = new Date(Fechahoy);
    console.log(s.getDate().toString().padStart(2, "0") + "-" + (s.getMonth() + 1).toString().padStart(2, "0") + "-" + s.getFullYear())
    console.log(s.toISOString().split('T')[0])*/
 
    fechas.set(semana.getDate().toString().padStart(2, "0") + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getFullYear(), semana.getFullYear()  + "-" +  (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0"))
    fechasArray.push(semana.getFullYear()  + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0"))


    let dia2 = addDays(semana, 1)
    fechas.set(dia2.getDate().toString().padStart(2, "0") + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getFullYear(), dia2.getFullYear()  + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia2.getFullYear()  + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getDate().toString().padStart(2, "0"))

    let dia3 = addDays(semana, 2)
    fechas.set(dia3.getDate().toString().padStart(2, "0") + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getFullYear(), dia3.getFullYear()  + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia3.getFullYear()  + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getDate().toString().padStart(2, "0"))

    let dia4 = addDays(semana, 3)
    fechas.set(dia4.getDate().toString().padStart(2, "0") + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getFullYear(), dia4.getFullYear()  + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia4.getFullYear()  + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getDate().toString().padStart(2, "0"))

    
    let dia5 = addDays(semana, 4)
    fechas.set(dia5.getDate().toString().padStart(2, "0") + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getFullYear(), dia5.getFullYear()  + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia5.getFullYear()  + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getDate().toString().padStart(2, "0"))

    let dia6 = addDays(semana, 5)
    fechas.set(dia6.getDate().toString().padStart(2, "0") + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getFullYear(), dia6.getFullYear()  + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia6.getFullYear()  + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getDate().toString().padStart(2, "0"))

    let dia7 = addDays(semana, 6)
    fechas.set(dia7.getDate().toString().padStart(2, "0") + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getFullYear(), dia7.getFullYear()  + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia7.getFullYear()  + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getDate().toString().padStart(2, "0"))



    return fechas
}



function prepararSemana(semana) {

    try {
        const dataForm = document.getElementById("diasSemana")
        const cena = document.getElementById("cena")
        const desayuno = document.getElementById("desayuno")
        const comida = document.getElementById("comidaTH")
        const merienda = document.getElementById("merienda")
        const almuerzo = document.getElementById("almuerzo")

        let fechas = getFechas(semana)
        dataForm.innerHTML += "<th scope=\"col\"></th>"
        const dataForm2 = document.getElementById("dia")
        desayuno.innerHTML += "<th scope=\"row\">Desayuno</th>"
        almuerzo.innerHTML += "<th scope=\"row\">Almuerzo</th>"
        comida.innerHTML += "<th scope=\"row\">Comida</th>"
        merienda.innerHTML += "<th scope=\"row\">Merienda</th>"
        cena.innerHTML += "<th scope=\"row\">Cena</th>"

        fechas.forEach((fechaSQL, fecha, map) => {
            dataForm.innerHTML += "<th scope=\"col\">" + fecha + "</th>"
            dataForm2.innerHTML += "<option value=\"" + fechaSQL + "\">" + fecha + "</option>"
            desayuno.innerHTML += "<td id=\"desayuno-" + fechaSQL + "\"></td>"
            almuerzo.innerHTML += "<td id=\"almuerzo-" + fechaSQL + "\"></td>"
            comida.innerHTML += "<td id=\"comida-" + fechaSQL + "\"></td>"
            merienda.innerHTML += "<td id=\"merienda-" + fechaSQL + "\"></td>"
            cena.innerHTML += "<td id=\"cena-" + fechaSQL + "\"></td>"
        });

    } catch (error) {
        dbox(error)
    }




}





function mostrarDatosUsuario(gmail) {
    try {
        let sql = 'SELECT nombre, sexo, altura, peso, tipoAlimentacion, edad FROM mybalance.usuarios WHERE email = ?';
        conn.query(sql, gmail, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            } else {
                if (results.length == 1) {
                    var div = document.getElementById("card");
                    div.innerHTML += "<h5 class=\"card-title\">" + results[0].nombre + "</h5>"
                    div.innerHTML += "<p class=\"card-text\">Edad: " + results[0].edad + "&nbsp&nbsp&nbsp Altura: " + results[0].altura + "cm &nbsp&nbsp&nbsp Peso: " + 100 + "kg</p>"
                    div.innerHTML += "<p class=\"card-text\"> Tipo Alimentacion: " + results[0].tipoAlimentacion + "</p>"
                } else {
                    dbox("Ha ocurrido un error a la hora de consultar la información del usuario")
                }

            }
        });
    } catch (error) {
        dbox(error)
    }

}





//Añade alimento-cantidad a la comida correspondiente
añadir.addEventListener("click", function () {

    try {
        if (alimento.value != "") {
            var tr;
            if (comidas.length < 1) {
                comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1));
                var data2 = document.getElementById(comida.value + "-" + dia.value);
                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + 1 + "\">"
                var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + 1)
                data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value)
                data4.innerHTML += alimento.value + " " + Idcantidad.value
                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                //<button type="button" class="btn-close" aria-label="Close"></button>
            } else {
                var pos = -1
                //USAR MAP
                for (let i = 0; i < comidas.length; i++) {
                    if (comidas[i].mismaComida(comida.value, dia.value)) {
                        pos = i
                    }
                }
                if (pos != -1) {
                    if (comidas[pos].añadirAlimento((alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value)) {
                        var data = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                        if (data.clientWidth > 250) {
                            var data2 = document.getElementById(comida.value + "-" + dia.value);
                            data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width + 1) + "\">"
                            document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width + 1)).style.margin = "5px";
                            var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width + 1))
                            data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value)
                            data4.innerHTML += alimento.value + " " + Idcantidad.value
                            data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {

                            var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                            data3.innerHTML += "<p>&nbsp</p>"
                            data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value)
                            data4.innerHTML += alimento.value + " " + Idcantidad.value
                            data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                            comidas[pos].incrementBtn()
                        }
                    } else {
                        dbox("No puedes añadir el mismo alimento en la misma comida")
                    }


                } else {
                    comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1))
                    var data2 = document.getElementById(comida.value + "-" + dia.value);
                    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + 1 + "\">"
                    var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + 1)
                    data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                    var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value)
                    data4.innerHTML += alimento.value + " " + Idcantidad.value
                    data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"


                }
            }
            Idcantidad.value = ""
            alimento.value = ""
        }
    } catch (error) {
        console.log(error)
        dbox(error)
    }

});





cargarDieta.addEventListener("click", function () {
    let dieta = document.getElementById('BuscadorDieta');
    if (dieta.value != "") {
        if (comidas.length > 0) {
            comidas = []
        }
        cargarDietaModelo(dieta.value)
    } else {
        dbox("Por favor, seleccione una dieta")
    }
});




function cargarDietaModelo(dieta) {
    try {
        let query = "SELECT alimentos_comida_modelo.alimentos, alimentos_comida_modelo.tipo,"
        query += "alimentos_comida_modelo.cantidad, comidas_del_dia_modelo.dia "
        query += "FROM comidas_del_dia_modelo, alimentos_comida_modelo "
        query += "WHERE comidas_del_dia_modelo.dieta_modelo = \"" + dieta + "\" AND comidas_del_dia_modelo.idcomidas_dia_modelo = "
        query += "alimentos_comida_modelo.comidas_modelo"
  

        conn.query(query, function (error, result, fields) {
            if (error) {
                dbox(error)
            } else {
                renderDietaModelo(result)
            }

        });
    } catch (error) {
        dbox(error)
    }
}


function getDateFormat(dia) {

 
    
    let date = ""
    switch (dia) {
        case 1:
            date = fechasArray[0]
            break;
        case 2:
            date = fechasArray[1]
            break;
        case 3:
            date = fechasArray[2]
            break;
        case 4:
            date = fechasArray[3]
            break;
        case 5:
            date = fechasArray[4]
            break;

        case 6:
            date = fechasArray[5]
            break;
        case 7:
            date = fechasArray[6]
            break;
        default:
            console.log("EL ERROR " + dia)
            dbox("ha ocurrido un error al importar el dia")
            break;
    }


    return date
}


function renderDietaModelo(result) {
    try {

        //HAY QUE ELIMINAR TODO LO QUE HAYA ANTES


        let dia = ""
        for (i = 0; i < result.length; i++) {
            let comida = result[i].tipo
            let dia = getDateFormat(result[i].dia)
            let alimento = result[i].alimentos
            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (result[i].alimentos + "-" + result[i].tipo + "-" + dia), result[i].cantidad, 1, 1));
                var data2 = document.getElementById(comida + "-" + dia);
                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
                var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimentos + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimentos)
                data4.innerHTML += result[i].alimentos + " " + result[i].cantidad
                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimentos + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimentos + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"

            }else{
                    let pos = -1
                    //USAR MAP
                    for (let j = 0; j < comidas.length; j++) {
                        if (comidas[j].mismaComida(comida, dia)) {
                            pos = j
                        }
                    }

                    if (pos != -1) {
                  
                        if (comidas[pos].añadirAlimento((alimento + "-" + comida + "-" + dia), result[i].cantidad)) {
                            var data = document.getElementById("btn-" + comida + "-" + dia + "-" + comidas[pos].btn_group_width)
                            if (data.clientWidth > 250) {
                                var data2 = document.getElementById(comida + "-" + dia);
                                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1) + "\">"
                                document.getElementById("btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1)).style.margin = "5px";
                                var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1))
                                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                                data4.innerHTML += alimento + " " + result[i].cantidad
                                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
                                comidas[pos].incrementBtn_group_width()
                                comidas[pos].incrementBtn()
                            } else {
    
                                var data3 = document.getElementById("btn-" + comida+ "-" + dia + "-" + comidas[pos].btn_group_width)
                                data3.innerHTML += "<p>&nbsp</p>"
                                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                                data4.innerHTML += alimento + " " + result[i].cantidad
                                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
                                comidas[pos].incrementBtn()
                            }
                        } else {
                            dbox("No puedes añadir el mismo alimento en la misma comida")
                        }
    
    
                    } else {
                        comidas.push(new Comida(comida, dia, (alimento + "-" + comida + "-" + dia), result[i].cantidad, 1, 1))
                        var data2 = document.getElementById(comida + "-" + dia);
                        data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
                        var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
                        data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                        var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)
                        data4.innerHTML += alimento + " " + result[i].cantidad
                        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
    
    
                    }
                }
        }
            
        
    } catch (error) {
        
        console.log(error)
        dbox(error)
    }
}






function eliminarAlimento(id) {
    try {
        console.log(id)
        var dropdown_item_id = id.replace('btn-drop', 'dropdown-item')
        var dropdown_menu_id = id.replace('btn-drop', 'dropdown-menu')

        var dropdown_item = document.getElementById(dropdown_item_id)
        var dropdown_menu = document.getElementById(dropdown_menu_id)
        var btn_drop = document.getElementById(id)

        dropdown_item.remove()
        btn_drop.remove()
        dropdown_menu.remove()

        var array = id.split("-")

        comidas.forEach(comida => {
            if (comida.mismaComida(array[2], array[3] + "-" + array[4] + "-" + array[5])) {
                comida.eliminarAlimento(array[7] + "-" + array[2] + "-" + array[3] + "-" + array[4] + "-" + array[5])
            }
        });
        //my_map.delete(key)


        //BUSCAR EL ALIMENTO EN EL 

    } catch (error) {
        dbox(error)
    }

}




guardar.addEventListener("click", function () {

    try {

        if(comidas.length > 0){
            /* COMPROBAR QUE NO EXISTE , PARA LUEGO HACER INSERT 
            comidas.forEach(comida => {
                comida.prepareSqlModelo(nombre.value)
                query += comida.sql 
            });*/
            
            
            let nombreD =  nombreUsuario  + "/" + fechasArray[0]
            let query = "INSERT INTO dieta (dieta,fecha_inicio,fecha_fin,suscripcion) VALUES ('" + nombreD + "', '" + fechasArray[0] + "', '" +  fechasArray[6] + "', " + suscripcion + "); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta) VALUES ('" + fechasArray[0] + "', \"" + nombreD + "\"); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta) VALUES ('" + fechasArray[1] + "', \"" + nombreD + "\"); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta)  VALUES ('" + fechasArray[2] + "', \"" + nombreD + "\"); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta)  VALUES ('" + fechasArray[3] + "', \"" + nombreD + "\"); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta)  VALUES ('" + fechasArray[4] + "', \"" + nombreD + "\"); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta)  VALUES ('" + fechasArray[5] + "', \"" + nombreD + "\"); \n"
            query += "INSERT INTO comidas_del_dia (dia, dieta)  VALUES ('" + fechasArray[6] + "', \"" + nombreD + "\"); \n"
        
    
            comidas.forEach(comida => {
                comida.prepareSql(nombreD)
                query += comida.sql
            });

            console.log(query)
            comidas = []

            conn.query(query, (error,result,fields) => {
                if(error){
                    dbox(error);
                    console.log(error)
                }else{
                    dbox("Dieta guardada correctamente")
                    comidas = []
                }
            });

        
        }else{
            dbox("Tienes que incluir al menos un alimento")
        }
       
    } catch (error) {
        console.log(error)
        dbox(error)
    }


});





function rellenarAlimentos(suscripcion,semana){
    try{

        let semana = new Date(Number(semanaArray[2]), (Number(semanaArray[1])- 1), Number(semanaArray[0]))
        let semSQL = semana.getFullYear()  + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0")    
        let query = "" 
        query +=  "SELECT alimentos_comidas.alimento, alimentos_comidas.comida, alimentos_comidas.tipo, alimentos_comidas.modificar,"
        query += "alimentos_comidas.cantidad, alimentos_comidas.consumido, comidas_del_dia.dia "
        query += "FROM comidas_del_dia, alimentos_comidas "
        query += "WHERE comidas_del_dia.idcomidas_dia = alimentos_comidas.comida "
        query += "AND comidas_del_dia.dieta IN (SELECT dieta FROM dieta "   
        query += "WHERE suscripcion =" + suscripcion + " AND dieta.fecha_inicio = \"" + semSQL + "\")"

      
        conn.query(query, (error,result,fields) => {
            if(error){
                dbox(error);
                console.log(error)
            }else{
                renderDieta(result)
            }
        });


    }catch(error){
        dbox(error)
    }

}

     






function renderDieta(result) {
    try {

        /*
        SELECT  alimentos_comidas.alimento,alimentos_comidas.comida, alimentos_comidas.tipo, alimentos_comidas.modificar,"
        query += "alimentos_comidas.cantidad, alimentos_comidas.consumido, comidas_del_dia.dia "
        */


        //IF DATE NOW == SQLDATE -> OPCION MARCAR COMO CONSUMIDO
        //IF DATE NOW > SQLDATE -> PONER EN VERDE SI ES CONSUMIDO, PONER EN ROJO SINO, PONER EN AMARILLO SI ESTA MODIFICAR
        //IF DATE NOW < SQLDATE -> PONERLO EN GRIS CON OPCION DE MODIFICAR


        let dia = ""
        for (i = 0; i < result.length; i++) {
            let comida = result[i].tipo
            let diaSql = result[i].dia
            let diaSqlFormat = new Date(diaSql)
            let dia = diaSqlFormat.getFullYear()  + "-" + (diaSqlFormat.getMonth() + 1).toString().padStart(2, "0") + "-" + diaSqlFormat.getDate().toString().padStart(2, "0")
            let alimento = result[i].alimento
            let classM = ""
            if(result[i].modificar == 0){
                classM = "btn btn-success btn-sm dropdown-toggle"
            }else{
                classM = "btn btn-danger btn-sm dropdown-toggle"
            }

          
            
            
            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (result[i].alimento + "-" + result[i].tipo + "-" + dia), result[i].cantidad, 1, 1));
                var data2 = document.getElementById(comida + "-" + dia);
                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
                var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento)
                data4.innerHTML += result[i].alimento + " " + result[i].cantidad
                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"

            }else{
                    let pos = -1
                    //USAR MAP
                    for (let j = 0; j < comidas.length; j++) {
                        if (comidas[j].mismaComida(comida, dia)) {
                            pos = j
                        }
                    }

                    if (pos != -1) {
                        if (comidas[pos].añadirAlimento((alimento + "-" + comida + "-" + dia), result[i].cantidad)) {
                            var data = document.getElementById("btn-" + comida + "-" + dia + "-" + comidas[pos].btn_group_width)
                            if (data.clientWidth > 250) {
                                var data2 = document.getElementById(comida + "-" + dia);
                                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1) + "\">"
                                document.getElementById("btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1)).style.margin = "5px";
                                var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1))
                                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
           
                                data4.innerHTML += alimento + " " + result[i].cantidad
                                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
                                comidas[pos].incrementBtn_group_width()
                                comidas[pos].incrementBtn()
                            } else {
    
                                var data3 = document.getElementById("btn-" + comida+ "-" + dia + "-" + comidas[pos].btn_group_width)
                                data3.innerHTML += "<p>&nbsp</p>"
                                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                                data4.innerHTML += alimento + " " + result[i].cantidad
                                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
                                comidas[pos].incrementBtn()
                            }
                        } else {
                            dbox("No puedes añadir el mismo alimento en la misma comida")
                        }
    
    
                    } else {
                        comidas.push(new Comida(comida, dia, (alimento + "-" + comida + "-" + dia), result[i].cantidad, 1, 1))
                        var data2 = document.getElementById(comida + "-" + dia);
                        data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
                        var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
                        data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                        var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)
                        data4.innerHTML += alimento + " " + result[i].cantidad
                        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
    
    
                    }
                }
        }

        comidas = []
            
        
    } catch (error) {
        console.log(error)
        dbox(error)
    }
}



