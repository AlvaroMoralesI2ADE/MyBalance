
const { dbox } = require('../../../src/views/js/popup');
const { getConnection } = require('../../../src/database/database');
const Comida = require('../../../src/controllers/comida');
const { selectAlimentosSuscripcion, UpdateAlimentosComidas, UpdateConsumidoAlimento } = require('../../../src/models/alimentos');
const { app } = require('../../../src/controllers/expressApp.js');
const semanaA = document.getElementById('semanaAnterior');
const semanaS = document.getElementById('semanaSiguiente');
const conn = getConnection();
let fechasArray = []
let comidas = []
var diaFin = null
var diaInit = null
var idsuscripcion = 0
var starWeek
var cont = 0

$(document).ready(function () {
    //CUANDO CAMBIE DE SEMANA COMPROBAR QUE LA FECHA FINAL QUE VAYAS A MANDAR NO SUPERE LA FECHA DE FIN DE LA SUS
    //HABRÁ QUE PASARLA COMO PARAMETRO TB ... CUANDO LO PASO DE SESSIONMAIN AQUI

    //rellenarTabla()

    var param = window.location.search.substr(1);
    var listaParametros = param.split('&');
    console.log("PARAMETROS: " + listaParametros)
    var suscripcion = listaParametros[0].split('=');
    var semanaInit = listaParametros[1].split('=');
    var semanaFin = listaParametros[2].split('=');
    var semana = listaParametros[3].split('=');
    var contArray = listaParametros[4].split('=');
    cont = parseInt(contArray[1])
    idsuscripcion = suscripcion[1]
    diaFin = semanaFin[1]
    diaInit = semanaInit[1]
    starWeek = semana[1]

    console.log("semana actual:" + semana + " susc" + diaInit + "///" + diaFin)
    rellenarTabla(suscripcion[1], semana[1])

});


app.listen(8000, () => {
    console.log("Sever is Running");
})





app.get("/api/selectAlimentosSuscripcion", (req, res) => {
    selectAlimentosSuscripcion(
        conn,
        req.query.suscripcion,
        req.query.semana,
        (result) => {
            res.json(result);
        }
    );
});




