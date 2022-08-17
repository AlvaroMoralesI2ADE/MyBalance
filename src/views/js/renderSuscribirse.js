function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const insertHtml = (value, suscripcion) => {  
    const data = document.getElementById("camposUsuario");
    data.innerHTML = "<form action=\"#\" method=\"post\" id = \"form\">"
    const dataForm = document.getElementById("form") 
    dataForm.innerHTML += "<div class=\"suscripcion-input\" id=\"suscInput1\" style=\"color:white; float: left;width: 200px;\">"

    const data2 = document.getElementById("suscInput1")
    data2.innerHTML += "<label id=\"labelNombre\"> Nombre <span class=\"req\"></span>"
    data2.innerHTML += "  </label> <input type=\"text\" id=\"idNombre\" required>"
   
    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput2\" style=\"float: right; width: 200px;\">"
    const data3 = document.getElementById("suscInput2")
    data3.innerHTML += "<label id=\"labelEdad\">  Edad <span class=\"req\"></span>"
    data3.innerHTML += " </label> <input type=\"number\" id=\"idEdad\" required></div>"
    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput3\" style=\"float: left; width: 200px;\">"

    const data4 = document.getElementById("suscInput3")
    data4.innerHTML += "<label id=\"labelPeso\"> Peso en kg  <span class=\"req\"></span>"
    data4.innerHTML += " </label> <input type=\"number\" id=\"idPeso\" required></div>"

    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput4\" style=\"float: right; width: 200px;\">";
    const data5 = document.getElementById("suscInput4");
    data5.innerHTML += "<label id=\"labelAltura\">Altura en cm <span class=\"req\"></span>"
    data5.innerHTML += " </label> <input type=\"number\" id=\"idAltura\" required></div>"

    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput5\" style=\"float: left; \">"
    const data6 = document.getElementById("suscInput5")
    data6.innerHTML += "<p id=\"p\" style=\" float:left; color:white; ;font-size: 20px; margin: 2px;\">Sexo:"
    const data7 = document.getElementById("p")


    data7.innerHTML += "<select name=\"sexo\" id = \"sexo\">"
    const data8 = document.getElementById("sexo")
    data8.innerHTML += "<option selected=\"yes\" value = \"H\">Hombre</option>"
    data8.innerHTML += "<option value = \"M\">Mujer</option>"
    data8.innerHTML += "<option value = \"O\">Otro</option>"



    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput6\" style=\"float: right; \">"
    const data9 = document.getElementById("suscInput6")
    data9.innerHTML += "<p id=\"p2\" style=\" float:right; color:white; ;font-size: 20px; margin: 2px;\">Tipo Dieta:"
    

    const data10 = document.getElementById("p2")
    data10.innerHTML += "<select name=\"my_html_select_box\" id = \"tipoAlimentacion\">"

    const data11 = document.getElementById("tipoAlimentacion")
    data11.innerHTML += "<option value = \"Completa\">Completa</option>"
    data11.innerHTML += "<option value = \"Vegana\">Vegana</option>"
    data11.innerHTML += "<option value = \"Vegetariana\">Vegetariana</option>"


    dataForm.innerHTML += "<div class=\"suscripcion-input\" id=\"suscInput8\" style=\"color:white; float: left;\">"
    const data15 = document.getElementById("suscInput8")
    data15.innerHTML += " <label id=\"labelPeso\"> Introduce alergías o intolerancias <span class=\"req\"></span>"
    data15.innerHTML += "  </label> <input type=\"text\" id=\"idAlimento\">"
     data15.innerHTML +=" <button id=\"Añadir\" type=\"button\" onclick = \"añadirAlergia()\" class=\"añadirButton\">Añadir</button>"
   
    data15.innerHTML += "<br></br>"
    data15.innerHTML += "<br></br>"
     data15.innerHTML +="<textarea id=\"w3review\" name=\"w3review\" rows=\"4\" cols=\"60\" disabled>"
   



    if(suscripcion){
        dataForm.innerHTML += "<div class=\"suscripcion-input\" id=\"suscInput7\" style=\"float: left; \">"
        const data12 = document.getElementById("suscInput7")
        data12.innerHTML += "<p id=\"p3\" style=\" float:left; color:white; ;font-size: 20px; margin: 2px;\">Cuando desea que comience la dieta:"
        
        let Fechahoy = Date.now();
        let hoy = new Date(Fechahoy);
        console.log(hoy.toISOString().split('T')[0])
        let dia1 =  addDays(hoy, 4)
        let dia2 =  addDays(hoy, 5)
        let dia3 =  addDays(hoy, 6)
        let dia4 =  addDays(hoy, 7)
        let dia5 =  addDays(hoy, 8)
        let dia6 =  addDays(hoy, 9)
        let dia7 =  addDays(hoy, 10)

        let dia1Fecha =  dia1.getDate().toString().padStart(2, "0") + "-" + (dia1.getMonth() + 1).toString().padStart(2, "0") + "-" + dia1.getFullYear();
        let dia2Fecha =  dia2.getDate().toString().padStart(2, "0") + "-" + (dia2.getMonth() + 1).toString().padStart(2, "0") + "-" + dia2.getFullYear();
        let dia3Fecha =  dia3.getDate().toString().padStart(2, "0") + "-" + (dia3.getMonth() + 1).toString().padStart(2, "0") + "-" + dia3.getFullYear();
        let dia4Fecha =  dia4.getDate().toString().padStart(2, "0") + "-" + (dia4.getMonth() + 1).toString().padStart(2, "0") + "-" + dia4.getFullYear();
        let dia5Fecha =  dia5.getDate().toString().padStart(2, "0") + "-" + (dia5.getMonth() + 1).toString().padStart(2, "0") + "-" + dia5.getFullYear();
        let dia6Fecha =  dia6.getDate().toString().padStart(2, "0") + "-" + (dia6.getMonth() + 1).toString().padStart(2, "0") + "-" + dia6.getFullYear();
        let dia7Fecha =  dia7.getDate().toString().padStart(2, "0") + "-" + (dia7.getMonth() + 1).toString().padStart(2, "0") + "-" + dia7.getFullYear();
        
        const data13 = document.getElementById("p3")
        data13.innerHTML += "<select name=\"my_html_select_box\" id = \"fechaSuscripcion\">"
    
        const data14 = document.getElementById("fechaSuscripcion")
        data14.innerHTML += "<option value = \"" + dia1.toISOString().split('T')[0] + "\">" + dia1Fecha + "</option>"
        data14.innerHTML += "<option value = \"" + dia2.toISOString().split('T')[0] + "\">" + dia2Fecha + "</option>"
        data14.innerHTML += "<option value = \"" + dia3.toISOString().split('T')[0] + "\">" + dia3Fecha + "</option>"
        data14.innerHTML += "<option value = \"" + dia4.toISOString().split('T')[0] + "\">" + dia4Fecha + "</option>"
        data14.innerHTML += "<option value = \"" + dia5.toISOString().split('T')[0] + "\">" + dia5Fecha + "</option>"
        data14.innerHTML += "<option value = \"" + dia6.toISOString().split('T')[0] + "\">" + dia6Fecha + "</option>"
        data14.innerHTML += "<option value = \"" + dia7.toISOString().split('T')[0] + "\">" + dia7Fecha + "</option>"
    
    }
    
    
   
    dataForm.innerHTML += "<input type=\"submit\" id = \"set\" class=\"suscripcionButton button-block\" value=\"" + value  + "\" >"

}


