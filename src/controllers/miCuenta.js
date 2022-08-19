var setUsuario = document.getElementById("form")

setUsuario.addEventListener('submit', function(event){ 
    event.preventDefault();
    setUser(false)
})



function cancelarSuscripcionButton(){
    $.getJSON('http://localhost:8000/api/cancelarSuscripcion?email=' +  localStorage.getItem('user')).done(function (results) {
        if(results == true){
            let div = document.getElementById("boxWrapCancel")
            let divMain = document.getElementById("boxCancel")
            div.remove()
            divMain.innerHTML += "<div id=\"boxWrapCancel\"></div>"
            let div2 = document.getElementById("boxWrapCancel")
            div2.innerHTML += "<div id=\"boxTxtC\">¡Muchas gracias por todo! Nos vemos pronto :)</div>"
            div2.innerHTML += "<input type=\"button\"  class=\"btn btn-outline-success\" value=\"OK\" onclick=\"cerrarCuentaUser()\" />"
        }else{
            dbox("Ha ocurrido un error")
        }
    });
}







