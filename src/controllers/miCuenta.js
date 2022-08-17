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







