 const { getConnection } = require('../../../src/database/database')
 const conn = getConnection();
const { urlencoded } = require('express');


//IF TIENE SUSCRIPCION NO CADUCADA, PUES LO METES. CREO QUE HABRÍA QUE METER UN CAMPO DATEA


var setSuscripcion = document.getElementById("form")

setSuscripcion.addEventListener('submit', () => {
    event.preventDefault();
    setUser(true)
})



















//SET