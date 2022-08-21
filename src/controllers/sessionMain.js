const set = document.getElementById('setSuscripcion')
let buttonSus = document.getElementById('botonSus')
let head = document.getElementById('header')
let fechasArray = []





$(document).ready(function () {
    try {
        var user = new Usuario(localStorage.getItem('user'), localStorage.getItem('nombre'),
            localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), "")

        $.getJSON('http://localhost:8000/api/selectSuscripcion?email=' + user.email).done(function (result) {

            console.log(result)
            if (result.length > 0) {
                console.log(result)
                let cont = 0
                let pos = -1
                let dateNow = new Date()
                let encontrado = false
                let fechaInicio = new Date(result[0].fecha_inicioS);
                let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()

            
                if (result[0].fecha_inicio != null) {
                    for (let i = 0; i < result.length && encontrado == false; i++) {
                        cont++
                        let fechaInit = new Date(result[i].fecha_inicio);
                        if (i < result.length) {
                            if (dateNow > fechaInit && dateNow < new Date(result[i + 1].fecha_inicio)) {
                                pos = i
                                console.log("POS: " + pos)
                                encontrado = true
                            }else if(dateNow < fechaInit && dateNow < new Date(result[i + 1].fecha_inicio)){
                                pos = i
                                console.log("POS: " + pos)
                                encontrado = true
                            }
                        } else if (i == (result.length - 1)) {
                            pos = i
                            encontrado = true
                        }
                    }

                    console.log(pos)
                    if (pos == -1) {
                        dbox("Ha ocurrido un error al cargar el calendario")
                    } else {
                        let fechaInicioD = new Date(result[pos].fecha_inicio);
                        let fechaInicioFormatSemana = fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear()
                        renderCalendarioSus(fechaInicioFormat, fechaInicioFormatSemana, result[0].idsuscripcion, cont)
                    }
                }
                else {

                    console.log("VA BIEN")
                    renderCalendarioSus(fechaInicioFormat, fechaInicioFormat, result[0].idsuscripcion, 1)
                }

            } else {
                renderChat()
                renderButton()
                renderInfo()
            }
        })

    } catch (error) {
        console.log(error)
        dbox(error);
    }
});


