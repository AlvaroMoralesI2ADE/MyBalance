
const { urlencoded } = require('express');
const { getConnection } = require('./../../src/js/database');
const conn = getConnection();
const { dbox } = require('./../../src/js/popup');


const Usuario = require('./../../src/js/user');
//IF TIENE SUSCRIPCION NO CADUCADA, PUES LO METES. CREO QUE HABRÍA QUE METER UN CAMPO DATEA


var setSuscripcion = document.getElementById("form")

setSuscripcion.addEventListener('submit', () => {
    event.preventDefault();
    setUser(true)
})



















//SET