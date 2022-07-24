
const { dbox } = require('./../../src/js/popup');
let comidas = []
const { getConnection } = require('./../../src/js/database');
const conn = getConnection();
let fechasArray = []

$(document).ready(function(){


//CUANDO CAMBIE DE SEMANA COMPROBAR QUE LA FECHA FINAL QUE VAYAS A MANDAR NO SUPERE LA FECHA DE FIN DE LA SUS
//HABRÁ QUE PASARLA COMO PARAMETRO TB ... CUANDO LO PASO DE SESSIONMAIN AQUI

    //rellenarTabla()

    var param = window.location.search.substr(1);
    var listaParametros = param.split('&');
    var suscripcion = listaParametros[0].split('=');
    var semana = listaParametros[1].split('=');
    rellenarTabla(suscripcion[1],semana[1])

});





function rellenarTabla(suscripcion,sem){
    let div = document.getElementById('tableDiv')
    div.innerHTML += "<table class=\"table\" id=\"tableClass\">    <thead> <tr id=\"diasSemana\"></tr>"
    let dataForm = document.getElementById("tableClass") 
    dataForm.innerHTML += "<tbody id=\"body\"><tr id=\"desayuno\"></tr><tr id=\"almuerzo\"></tr><tr id=\"comidaTH\"></tr><tr id=\"merienda\"></tr><tr id=\"cena\"></tr>"
    dataForm.innerHTML +="</tbody>"
    semanaArray = sem.split("-")
    let semana = new Date(Number(semanaArray[2]), (Number(semanaArray[1])- 1), Number(semanaArray[0]))
    let semSQL = semana.getFullYear()  + "-" + (semana.getMonth() + 1).toString().padStart(2, "0") + "-" + semana.getDate().toString().padStart(2, "0")
   
    prepararSemana(sem)
    rellenarAlimentos(suscripcion,semSQL)
}


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

    console.log(fechas)
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
        console.log(dataForm)
        const cena = document.getElementById("cena")
        const desayuno = document.getElementById("desayuno")
        console.log(desayuno)
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


function rellenarAlimentos(suscripcion,semana){
    try{
        let query = "" 
        query +=  "SELECT  comidas_dia.dieta,alimentos_comidas.comida, alimentos_comidas.tipo, alimentos_comidas.modificar,"
        query += "alimentos_comidas.cantidad, alimentos_comidas.consumido, comidas_dia.dia "
        query += "FROM comidas_dia, alimentos_comidas "
        query += "WHERE comidas_dia.idcomidas_dia = alimentos_comidas.comida "
        query += "AND comidas_dia.dieta IN (SELECT dieta FROM dieta "   
        query += "WHERE suscripcion =" + suscripcion + " AND dieta.fecha_inicio = \"" + semana + "\")"

        console.log(query)
        conn.query(query, (error,result,fields) => {
            if(error){
                dbox(error);
                console.log(error)
            }else{
                result.forEach(element => {
                    console.log(element)
                });
                comidas = []

            }
        });


    }catch(error){
        dbox(error)
    }

}







