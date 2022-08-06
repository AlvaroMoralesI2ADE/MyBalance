const { insertSuscripcion, updateUsuario } = require('../../../src/models/user');
const { app } = require('../../../src/controllers/expressApp.js');

app.listen(8000, () => {
    console.log("Sever is Running");
})


app.get("/api/updateUsuario", (req, res) => {
    updateUsuario(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});


app.get('/api/insertSuscripcion', (req, res) => {
    insertSuscripcion(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
    );
});

const setUser = (suscripcion) => {
    try {

        var user = new Usuario(localStorage.getItem('user'), localStorage.getItem('nombre'), localStorage.getItem('edad'),
            localStorage.getItem('altura'), localStorage.getItem('peso'), localStorage.getItem('tipo'), localStorage.getItem('sexo'), "")

        if(suscripcion){
            var fechaInicioSelect = document.getElementById('fechaSuscripcion')
            let fechaInicio = fechaInicioSelect.value

            let fechaFinalF = addDays(fechaInicio, 28)
            let fechaFinal = fechaFinalF.toISOString().split('T')[0]
        }


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
            requestU +=  '&email=' + user.email
            $.getJSON(requestU).done(function (result) {
                dbox("Datos actualizados");
            });

        
        }

        if (suscripcion) {
            let request = 'http://localhost:8000/api/insertSuscripcion?email=' + user.email
            request += '&fechaInicio=' + fechaInicio
            request += '&fechaFinal=' + fechaFinal

            $.getJSON(request).done(function (result) {
                dbox("Gracias por suscribirte a My Balance");
            });
        }


    } catch (error) {
        console.log(error)
        dbox(error);
    }

}



