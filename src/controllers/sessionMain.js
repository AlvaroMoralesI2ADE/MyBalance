const { getConnection } = require('../../../src/database/database')
const Usuario = require('../../../src/controllers/userClass')

const { app } = require('../../../src/controllers/expressApp.js');

const { selectSuscripcion } = require('../../../src/models/user')

const conn = getConnection();
const set = document.getElementById('setSuscripcion')
const { dbox } = require('../../../src/views/js/popup.js')

let buttonSus = document.getElementById('botonSus')

let head = document.getElementById('header')

let fechasArray = []


app.listen(8000, () => {
    console.log("Sever is Running");
})


app.get("/api/selectSuscripcion", (req, res) => {
    selectSuscripcion(
        conn,
        req.query.email,
        (result) => {
            console.log(result)
            res.json(result);
        }
    );
});



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


