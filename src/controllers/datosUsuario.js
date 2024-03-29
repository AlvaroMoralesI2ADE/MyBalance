const setUser = (suscripcion) => {
    try {

        var user = new Usuario(localStorage.getItem('user'), localStorage.getItem('nombre'), localStorage.getItem('edad'),
            localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), localStorage.getItem('sexo'), "")



        var valuesSet = "";


        if (idNombre.value != user.nombre) {
            valuesSet += "nombre = '" + idNombre.value + "',";
            localStorage.setItem('nombre', idNombre.value)

        }



        if (user.edad != "") {
            if (idEdad.value != user.edad) {
                valuesSet += "edad = '" + idEdad.value + "',";
                localStorage.setItem('edad', idEdad.value)
            }
        } else {
            valuesSet += "edad = '" + idEdad.value + "',";
            localStorage.setItem('edad', idEdad.value)
        }

        if (user.altura != "") {
            if (idAltura.value != user.altura) {
                valuesSet += "altura = '" + idAltura.value + "',";
                localStorage.setItem('altura', idAltura.value)
            }
        } else {
            valuesSet += "altura = '" + idAltura.value + "',";
            localStorage.setItem('altura', idAltura.value)
        }


        if (user.peso != "") {
            if (idPeso.value != user.peso) {
                valuesSet += "peso = '" + idPeso.value + "',";
                localStorage.setItem('peso', idPeso.value)
            }
        } else {
            valuesSet += "peso = '" + idPeso.value + "',";
            localStorage.setItem('peso', idPeso.value)
        }

        if (user.sexo != "") {
            if (sexo.value != user.sexo) {
                valuesSet += "sexo = '" + sexo.value + "',";
                localStorage.setItem('sexo', sexo.value)
            }
        } else {
            valuesSet += "sexo = '" + sexo.value + "',";
            localStorage.setItem('sexo', sexo.value)
        }


        if (user.tipo != "") {
            if (tipoAlimentacion.value != user.tipo) {
                valuesSet += "tipoAlimentacion = '" + tipoAlimentacion.value + "',";
                localStorage.setItem('tipo', tipoAlimentacion.value)
            }

        } else {
            valuesSet += "tipoAlimentacion = '" + tipoAlimentacion.value + "',";
            localStorage.setItem('tipo', tipoAlimentacion.value)

        }





        if (valuesSet != "") {
            var setValues = valuesSet.substring(0, valuesSet.length - 1);

            let requestU = 'http://localhost:8000/api/updateUsuario?setValues=' + setValues
            requestU += '&email=' + user.email
            $.getJSON(requestU).done(function (result) {
                if (suscripcion != true) {
                    dbox("Datos actualizados");
                }
            });
        }

        if (suscripcion) {
            var fechaInicioSelect = document.getElementById('fechaSuscripcion')
            let fechaInicio = fechaInicioSelect.value

 

            let request = 'http://localhost:8000/api/insertSuscripcion?email=' + user.email
            request += '&fechaInicio=' + fechaInicio
      

            console.log(request)
            $.getJSON(request).done(function (result) {
                dboxSuscripcion();
            });
        }


    } catch (error) {
        console.log(error)
        dbox(error);
    }

}




function añadirAlergia() {
    try {
        var input = document.getElementById("idAlimento");
        var alimento = input.value;

        if (alimento != "") {
            let usuario = localStorage.getItem('user')
            let request = "http://localhost:8000/api/insertAlergia?email=" + usuario
            request += "&alimento=" + alimento

     
            $.getJSON(request).done(function (result) {
                if (result) {
                    renderAlimentoAlergia(alimento)
                } else {
                    dbox("Ha ocurrido un error")
                }
            });
        } else {
            dbox("Escribe un alimento por favor")
        }



    } catch (err) {
        console.log(err)
    }

}


function getAlergias() {
    let alimentos = []
    try {
        let usuario = localStorage.getItem('user')
        let request = "http://localhost:8000/api/selectAlergia?email=" + usuario
        $.getJSON(request).done(function (result) {
            if (result.length > 0) {
                result.forEach(element => {    
                    alimentos.push(element.alimento)
                });
            } 

            setInfo(alimentos);
        });

        console.log(alimentos)


    } catch (err) {
        console.log(err)
    }

    return alimentos


}