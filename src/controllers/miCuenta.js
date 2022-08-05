
const { urlencoded } = require('express');
const { getConnection } = require('../../../src/database/database');
const conn = getConnection();
const { dbox } = require('../../../src/views/js/popup');

//IF TIENE SUSCRIPCION NO CADUCADA, PUES LO METES. CREO QUE HABRÍA QUE METER UN CAMPO DATEA


var setUsuario = document.getElementById("form")

setUsuario.addEventListener('submit', function(event){ 
    event.preventDefault();
    setUser(false)
})











