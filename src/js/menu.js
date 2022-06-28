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


