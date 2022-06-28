const Usuario = require('./../../src/js/user');
const { getConnection } = require('./../../src/js/database');
const conn = getConnection()
const insertHtml = (value) => {
    
    const data = document.getElementById("camposUsuario");


    data.innerHTML = "<form action=\"#\" method=\"post\" id = \"form\">"

    const dataForm = document.getElementById("form");
 
    dataForm.innerHTML += "<div class=\"suscripcion-input\" id=\"suscInput1\" style=\"color:white; float: left;width: 200px;\">";


    const data2 = document.getElementById("suscInput1");
    data2.innerHTML += "<label id=\"labelNombre\"> Nombre <span class=\"req\"></span>";
    data2.innerHTML += "  </label> <input type=\"text\" id=\"idNombre\" required>";
    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput2\" style=\"float: right; width: 200px;\">"
    const data3 = document.getElementById("suscInput2");
    data3.innerHTML += "<label id=\"labelEdad\">  Edad <span class=\"req\"></span>";
    data3.innerHTML += " </label> <input type=\"number\" id=\"idEdad\" required></div>";
    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput3\" style=\"float: left; width: 200px;\">";

    const data4 = document.getElementById("suscInput3");
    data4.innerHTML += "<label id=\"labelPeso\"> Peso en kg  <span class=\"req\"></span>";
    data4.innerHTML += " </label> <input type=\"number\" id=\"idPeso\" required></div>";

    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput4\" style=\"float: right; width: 200px;\">";
    const data5 = document.getElementById("suscInput4");
    data5.innerHTML += "<label id=\"labelAltura\">Altura en cm <span class=\"req\"></span>";
    data5.innerHTML += " </label> <input type=\"number\" id=\"idAltura\" required></div>";

    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput5\" style=\"float: left; \">";
    const data6 = document.getElementById("suscInput5");
    data6.innerHTML += "<p id=\"p\" style=\" float:left; color:white; ;font-size: 20px; margin: 2px;\">Sexo:";
    const data7 = document.getElementById("p");


    data7.innerHTML += "<select name=\"sexo\" id = \"sexo\">";
    const data8 = document.getElementById("sexo");
    data8.innerHTML += "<option selected=\"yes\" value = \"H\">Hombre</option>";
    data8.innerHTML += "<option value = \"M\">Mujer</option>";
    data8.innerHTML += "<option value = \"O\">Otro</option>";



    dataForm.innerHTML +=" <div class=\"suscripcion-input\" id=\"suscInput6\" style=\"float: right; \">";
    const data9 = document.getElementById("suscInput6");
    data9.innerHTML += "<p id=\"p2\" style=\" float:right; color:white; ;font-size: 20px; margin: 2px;\">Tipo Dieta:";
    

    const data10 = document.getElementById("p2");
    data10.innerHTML += "<select name=\"my_html_select_box\" id = \"tipoAlimentacion\">";

    const data11 = document.getElementById("tipoAlimentacion");
    data11.innerHTML += "<option value = \"Completa\">Completa</option>";
    data11.innerHTML += "<option value = \"Vegana\">Vegana</option>";
    data11.innerHTML += "<option value = \"Vegetariana\">Vegetariana</option>";
    
    dataForm.innerHTML += "<input type=\"submit\" id = \"set\" class=\"suscripcionButton button-block\" value=\"" + value  + "\" >";

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
                var sqlQueryAdmin = "INSERT INTO suscripcion (usuario, caducada) VALUES (?,false)";
                conn.query(sqlQueryAdmin, user.email, (error,result,fields) => {
                    if(error){
                        dbox (error);
                    }else{
                        dbox ("Gracias por suscribirte a My Balance");
                    }            
                
                });
            }
            /*
            */
 



        
    }catch(error){
        dbox(error);
    }
    




}





exports.setUser = setUser;
exports.setInfo = setInfo;
exports.insertHtml = insertHtml;
