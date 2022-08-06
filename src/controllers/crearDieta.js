const { getConnection } = require('../../../src/database/database');

const conn = getConnection();


const { app } = require('../../../src/controllers/expressApp.js');

const Comida = require('../../../src/controllers/comida');
const { selectDieta } = require('../../../src/models/dieta')
const { selectAlimento } = require('../../../src/models/alimentos')


const añadir = document.getElementById('Añadir');
const guardar = document.getElementById('guardarDieta');
var cantidad = document.getElementById("Idcantidad");
var dia = document.getElementById("dia");
var comida = document.getElementById("comida");
var alimento = document.getElementById("Buscador");
var nombre = document.getElementById("IdNombre");

let comidas = []

$(function () {
    $("#Buscador").autocomplete({
      classes: {
        "ui-autocomplete": "highlight"
      },
      name: 'buscador',
      source: 'http://localhost:8000/api/searchAlimento?key=%QUERY',
      messages: {
        noResults: 'No se ha encontrado ningun alimento',

      },
      limit: 4
    });
  });



app.listen(8000, () => {
    console.log("Sever is Running");
})

app.get("/api/searchAlimento", (req, res) => {
    selectAlimento(
      conn,
      req.query.term,
      (result) => {
        res.json(result);
      }
    );
});



      




//Añade alimento-cantidad a la comida correspondiente
añadir.addEventListener("click", function () {
    try {
        if (alimento.value != "") {
            var tr;
            if (comidas.length < 1) {
                comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1));
                renderFirstAlimento(comida.value , dia.value, alimento.value, Idcantidad.value)
    

            } else {
                var pos = -1
                //USAR MAP
                for (let i = 0; i < comidas.length; i++) {
                    if (comidas[i].mismaComida(comida.value, dia.value)) {
                        pos = i
                    }
                }
                if (pos != -1) {
                    if (comidas[pos].añadirAlimento((alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value)) {
                        renderAlimento(comida.value, dia.value, Idcantidad.value, alimento.value, comidas, pos)       
                    } else {
                        dbox("No puedes añadir el mismo alimento en la misma comida")
                    }


                } else {
                    comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1))
                    renderFirstAlimento(comida.value , dia.value, alimento.value, Idcantidad.value)
                }
            }



            Idcantidad.value = ""
            alimento.value = ""
        }
    } catch (error) {
        console.log(error)
        dbox(error)
    }

});


//PASAR COMO PARÁMETRO DIV?
function eliminarAlimento(id) {
    try {
        var dropdown_item_id = id.replace('btn-drop', 'dropdown-item')
        var dropdown_menu_id = id.replace('btn-drop', 'dropdown-menu')

        var dropdown_item = document.getElementById(dropdown_item_id)
        var dropdown_menu = document.getElementById(dropdown_menu_id)
        var btn_drop = document.getElementById(id)

        dropdown_item.remove()
        btn_drop.remove()
        dropdown_menu.remove()

        var array = id.split("-")

        comidas.forEach(comida => {
            if (comida.mismaComida(array[2], array[3] + "-" + array[4] + "-" + array[5])) {
                comida.eliminarAlimento(array[7] + "-" + array[2] + "-" + array[3] + "-" + array[4] + "-" + array[5])
            }
        });
        //my_map.delete(key)


        //BUSCAR EL ALIMENTO EN EL 

    } catch (error) {
        dbox(error)
    }

}




guardar.addEventListener("click", function () {

    try {
        if(nombre.value != "" && comidas.length > 0){


            /* COMPROBAR QUE NO EXISTE SINO HAY QUE AÑADIR O ELIMINAR...
            comidas.forEach(comida => {
                comida.prepareSqlModelo(nombre.value)
                query += comida.sql 
            });*/

            let query = "INSERT INTO dieta_modelo (nombre) VALUES (\"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo) VALUES (" + 1 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo) VALUES (" + 2 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo)  VALUES (" + 3 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo)  VALUES (" + 4 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo)  VALUES (" + 5 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo)  VALUES (" + 6 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_del_dia_modelo (dia, dieta_modelo)  VALUES (" + 7 + ", \"" + nombre.value + "\"); \n"
        

            comidas.forEach(comida => {
                comida.prepareSqlModelo(nombre.value)
                query += comida.sql
            });

            console.log(query)
            
            conn.query(query, (error,result,fields) => {
                if(error){
                    dbox(error);
                    console.log(error)
                }else{
                    dbox("La dieta ha sido guardada como " + nombre.value)
                    comidas = []
                   
                }
            });
            
        




        }else{
            if(nombre.value != ""){
                dbox("Tienes que incluir al menos un alimento")
            }else{
                dbox("Por favor, introduzca un nombre")
            }
          
        }
       
    } catch (error) {
        dbox(error)
    }


});