app.get("/api/UpdateAlimentosComidas", (req, res) => {
    UpdateAlimentosComidas(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});



app.get("/api/UpdateConsumidoAlimento", (req, res) => {
    UpdateConsumidoAlimento(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});

function rellenarTabla(suscripcion, sem) {
    let div = document.getElementById('tableDiv')
    div.innerHTML += "<table class=\"table\" id=\"tableClass\">    <thead> <tr id=\"diasSemana\"></tr>"
    let dataForm = document.getElementById("tableClass")
    dataForm.innerHTML += "<tbody id=\"body\"><tr id=\"desayuno\"></tr><tr id=\"almuerzo\"></tr><tr id=\"comidaTH\"></tr><tr id=\"merienda\"></tr><tr id=\"cena\"></tr>"
    dataForm.innerHTML += "</tbody>"


    if (sem == diaInit) {
        semanaA.disabled = true
    }

    semanaArray = sem.split("-")
    let semana = new Date(Number(semanaArray[2]), (Number(semanaArray[1]) - 1), Number(semanaArray[0]))
    let semSQL = semana.getFullYear() + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0")
    prepararSemana(sem)
    rellenarAlimentos(suscripcion, semSQL)
}


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


function removeDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}




function getFechas(sem) {
    const fechas = new Map()

    semanaArray = sem.split("-")

    let semana = new Date(Number(semanaArray[2]), (Number(semanaArray[1]) - 1), Number(semanaArray[0]))

    /*let Fechahoy = Date.now();
    let s = new Date(Fechahoy);
    console.log(s.getDate().toString().padStart(2, "0") + "-" + (s.getMonth() + 1).toString().padStart(2, "0") + "-" + s.getFullYear())
    console.log(s.toISOString().split('T')[0])*/

    fechas.set(semana.getDate().toString().padStart(2, "0") + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getFullYear(), semana.getFullYear() + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0"))
    fechasArray.push(semana.getFullYear() + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0"))

    let dia2 = addDays(semana, 1)
    fechas.set(dia2.getDate().toString().padStart(2, "0") + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getFullYear(), dia2.getFullYear() + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia2.getFullYear() + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getDate().toString().padStart(2, "0"))

    let dia3 = addDays(semana, 2)
    fechas.set(dia3.getDate().toString().padStart(2, "0") + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getFullYear(), dia3.getFullYear() + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia3.getFullYear() + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getDate().toString().padStart(2, "0"))

    let dia4 = addDays(semana, 3)
    fechas.set(dia4.getDate().toString().padStart(2, "0") + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getFullYear(), dia4.getFullYear() + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia4.getFullYear() + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getDate().toString().padStart(2, "0"))


    let dia5 = addDays(semana, 4)
    fechas.set(dia5.getDate().toString().padStart(2, "0") + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getFullYear(), dia5.getFullYear() + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia5.getFullYear() + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getDate().toString().padStart(2, "0"))

    let dia6 = addDays(semana, 5)
    fechas.set(dia6.getDate().toString().padStart(2, "0") + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getFullYear(), dia6.getFullYear() + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia6.getFullYear() + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getDate().toString().padStart(2, "0"))

    let dia7 = addDays(semana, 6)
    fechas.set(dia7.getDate().toString().padStart(2, "0") + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getFullYear(), dia7.getFullYear() + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getDate().toString().padStart(2, "0"))
    fechasArray.push(dia7.getFullYear() + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getDate().toString().padStart(2, "0"))

    let div = document.getElementById("titulo")



    let compare = dia7.getDate().toString().padStart(2, "0") + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getFullYear()


    if (diaFin == compare) {
        semanaS.disabled = true
    }

    let dia8 = addDays(semana, 7)
    fechasArray.push(dia8.getFullYear() + "-" + (dia8.getMonth() + 1).toString().padStart(2, "0") + "-" + dia8.getDate().toString().padStart(2, "0"))


    semanaTit = sem.replace('-', '/')
    div.innerHTML += "<p class=\"titulo\">SEMANA " + cont + "</p>"





    return fechas
}





function semanaSiguiente() {
    let fechaInicio = new Date(fechasArray[7]);
    //let fechaFind = new Date(fechaFinD);
    //let fechaIniciod = new Date(fechaInicioD);
    let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()

    console.log(fechaInicioFormat)
    window.location.href = "miDieta.html?suscripcion=" + idsuscripcion + "&fechaInicio=" + diaInit + "&fechaFin=" + diaFin + "&semana=" + fechaInicioFormat + "&cont=" + (cont + 1)


}



function semanaAnterior() {
    let semanaAnt = new Date(Number(semanaArray[2]), (Number(semanaArray[1]) - 1), Number(semanaArray[0]))
    let diaAnt = removeDays(semanaAnt, 7)

    let fechaInicioFormat = diaAnt.getDate().toString().padStart(2, "0") + "-" + (diaAnt.getMonth() + 1).toString().padStart(2, "0") + "-" + diaAnt.getFullYear()
    window.location.href = "miDieta.html?suscripcion=" + idsuscripcion + "&fechaInicio=" + diaInit + "&fechaFin=" + diaFin + "&semana=" + fechaInicioFormat + "&cont=" + (cont - 1)

}



function prepararSemana(semana) {
    try {
        let fechas = getFechas(semana)
        renderCalendario(fechas)


    } catch (error) {
        console.log(error)
        dbox(error)
    }
}






function rellenarAlimentos(suscripcion, semana) {
    try {
        $.getJSON('http://localhost:8000/api/selectAlimentosSuscripcion?suscripcion=' + suscripcion
            + '&semana=' + semana).done(function (data) {
                renderDieta(data, suscripcion)
            })

    } catch (error) {
        dbox(error)
    }

}




function renderDieta(result, suscripcion) {
    try {
     
        let d = starWeek.split("-");    
        //20-08-2022
        var inicioSemana = new Date(d[2] + '/' + d[1] + '/' + d[0]);
        let hoy = new Date()
        hoy.setHours(0, 0, 0, 0);


        let caso = 0
        for (i = 0; i < result.length; i++) {
            console.log(result)
            let diaSql = result[i].dia
            let diaSqlFormat = new Date(diaSql)
            let dia = diaSqlFormat.getFullYear() + "-" + (diaSqlFormat.getMonth() + 1).toString().padStart(2, "0") + "-" + diaSqlFormat.getDate().toString().padStart(2, "0")
            let alimento = result[i].alimento
            let comida = result[i].tipo
            let classM = ""
            let day = dia.split("-")       
            let diaFormat = new Date(day[0] + '/' + day[1] + '/' + day[2]);
            //\" required

            //SEMANA ANTERIOR A LA ACTUAL -> CASO = 0 Y METER LO DE DANGER O LO OTRO


            //FECHA == ACTUAL -> CONSUMIDO (AÑADIR LAYER)
            //FECHA < ACTUAL -> ROJO O VERDE. 
            //FECHA > ACTUAL -> MODIFICAR (AÑADIR LAYER)

            if (result[i].modificar == 1) {
                classM = "btn btn-warning btn-sm"
            } else if (result[i].consumido == 1) {
                classM = "btn btn-success btn-sm"
            } else {
                classM = "btn btn-light btn-sm dropdown-toggle"
            }

            console.log(inicioSemana)
            console.log(hoy)
            console.log(inicioSemana == hoy)

            if (inicioSemana > hoy) {
                caso = 0
            }else if(inicioSemana < hoy){
                if(diaFormat < hoy){
                    caso = 0
                    if (result[i].consumido == 1) {
                        classM = "btn btn-success btn-sm"
                    } else {
                        classM = "btn btn-danger btn-sm"
                    }
                }else{
                    caso = 2
                }
            }else{
                console.log("ENTRA AQUI")
                caso = 2
            }

        
            //HAY QUE VER LA FECHA. 
            //let consumido = "btn btn-success btn-sm "
            //let noconsumido = "btn btn-danger btn-sm "
            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (result[i].alimento + "-" + result[i].tipo + "-" + dia), result[i].cantidad, 1, 1));
                renderFirstAlimento(comida, dia, result[i].alimento, result[i].cantidad, classM, caso, suscripcion)
                btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento)
                console.log(btn_drop_id)
            } else {
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
                            renderAlimentoBtnGroup(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, caso, suscripcion)
                            btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {
                            renderAlimentoBtn(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, caso, suscripcion)
                            btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                            comidas[pos].incrementBtn()

                        }
                    } else {
                        dbox("No puedes añadir el mismo alimento en la misma comida")
                    }
                } else {
                    comidas.push(new Comida(comida, dia, (alimento + "-" + comida + "-" + dia), result[i].cantidad, 1, 1))
                    renderFirstAlimento(comida, dia, result[i].alimento, result[i].cantidad, classM, caso, suscripcion)
                    btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)
                }
            }

         

            //EL DIA < ACTUAL 
            if (result[i].modificar == 1 || result[i].consumido == 1 || diaFormat < hoy) {
                btn_drop_id.disabled = true
            }

        }


    } catch (error) {
        console.log(error)
        dbox(error)
    }
}



