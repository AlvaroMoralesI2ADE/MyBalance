

function renderCargarDieta(){
    div = document.getElementById('dietaModelo');
    div.innerHTML += "<p id = \"tituloModelo\" class=\"titulo\">Cargar dieta</p>"
    div.innerHTML += "<hr id = \"line\" style=\"border:2px;\">"
    div.innerHTML += "<div class=\"col\"  id=\"labelCargarDieta\" style=\"padding-top:10px; \">"

    div2 = document.getElementById('labelCargarDieta');
    div2.innerHTML +=  "<input type=\"text\" name=\"buscadorDieta\" id=\"BuscadorDieta\" placeholder=\"Cargar dieta\">"
    div.innerHTML += "<div class=\"col\" id=\"buttonCargarDieta\" style=\"padding-top:10px;\">"

    div3 = document.getElementById('buttonCargarDieta');
    div3.innerHTML += "<button id=\"CargarDieta\" onclick=\"cargarDieta()\" type=\"button\" class=\"btn btn-outline-success\">Añadir</button>"

   
}