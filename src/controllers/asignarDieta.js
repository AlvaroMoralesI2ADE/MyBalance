


const añadir = document.getElementById('Añadir');
const guardar = document.getElementById('GuardarDieta');
var semana = document.getElementById("semana");
var cantidad = document.getElementById("Idcantidad");
var semanaA = document.getElementById("semanaAnterior");
var semanaS = document.getElementById("semanaSiguiente");
var dia = document.getElementById("dia");
var comida = document.getElementById("comida");
var alimento = document.getElementById("Buscador");
var nombreUsuario = ""
var suscripcion = 0
var fechaInit
let comidas = []
let fechasArray = []
var num
var semanaArray
var dietaModeloS = false


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




function dietaModelo() {
    $("#BuscadorDieta").autocomplete({
        classes: {
            "ui-autocomplete": "highlight"
        },
        name: 'buscadorDieta',
        source: 'http://localhost:8000/api/selectNameDietaModelo?key=%QUERY',
        messages: {
            noResults: 'No se ha encontrado ninguna dieta',

        },
        limit: 4
    });
}


//href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaI=" + fechaInicioFormatD  + "&num=" + cont + 


$(document).ready(function () {
    var param = window.location.search.substr(1);
    var listaParametros = param.split('&');
    console.log(listaParametros)
    var usuario = listaParametros[0].split('=');
    var semana = listaParametros[1].split('=');
    var suscripcionSplit = listaParametros[2].split('=');
    let fechaInitFormat = listaParametros[3].split('=');
    let numFormat = listaParametros[4].split('=');
    fechaInit = fechaInitFormat[1]
    suscripcion = suscripcionSplit[1]
    num = parseInt(numFormat[1])

    console.log("ESTE ES EL num: " + num)

    // console.log(fechaFin + " " + fechaInit)
    console.log("suscripcion=" + suscripcionSplit[1])
    nombreUsuario = usuario[1]
    prepararSemana(semana[1])
    mostrarDatosUsuario(usuario[1])
    rellenarAlimentos(suscripcion, semana[1])
    //PRIMERO CARGAS LA DIETA.  -> VEMOS EL DIA QUE ES HOY. Y CARGAS TODAS LAS DIETAS Q > 
    //CARGAR TODOS LOS DATOS DEL USUARIO PARA EL PLAN
});





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

    let compare = dia7.getDate().toString().padStart(2, "0") + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getFullYear()


    let dia8 = addDays(semana, 7)
    fechasArray.push(dia8.getFullYear() + "-" + (dia8.getMonth() + 1).toString().padStart(2, "0") + "-" + dia8.getDate().toString().padStart(2, "0"))


    return fechas
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




function prepararSemana(semana) {
    try {
        if (semana == fechaInit) {
            semanaA.disabled = true
        }
        let fechas = getFechas(semana)
        
        var semNum = document.getElementById("semanaNumero");
        let html = "SEMANA DEL " + fechasArray[0] + " AL " + fechasArray[6] + "   ";
        semNum.insertAdjacentHTML("afterbegin", html);

        renderSemana(fechas)
    } catch (error) {
        dbox(error)
    }

}





function mostrarDatosUsuario(gmail) {
    try {
        $.getJSON('http://localhost:8000/api/selectUsuario?email=' + gmail).done(function (results) {
            if (results.length == 1) {
                $.getJSON('http://localhost:8000/api/selectAlergia?email=' + gmail).done(function (alergias) {
                    alimentosAlergia = []
                    if (alergias.length > 0) {
                        alergias.forEach(element => {    
                            alimentosAlergia.push(element.alimento)
                        });
                        
                    } 
                    renderCard(results[0].nombre, results[0].altura, results[0].edad, results[0].tipoAlimentacion, results[0].peso, alimentosAlergia)
                });
            }else {
                dbox("Ha ocurrido un error a la hora de consultar la información del usuario")
            }
        });


     


    } catch (error) {
        dbox(error)
    }

}