//PASAR COMO PARÁMETRO DIV?
function consumirAlimento(id, suscripcion) {
    try {

        console.log(id + " sus " + suscripcion)
        var dropdown_item_id = id.replace('btn-drop', 'dropdown-item')
        var dropdown_menu_id = id.replace('btn-drop', 'dropdown-menu')

        var dropdown_item = document.getElementById(dropdown_item_id)
        var dropdown_menu = document.getElementById(dropdown_menu_id)
        var btn_drop = document.getElementById(id)

        var array = id.split("-")
        let comida = array[2]
        let año = array[3]
        let mes = array[4]
        let dia = array[5]
        let alimento = array[7]

        let query = ""

        let request = 'http://localhost:8000/api/UpdateConsumidoAlimento?alimento=' + alimento
        request += '&comida=' + comida
        request += '&año=' + año
        request += '&mes=' + mes
        request += '&dia=' + dia
        request += '&suscripcion=' + suscripcion


        $.getJSON(request).done(function (data) {
            btn_drop.className = "btn btn-success btn-sm"
            btn_drop.disabled = true
        })
    } catch (error) {
        dbox(error)
    }
}












//PASAR COMO PARÁMETRO DIV?
function modificarAlimento(id, suscripcion) {
    try {

        console.log(id + " sus " + suscripcion)
        var dropdown_item_id = id.replace('btn-drop', 'dropdown-item')
        var dropdown_menu_id = id.replace('btn-drop', 'dropdown-menu')

        var dropdown_item = document.getElementById(dropdown_item_id)
        var dropdown_menu = document.getElementById(dropdown_menu_id)
        var btn_drop = document.getElementById(id)

        var array = id.split("-")
        let comida = array[2]
        let año = array[3]
        let mes = array[4]
        let dia = array[5]
        let alimento = array[7]

        let query = ""

        let request = 'http://localhost:8000/api/UpdateAlimentosComidas?alimento=' + alimento
        request += '&comida=' + comida
        request += '&año=' + año
        request += '&mes=' + mes
        request += '&dia=' + dia
        request += '&suscripcion=' + suscripcion


        $.getJSON(request).done(function (data) {
            btn_drop.className = "btn btn-warning btn-sm"
            btn_drop.disabled = true
        })
    } catch (error) {
        dbox(error)
    }
}





