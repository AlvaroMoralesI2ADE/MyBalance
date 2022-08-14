
const { getConnection } = require('../../../src/database/database');
const conn = getConnection();
const { dbox } = require('../../../src/views/js/popup');
const { cancelarSuscripcion } = require('../../../src/models/user')


app.get("/api/cancelarSuscripcion", (req, res) => {
    cancelarSuscripcion(
        conn,
        req.query.email,
        (result) => {
            res.json(result);
        }
    );
});


var setUsuario = document.getElementById("form")

setUsuario.addEventListener('submit', function(event){ 
    event.preventDefault();
    setUser(false)
})





function cancelarSuscripcionButton(){

    $.getJSON('http://localhost:8000/api/cancelarSuscripcion?email=' +  localStorage.getItem('user')).done(function (results) {
        if(results == true){
            cerrarCuentaUser()
        }else{
            dbox("Ha ocurrido un error")
        }
       
    });

}