const setInfo = (alimentos) => {
    try {

        var user = new Usuario(localStorage.getItem('user'), localStorage.getItem('nombre'), localStorage.getItem('edad'),
            localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), localStorage.getItem('sexo'), "")


        var labelNombre = document.getElementById("labelNombre")
        var labelEdad = document.getElementById("labelEdad")
        var labelAltura = document.getElementById("labelAltura")
        var labelPeso = document.getElementById("labelPeso")
        var sexo = document.getElementById('sexo')
        var tipo = document.getElementById('tipoAlimentacion')


        if (user.nombre != "") {
            idNombre.value = user.nombre;
            labelNombre.className += "active highlight";
        }


        if (user.edad != "") {
            idEdad.value = user.edad;
            labelEdad.className += "active highlight";
        }



        if (user.altura != "") {
            idAltura.value = user.altura;
            labelAltura.className += "active highlight";
        }


        if (user.peso != "") {
            idPeso.value = user.peso;
            labelPeso.className += "active highlight";
        }



        if (user.sexo != "") {
            sexo.value = user.sexo;
        }



        if (user.tipo != "") {
            tipoAlimentacion.value = user.tipo;
        }

        console.log(alimentos)
        console.log(alimentos.length )
        if(alimentos.length > 0){
            console.log("entraaaaaaa")
            var textArea = document.getElementById("w3review")
            alimentos.forEach(alimento => {
                textArea.innerHTML += alimento + ", "
            });
          
        }
        

    } catch (error) {
        console.log(error)
        dbox(error);
    }
}



function renderAlimentoAlergia(alimento){
    try{
        var textArea = document.getElementById("w3review")
        textArea.innerHTML += alimento + ", "
    }catch(err){
        console.log(err)
    }

}