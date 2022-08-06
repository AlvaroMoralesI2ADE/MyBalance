


function renderFirstAlimento(comida, dia, alimento, cantidad, classM) {
    var data2 = document.getElementById(comida + "-" + dia);
    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
    var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)
    data4.innerHTML += alimento + " " + cantidad
    data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
}


function renderAlimentoBtnGroup(comida, dia, alimento, cantidad, btn, btn_group_width, classM){
    var data2 = document.getElementById(comida + "-" + dia);
    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + (btn_group_width + 1) + "\">"
    document.getElementById("btn-" + comida + "-" + dia + "-" + (btn_group_width + 1)).style.margin = "5px";
    var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + (btn_group_width + 1))
    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento)

    data4.innerHTML += alimento + " " + cantidad
    data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"

}





function renderAlimentoBtn(comida, dia, alimento, cantidad, btn, btn_group_width, classM){
    var data3 = document.getElementById("btn-" + comida+ "-" + dia + "-" + btn_group_width)
    data3.innerHTML += "<p>&nbsp</p>"
    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento)
    data4.innerHTML += alimento + " " + cantidad
    data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
}