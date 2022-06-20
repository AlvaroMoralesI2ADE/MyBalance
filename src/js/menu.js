function cerrarCuentaUser(){
    localStorage.removeItem('user');
    localStorage.removeItem('altura');
    localStorage.removeItem('peso');
    localStorage.removeItem('nombre');
    localStorage.removeItem('tipo');
    localStorage.removeItem('sexo');
    window.close()
}

function cerrarCuentaAdmin(){
    localStorage.removeItem('admin');
    window.close()
}


