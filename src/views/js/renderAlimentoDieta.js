

function renderFirstAlimento(comida, dia, alimento, cantidad, classM, caso,  suscripcion) {
    var data2 = document.getElementById(comida + "-" + dia);
    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + 1 + "\">"
    var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + 1)
    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento)
    data4.innerHTML += alimento + " " + cantidad



    if(caso == 1){ //ADMIN
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
    }else if(caso == 0){ //MODIFICAR ALIMENTO
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
    }else if(caso == 2){
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "\"href=\"#\" onclick=\"consumirAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + 1 + "-" + alimento + "'," + suscripcion + ")\">Consumido</a></li> </ul> </div>"
    }






}


function renderAlimentoBtnGroup(comida, dia, alimento, cantidad, btn, btn_group_width, classM, caso,  suscripcion){
    var data2 = document.getElementById(comida + "-" + dia);
    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida + "-" + dia + "-" + (btn_group_width + 1) + "\">"
    document.getElementById("btn-" + comida + "-" + dia + "-" + (btn_group_width + 1)).style.margin = "5px";
    var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + (btn_group_width + 1))
    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento)

    data4.innerHTML += alimento + " " + cantidad

    
    if(caso == 1){ //ADMIN
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
    }else if(caso == 0){ //MODIFICAR ALIMENTO
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
    }else if(caso == 2){
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"consumirAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "'," + suscripcion + ")\">Consumido</a></li> </ul> </div>"
    }

}





function renderAlimentoBtn(comida, dia, alimento, cantidad, btn, btn_group_width, classM, caso,  suscripcion){
    //btn-desayuno-2022-07-28-1
    console.log(comida)
    console.log(dia)
    console.log( btn_group_width)
    var data3 = document.getElementById("btn-" + comida + "-" + dia + "-" + btn_group_width)
    console.log(data3)
    data3.innerHTML += "<p>&nbsp</p>"
    data3.innerHTML += "<button id = \"btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\" class=\"" + classM + "\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
    var data4 = document.getElementById("btn-drop-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento)
    data4.innerHTML += alimento + " " + cantidad
   

    if(caso == 1){ //ADMIN
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "')\">Eliminar</a></li> </ul> </div>"
    }else if(caso == 0){ //MODIFICAR ALIMENTO
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"modificarAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "'," + suscripcion + ")\">Modificar</a></li> </ul> </div>"
   }else if(caso == 2){
        data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida + "-" + dia + "-" + (btn + 1) + "-" + alimento + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "\"href=\"#\" onclick=\"consumirAlimento('" + "btn-drop-" + comida + "-" + dia + "-" + + (btn + 1) + "-" + alimento + "'," + suscripcion + ")\">Consumido</a></li> </ul> </div>"
    }
    
 }



 //SI LA FECHA ACTUAL == FECHA DE PARAMETRO: SOLO PUEDES MARCAR COMO QUE TE LO HAS COMIDO.
 
 //SI LA FECHA PARAMETRO < ACTUAL: MARCAR SI SE LO HA COMIDO COMO VERDE. 

 

//FECHA ACTUAL == PARAMETRO: SE PONE COMO CONSUMIDO. NO SE PUEDE MODIFICAR. 
//FECHA ACTUAL < PARAMETRO: PONERLO COMO ROJO LOS NO CONSUMIDOS, VERDE LOS CONSUMIDOS
//FECHA ACTUAL > PARAMETRO: SE PONE COMO MODIFICAR SOLO. 

//SI MARCA QUE SE LO HA COMIDO: CAMBIAR A VERDE. 
//SI EL ALIMENTO NO ESTA MARCADO COMO CONSUMIDO Y LA FECHA ACTUAL < DIA -> PONERLO EN ROJO
//SI EL ALIMENTO ESTA MARCADO COMO CONSUMIDO Y LA FECHA ACTUAL < DIA -> PONERLO EN VERDE