function cargarDieta() {
    let dieta = document.getElementById('BuscadorDieta');
    if (dieta.value != "") {
        if (comidas.length > 0) {
            comidas = []
        }
        cargarDietaModelo(dieta.value)
    } else {
        dbox("Por favor, seleccione una dieta")
    }
}






//Añade alimento-cantidad a la comida correspondiente
añadir.addEventListener("click", function () {

    try {
        if (alimento.value != "") {
            let classM = "btn btn-success btn-sm dropdown-toggle"
            var tr;
            if (dietaModeloS) {
                div1 = document.getElementById('line');
                div4 = document.getElementById('tituloModelo');
                div2 = document.getElementById('labelCargarDieta');
                div3 = document.getElementById('buttonCargarDieta');
                div1.remove()
                div2.remove()
                div4.remove()
                div3.remove()
            }


            if (comidas.length < 1) {
                comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, false, 1, 1));

                div1 = document.getElementById('line');
                div4 = document.getElementById('tituloModelo');
                div2 = document.getElementById('labelCargarDieta');
                div3 = document.getElementById('buttonCargarDieta');

                if(div1 != null && div4 != null && div2 != null && div3 != null){
                    div1.remove()
                    div2.remove()
                    div4.remove()
                    div3.remove()
                }

                renderFirstAlimento(comida.value, dia.value, alimento.value, Idcantidad.value, classM, true, 0)


            } else {
                var pos = -1
                //USAR MAP
                for (let i = 0; i < comidas.length; i++) {
                    if (comidas[i].mismaComida(comida.value, dia.value)) {
                        pos = i
                    }
                }
                if (pos != -1) {
                    if (comidas[pos].añadirAlimento((alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, false)) {
                        var data = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                        if (data.clientWidth > 250) {
                            renderAlimentoBtnGroup(comida.value, dia.value, alimento.value, Idcantidad.value, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {
                            renderAlimentoBtn(comida.value, dia.value, alimento.value, Idcantidad.value, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn()
                        }
                    } else {
                        dbox("No puedes añadir el mismo alimento en la misma comida")
                    }


                } else {
                    comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, false, 1, 1))
                    renderFirstAlimento(comida.value, dia.value, alimento.value, Idcantidad.value, classM, true, 0)
                }
            }
            Idcantidad.value = ""
            alimento.value = ""
            dietaModeloS = false
        }

    } catch (error) {
        console.log(error)
        dbox(error)
    }

});

