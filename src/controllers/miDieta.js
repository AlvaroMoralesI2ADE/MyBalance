
const { dbox } = require('../../../src/views/js/popup');
const { getConnection } = require('../../../src/database/database');
const Comida = require('../../../src/controllers/comida');
const { selectAlimentosSuscripcion, UpdateAlimentosComidas } = require('../../../src/models/alimentos');
const { app } = require('../../../src/controllers/expressApp.js');
const conn = getConnection();
let fechasArray = []
let comidas = []

$(document).ready(function () {


    //CUANDO CAMBIE DE SEMANA COMPROBAR QUE LA FECHA FINAL QUE VAYAS A MANDAR NO SUPERE LA FECHA DE FIN DE LA SUS
    //HABRÁ QUE PASARLA COMO PARAMETRO TB ... CUANDO LO PASO DE SESSIONMAIN AQUI

    //rellenarTabla()

    var param = window.location.search.substr(1);
    var listaParametros = param.split('&');
    var suscripcion = listaParametros[0].split('=');
    var semana = listaParametros[1].split('=');
    rellenarTabla(suscripcion[1], semana[1])

});





function rellenarTabla(suscripcion, sem) {



    let div = document.getElementById('tableDiv')
    div.innerHTML += "<table class=\"table\" id=\"tableClass\">    <thead> <tr id=\"diasSemana\"></tr>"
    let dataForm = document.getElementById("tableClass")
    dataForm.innerHTML += "<tbody id=\"body\"><tr id=\"desayuno\"></tr><tr id=\"almuerzo\"></tr><tr id=\"comidaTH\"></tr><tr id=\"merienda\"></tr><tr id=\"cena\"></tr>"
    dataForm.innerHTML += "</tbody>"
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

    semanaTit = sem.replace('-', '/')
    div.innerHTML += "<p class=\"titulo\">SEMANA " + semanaTit + " - " + dia7.getDate().toString().padStart(2, "0") + "/" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "/" + dia7.getFullYear() + "</p>"



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
        desayuno.innerHTML += "<th scope=\"row\">Desayuno</th>"
        almuerzo.innerHTML += "<th scope=\"row\">Almuerzo</th>"
        comida.innerHTML += "<th scope=\"row\">Comida</th>"
        merienda.innerHTML += "<th scope=\"row\">Merienda</th>"
        cena.innerHTML += "<th scope=\"row\">Cena</th>"

        fechas.forEach((fechaSQL, fecha, map) => {
            dataForm.innerHTML += "<th scope=\"col\">" + fecha + "</th>"
            desayuno.innerHTML += "<td id=\"desayuno-" + fechaSQL + "\"></td>"
            almuerzo.innerHTML += "<td id=\"almuerzo-" + fechaSQL + "\"></td>"
            comida.innerHTML += "<td id=\"comida-" + fechaSQL + "\"></td>"
            merienda.innerHTML += "<td id=\"merienda-" + fechaSQL + "\"></td>"
            cena.innerHTML += "<td id=\"cena-" + fechaSQL + "\"></td>"
        });

    } catch (error) {
        console.log(error)
        dbox(error)
    }
}




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
        let dia = ""
        for (i = 0; i < result.length; i++) {
            let comida = result[i].tipo
            let classR = ""
            let btn_drop_id
            //\" required

            if (result[i].modificar == 1) {
                classR = "btn btn-warning btn-sm"
            } else {
                classR = "btn btn-light btn-sm dropdown-toggle"
            }
            //HAY QUE VER LA FECHA. 
            //let consumido = "btn btn-success btn-sm "
            //let noconsumido = "btn btn-danger btn-sm "
            let diaSql = result[i].dia
            let diaSqlFormat = new Date(diaSql)
            let dia = diaSqlFormat.getFullYear() + "-" + (diaSqlFormat.getMonth() + 1).toString().padStart(2, "0") + "-" + diaSqlFormat.getDate().toString().padStart(2, "0")
            let alimento = result[i].alimento
            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (result[i].alimento + "-" + result[i].tipo + "-" + dia), result[i].cantidad, 1, 1));
                var data2 = document.getElementById(comida + "-" + dia);
                console.log(result[i])
                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
                var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
                data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento + "\" class=\"" + classR + "\"  style=\"border: 0.5px solid #000000;\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false \">"
                var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento)
                data4.innerHTML += result[i].alimento + " " + result[i].cantidad
                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + result[i].alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
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
                            var data2 = document.getElementById(comida + "-" + dia);
                            data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1) + "\">"
                            document.getElementById("btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1)).style.margin = "5px";
                            var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + (comidas[pos].btn_group_width + 1))
                            data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\" class=\"" + classR + "\" style=\"border: 0.5px solid #000000;\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                            data4.innerHTML += alimento + " " + result[i].cantidad
                            data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
                            btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {

                            var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + comidas[pos].btn_group_width)
                            data3.innerHTML += "<p>&nbsp</p>"
                            data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\" class=\"" + classR + "\" style=\"border: 0.5px solid #000000;\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
                            data4.innerHTML += alimento + " " + result[i].cantidad
                            data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (comidas[pos].btn + 1) + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
                            btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (comidas[pos].btn + 1) + "-" + alimento)
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
                    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\" class=\"" + classR + "\" style=\"border: 0.5px solid #000000;\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)
                    data4.innerHTML += alimento + " " + result[i].cantidad
                    data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
                    btn_drop_id = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)

                }
            }

            console.log(btn_drop_id)
            if (result[i].modificar == 1) {
                btn_drop_id.disabled = true
            }

        }


    } catch (error) {
        console.log(error)
        dbox(error)
    }
}



//PASAR COMO PARÁMETRO DIV?
function modificarAlimento(id, suscripcion) {
    try {


        /*
                UPDATE mybalance.alimentos_comidas
                SET alimentos_comidas.modificar = 1
                WHERE alimentos_comidas.alimento = "aguacate" AND
                mybalance.alimentos_comidas.tipo = "desayuno"
                AND alimentos_comidas.comida = (SELECT idcomidas_dia
                FROM mybalance.comidas_del_dia 
                WHERE mybalance.comidas_del_dia.dia = '2022-07-28' AND mybalance.comidas_del_dia.dieta IN
                (SELECT dieta FROM mybalance.dieta
                WHERE mybalance.dieta.suscripcion = 10))
                */

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





