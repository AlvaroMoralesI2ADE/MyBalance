function cerrarCuentaUser(){
    localStorage.removeItem('user');
    localStorage.removeItem('altura');
    localStorage.removeItem('peso');
    localStorage.removeItem('nombre');
    localStorage.removeItem('tipo');
    localStorage.removeItem('sexo');
    window.location.href = "../html/log.html";
}

function cerrarCuentaAdmin(){
    localStorage.removeItem('admin');
    window.location.href = "../html/log.html";
}


function renderDate(dataForm){
    try{
       let Fechahoy = Date.now();
       let hoy = new Date(Fechahoy);
       dataForm.innerHTML += hoy.getDate().toString().padStart(2, "0") + "-" + (hoy.getMonth() + 1).toString().padStart(2, "0") + "-" + hoy.getFullYear();
        
    }catch(error){
        console.log(error)
    }
}


$(document).ready(function () {
    const dataForm = document.getElementById("date")
    renderDate(dataForm) 
});