function cargarDietaModelo(dieta) {
    try {
        $.getJSON('http://localhost:8000/api/selectDietaModelo?dieta=' + dieta).done(function (result) {
            renderDietaModelo(result)
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
        //HAY QUE ELIMINAR TODO LO QUE HAYA ANTE
        for (i = 0; i < result.length; i++) {
            let comida = result[i].tipo
            let diaSql = result[i].dia
            let dia = getDateFormat(result[i].dia)
            let alimento = result[i].alimentos
            let classM = "btn btn-success btn-sm dropdown-toggle"

            dietaModeloS = true
            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (alimento + "-" + result[i].tipo + "-" + dia), result[i].cantidad, false, 1, 1));
                renderFirstAlimento(comida, dia, alimento, result[i].cantidad, classM, true, 0)
            } else {
                let pos = -1
                //USAR MAP
                for (let j = 0; j < comidas.length; j++) {
                    if (comidas[j].mismaComida(comida, dia)) {
                        pos = j
                    }
                }

                if (pos != -1) {
                    if (comidas[pos].añadirAlimento((alimento + "-" + comida + "-" + dia), result[i].cantidad, false)) {
                        var data = document.getElementById("btn-" + comida + "-" + dia + "-" + comidas[pos].btn_group_width)
                        if (data.clientWidth > 250) {
                            renderAlimentoBtnGroup(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {
                            renderAlimentoBtn(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn()
                        }
                    } else {
                        dbox("ha ocurrido un error al insertar un alimento")
                        console.log("ERROR: " + alimento + "-" + comida + "-" + dia + " " + result[i].cantidad)
                    }
                } else {
                    comidas.push(new Comida(comida, dia, (alimento + "-" + comida + "-" + dia), result[i].cantidad, false, 1, 1))
                    renderFirstAlimento(comida, dia, alimento, result[i].cantidad, classM, true, 0)
                }
            }
        }
    } catch (error) {
        console.log(error)
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
            let dia = diaSqlFormat.getFullYear() + "-" + (diaSqlFormat.getMonth() + 1).toString().padStart(2, "0") + "-" + diaSqlFormat.getDate().toString().padStart(2, "0")
            let alimento = result[i].alimento
            let classM = ""
            if (result[i].modificar == 0) {
                classM = "btn btn-success btn-sm dropdown-toggle"
            } else {
                classM = "btn btn-danger btn-sm dropdown-toggle"
            }

            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (alimento + "-" + result[i].tipo + "-" + dia), result[i].cantidad, false, 1, 1));
                renderFirstAlimento(comida, dia, alimento, result[i].cantidad, classM, true, 0)
            } else {
                let pos = -1
                //USAR MAP
                for (let j = 0; j < comidas.length; j++) {
                    if (comidas[j].mismaComida(comida, dia)) {
                        pos = j
                    }
                }

                if (pos != -1) {
                    if (comidas[pos].añadirAlimento((alimento + "-" + comida + "-" + dia), result[i].cantidad, false)) {
                        var data = document.getElementById("btn-" + comida + "-" + dia + "-" + comidas[pos].btn_group_width)
                        if (data.clientWidth > 250) {
                            renderAlimentoBtnGroup(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {
                            renderAlimentoBtn(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn()
                        }
                    } else {
                        dbox("ha ocurrido un error al insertar un alimento")
                        console.log("ERROR: " + alimento + "-" + comida + "-" + dia + " " + result[i].cantidad)
                    }
                } else {
                    comidas.push(new Comida(comida, dia, (alimento + "-" + comida + "-" + dia), result[i].cantidad, false, 1, 1))
                    renderFirstAlimento(comida, dia, alimento, result[i].cantidad, classM, true, 0)
                }
            }

        }


    } catch (error) {

        console.log(error)
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
            let dia = diaSqlFormat.getFullYear() + "-" + (diaSqlFormat.getMonth() + 1).toString().padStart(2, "0") + "-" + diaSqlFormat.getDate().toString().padStart(2, "0")
            let alimento = result[i].alimento
            let classM = ""
            if (result[i].modificar == 0) {
                classM = "btn btn-success btn-sm dropdown-toggle"
            } else {
                classM = "btn btn-danger btn-sm dropdown-toggle"
            }

            if (comidas.length < 1) {
                comidas.push(new Comida(comida, dia, (alimento + "-" + result[i].tipo + "-" + dia), result[i].cantidad, true, 1, 1));
                renderFirstAlimento(comida, dia, alimento, result[i].cantidad, classM, true, 0)
            } else {
                let pos = -1
                //USAR MAP
                for (let j = 0; j < comidas.length; j++) {
                    if (comidas[j].mismaComida(comida, dia)) {
                        pos = j
                    }
                }

                if (pos != -1) {
                    if (comidas[pos].añadirAlimento((alimento + "-" + comida + "-" + dia), result[i].cantidad, true)) {
                        var data = document.getElementById("btn-" + comida + "-" + dia + "-" + comidas[pos].btn_group_width)
                        if (data.clientWidth > 250) {
                            renderAlimentoBtnGroup(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {
                            renderAlimentoBtn(comida, dia, alimento, result[i].cantidad, comidas[pos].btn, comidas[pos].btn_group_width, classM, true, 0)
                            comidas[pos].incrementBtn()
                        }
                    } else {
                        dbox("ha ocurrido un error al insertar un alimento")
                        console.log("ERROR: " + alimento + "-" + comida + "-" + dia + " " + result[i].cantidad)
                    }
                } else {
                    comidas.push(new Comida(comida, dia, (alimento + "-" + comida + "-" + dia), result[i].cantidad, true, 1, 1))
                    renderFirstAlimento(comida, dia, alimento, result[i].cantidad, classM, true, 0)
                }
            }

        }

        console.log(comidas)


    } catch (error) {
        console.log(error)
        dbox(error)
    }
}




function semanaSiguiente() {
    let fechaInicio = new Date(fechasArray[7]);
    //let fechaFind = new Date(fechaFinD);
    //let fechaIniciod = new Date(fechaInicioD);
    let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()
    window.location.href = "adminAsignarDieta.html?gmail=" + nombreUsuario + "&semana=" + fechaInicioFormat + "&suscripcion=" + suscripcion + "&semanaI=" + fechaInit + "&num=" + (num + 1)


}



function semanaAnterior() {
    let semanaAnt = new Date(Number(semanaArray[2]), (Number(semanaArray[1]) - 1), Number(semanaArray[0]))
    let diaAnt = removeDays(semanaAnt, 7)
    let fechaInicioFormat = diaAnt.getDate().toString().padStart(2, "0") + "-" + (diaAnt.getMonth() + 1).toString().padStart(2, "0") + "-" + diaAnt.getFullYear()
    window.location.href = "adminAsignarDieta.html?gmail=" + nombreUsuario + "&semana=" + fechaInicioFormat + "&suscripcion=" + suscripcion + "&semanaI=" + fechaInit + "&num=" + (num - 1)

}





function eliminarAlimento(id) {
    try {
        var dropdown_item_id = id.replace('btn-drop', 'dropdown-item')
        var dropdown_menu_id = id.replace('btn-drop', 'dropdown-menu')


        var dropdown_item = document.getElementById(dropdown_item_id)
        var dropdown_menu = document.getElementById(dropdown_menu_id)
        var btn_drop = document.getElementById(id)

        dropdown_item.remove()
        btn_drop.remove()
        dropdown_menu.remove()
        var array = id.split("-")


        let asignada = false



        //btn', 'drop', 'desayuno', '2022', '08', '10', '1', 'copos de maiz'
        let dia = array[3] + "-" + array[4] + "-" + array[5]


        comidas.forEach(function (comida, index, object) {
            if (comida.mismaComida(array[2], array[3] + "-" + array[4] + "-" + array[5])) {

                comida.eliminarAlimento(array[7] + "-" + array[2] + "-" + dia)

                if (!comida.contieneAlimentos()) {
                    object.splice(index, 1)
                }
            }
        });


        if (comidas.length < 1) {
            dietaModeloS = true
            renderCargarDieta()
            dietaModelo()
        }

        //BUSCAR EL ALIMENTO EN EL 
    } catch (error) {
        dbox(error)
    }

}


function insertDeleteComidas(comidasSql, nombreD, nombreUsuario){
    $.getJSON('http://localhost:8000/api/transactionInsertAlimentosDieta?alimentos[]=' + JSON.stringify(comidasSql) + "&nombre=" + nombreD).done(function (result3) {
        if (result3 != true) {
            dbox("Error al crear insertar los alimentos")
            //resetear comidas. y ponerlo como estaba. 
        } else {
            dbox("Alimentos guardados correctamente")
            let nombreD2 = nombreUsuario + "/" +  fechasArray[7]
            let petitionCreateDieta2 = "http://localhost:8000/api/createDieta?nombre=" + nombreD2
            petitionCreateDieta2 += "&fechaI=" + fechasArray[7]
            petitionCreateDieta2 += "&suscripcion=" + suscripcion
            $.getJSON(petitionCreateDieta2).done(function (result4) {
                                       
            });
        }
    });
}




function insertDeleteComidasNoAñadir(comidasSql, nombreD, nombreUsuario){
    $.getJSON('http://localhost:8000/api/transactionInsertAlimentosDieta?alimentos[]=' + JSON.stringify(comidasSql) + "&nombre=" + nombreD).done(function (result3) {
        if (result3 != true) {
            dbox("Error al crear insertar los alimentos")
            //resetear comidas. y ponerlo como estaba. 
        } else {
            dbox("Alimentos guardados correctamente")
        }
    });
}



guardar.addEventListener("click", function () {

    try {
        if (comidas.length > 0) {
            let comidasSql = []
            comidas.forEach(comida => {
                let sql = ""
                comida._alimentos.forEach(alim => {
                    let comidaAdd = null
                    if (alim.bd != true) {
                        comidaAdd = { dia: comida.dia, tipo: comida.tipo, alimento: alim.alimento, eliminar: false, cantidad: alim.cantidad };
                        comidasSql.push(comidaAdd)
                        // alim._bd = true
                    } else if (alim.bd != false && alim.eliminar == true) {
                        comidaAdd = { dia: comida.dia, tipo: comida.tipo, alimento: alim.alimento, eliminar: true, cantidad: alim.cantidad };
                        comidasSql.push(comidaAdd)
                        //comida.eliminarAlimento(alim.alimento)
                    }
                });
            });



            let nombreD = nombreUsuario + "/" + fechasArray[0]
            console.log(nombreD )
            if (comidasSql.length > 0) {
                $.getJSON('http://localhost:8000/api/selectDietaNombre?nombre=' + nombreD).done(function (existe) {
                    console.log(existe)
                    let correcto = true
                    if (existe.length <= 1) {
                        if(existe.length == 1){
                            let petitionCreateComidas = "http://localhost:8000/api/createComidasDieta?nombre=" + nombreD
                            petitionCreateComidas += "&fechas=" + JSON.stringify(fechasArray)
                            $.getJSON(petitionCreateComidas).done(function (result2) {
                                if (result2 != true) {
                                    dbox("Error al crear las comidas de la dieta")
                                    correcto = false
                                }else{
                                    insertDeleteComidas(comidasSql, nombreD, nombreUsuario)
                                }
                            });
                        }else{
                            let petitionCreateDieta = "http://localhost:8000/api/createDieta?nombre=" + nombreD
                            petitionCreateDieta += "&fechaI=" + fechasArray[0]
                            petitionCreateDieta += "&suscripcion=" + suscripcion
                            $.getJSON(petitionCreateDieta).done(function (result) {
                                if (result) {
                                    let petitionCreateComidas = "http://localhost:8000/api/createComidasDieta?nombre=" + nombreD
                                    petitionCreateComidas += "&fechas=" + JSON.stringify(fechasArray)
                                    $.getJSON(petitionCreateComidas).done(function (result2) {
                                        if (result2 != true) {
                                            dbox("Error al crear las comidas de la dieta")
                                            correcto = false
                                        }else{
                                            insertDeleteComidas(comidasSql, nombreD, nombreUsuario)
                                            
                                        }
                                    });
                                } else {
                                    dbox("Error al crear la dieta")
                                    correcto = false
                                }
                            });


                        }
                    
                    }else{
                        insertDeleteComidasNoAñadir(comidasSql, nombreD)
                    }          
                });
            }
        } else {
            dbox("Tienes que incluir al menos un alimento")
        }

    } catch (error) {
        console.log(error)
        dbox(error)
    }


});





function rellenarAlimentos(suscripcion, semana) {
    try {
        let semana = new Date(Number(semanaArray[2]), (Number(semanaArray[1]) - 1), Number(semanaArray[0]))
        let semSQL = semana.getFullYear() + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0")
        let request = "http://localhost:8000/api/selectDieta?suscripcion=" + suscripcion
        request += "&semSql=" + semSQL

        /* var div = document.getElementById('GFG_DIV');
             up.innerHTML = "Click on button to remove the element.";
               
             function GFG_Fun() {
                 div.remove();*/
        $.getJSON(request).done(function (result) {

            if (result.length > 0) {
                renderDieta(result)
            } else {
                renderCargarDieta()
                dietaModelo()
            }
        });

    } catch (error) {
        console.log(error)
        dbox(error)
    }

}










