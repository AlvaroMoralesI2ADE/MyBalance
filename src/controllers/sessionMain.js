const set = document.getElementById('setSuscripcion')
let buttonSus = document.getElementById('botonSus')
let head = document.getElementById('header')
let fechasArray = []





$(document).ready(function () {
    try {
        var user = new Usuario(localStorage.getItem('user'), localStorage.getItem('nombre'),
            localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), "")

        $.getJSON('http://localhost:8000/api/selectSuscripcion?email=' + user.email).done(function (result) {
            if (result.length > 0) {
                var suscripcionVigente = false;

                for (i = 0; i < result.length; i++) {
                    if (result[i].caducada == 0) {
                        suscripcionVigente = true;
                    }
                }

                if (suscripcionVigente) {
                    renderCalendarioSus(result[0].fecha_inicioS, result[0].fecha_finS, result[0].idsuscripcion)
                } else {
                    renderChat()
                    renderButton()
                }
            } else {
                renderChat()
                renderButton()
            }
        })

    } catch (error) {
        console.log(error)
        dbox(error);
    }
});


