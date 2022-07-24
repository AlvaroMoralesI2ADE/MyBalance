const Usuario = require('./../../src/js/user');
const { getConnection } = require('./../../src/js/database');
const conn = getConnection()
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



function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  

const setInfo = () => {
    try{
        
        var user = new Usuario( localStorage.getItem('user'), localStorage.getItem('nombre'),localStorage.getItem('edad'),
        localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'),localStorage.getItem('sexo'), "")



        var labelNombre = document.getElementById("labelNombre")
        var labelEdad = document.getElementById("labelEdad")
        var labelAltura = document.getElementById("labelAltura")
        var labelPeso = document.getElementById("labelPeso")
        var sexo = document.getElementById('sexo')
        var tipo = document.getElementById('tipoAlimentacion')
      


        
     

        if(user.nombre != ""){
            idNombre.value = user.nombre;
            labelNombre.className += "active highlight";
        }

        
        if(user.edad != ""){
            idEdad.value = user.edad;
            labelEdad.className += "active highlight";
        }


      
        if(user.altura != ""){
            idAltura.value = user.altura;
            labelAltura.className += "active highlight";
        }

        
        if(user.peso != ""){
            idPeso.value = user.peso;
            labelPeso.className += "active highlight";
        }


        
        if(user.sexo != ""){
            sexo.value = user.sexo;
        }



        if(user.tipo != ""){
            tipoAlimentacion.value = user.tipo;
        }

    }catch(error){
        dbox(error);
    }
}

const setUser = (suscripcion) => {
    try{

            var user = new Usuario( localStorage.getItem('user'), localStorage.getItem('nombre'),localStorage.getItem('edad'),
            localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'),localStorage.getItem('sexo'), "")

            var fechaInicioSelect = document.getElementById('fechaSuscripcion')
            let fechaInicio = fechaInicioSelect.value
            let fechaFinalF = addDays(fechaInicio, 28)
            let fechaFinal = fechaFinalF.toISOString().split('T')[0]

            console.log(fechaFinal)

    
        
            var  valuesSet = "";
 
            
            if(idNombre.value != user.nombre){
                valuesSet += "nombre = '" + idNombre.value + "'," ;
                localStorage.setItem('nombre', idNombre.value)

            }
            
        
   
            if(user.edad != ""){    
                if(idEdad.value != user.edad){
                    valuesSet += "edad = '" + idEdad.value + "',";
                    localStorage.setItem('edad',  idEdad.value)
                }
            }else{
                valuesSet += "edad = '" + idEdad.value + "',";
                localStorage.setItem('edad',  idEdad.value)
            }

            if(user.altura != ""){
                if( idAltura.value != user.altura){
                    valuesSet +=  "altura = '" + idAltura.value + "',";
                    localStorage.setItem('altura', idAltura.value)
                }
            }else{
                valuesSet +=  "altura = '" + idAltura.value + "',";
                localStorage.setItem('altura', idAltura.value)
            }

            
            if(user.peso != ""){
                if( idPeso.value != user.peso){
                    valuesSet +=  "peso = '" + idPeso.value  + "',";
                    localStorage.setItem('peso', idPeso.value)
                }
            }else{
                valuesSet +=  "peso = '" + idPeso.value  + "',";
                localStorage.setItem('peso', idPeso.value)
            }
            
            if(user.sexo != ""){
                if(sexo.value != user.sexo){
                    valuesSet +=  "sexo = '" + sexo.value  + "',";
                    localStorage.setItem('sexo', sexo.value)
                }
            }else{
                valuesSet +=  "sexo = '" + sexo.value  + "',";
                localStorage.setItem('sexo', sexo.value)
            }


            if(user.tipo != ""){
                if(tipoAlimentacion.value != user.tipo){
                    valuesSet += "tipoAlimentacion = '" +  tipoAlimentacion.value + "',";
                    localStorage.setItem('tipo', tipoAlimentacion.value)
                }

            }else{
                valuesSet += "tipoAlimentacion = '" +  tipoAlimentacion.value + "',";
                localStorage.setItem('tipo', tipoAlimentacion.value)

            }


  
    

            if(valuesSet != ""){
                var setValues = valuesSet.substring(0, valuesSet.length - 1);
                var sqlSet = "UPDATE usuarios SET " + setValues + " WHERE email = ?";
                console.log(sqlSet);
                conn.query(sqlSet ,user.email, function (err, result) {
                    if (err){
                        dbox(err);
                    }else{
                      console.log("bien");
                    }
                    
                });
            }
            
            if(suscripcion){
                console.log(fechaInicio + " " + fechaFinal)
                var sqlQueryAdmin = "INSERT INTO suscripcion (usuario, caducada, fecha_inicio, fecha_fin) VALUES ('" + user.email + "',false,'" + fechaInicio + "','" + fechaFinal + "')";
                conn.query(sqlQueryAdmin,(error,result,fields) => {
                    if(error){
                        dbox (error);
                    }else{
                        dbox ("Gracias por suscribirte a My Balance");
                    }            
                });
            }
            
    }catch(error){
        console.log(error)
        dbox(error);
    }
    




}





exports.setUser = setUser;
exports.setInfo = setInfo;
exports.insertHtml = insertHtml;
