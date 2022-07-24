const { getConnection } = require('./../../src/js/database');

const conn = getConnection();


const { app } = require('./../../src/js/renderApp.js');

const Comida = require('./../../src/js/comida');




const añadir = document.getElementById('Añadir');
const guardar = document.getElementById('guardarDieta');
var cantidad = document.getElementById("Idcantidad");
var dia = document.getElementById("dia");
var comida = document.getElementById("comida");
var alimento = document.getElementById("Buscador");
var nombre = document.getElementById("IdNombre");

let comidas = []



app.get('/search', function (req, res) {
    conn.query('SELECT alimento FROM alimentos WHERE alimento LIKE "%' + req.query.term + '%"',
        function (err, rows, fields) {
            if (err) throw err;
            var data = [];
            for (i = 0; i < rows.length; i++) {
                if (i < 5) {
                    data.push(rows[i].alimento);
                }

            }
         
            res.end(JSON.stringify(data));
        });
});
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {

});



//Añade alimento-cantidad a la comida correspondiente
añadir.addEventListener("click", function () {

    try {
        if (alimento.value != "") {
            var tr;
            if (comidas.length < 1) {
                comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1));
                var data2 = document.getElementById(comida.value + "-" + dia.value);
                
                data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + 1 + "\">"
                var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + 1)
                data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value)
                data4.innerHTML += alimento.value + " " + Idcantidad.value
                data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
             
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
                        var data = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                        if (data.clientWidth > 250) {
                            var data2 = document.getElementById(comida.value + "-" + dia.value);
                            data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width + 1) + "\">"
                            document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width + 1)).style.margin = "5px";
                            var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn_group_width + 1))
                            data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value)
                            data4.innerHTML += alimento.value + " " + Idcantidad.value
                            data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                            comidas[pos].incrementBtn_group_width()
                            comidas[pos].incrementBtn()
                        } else {

                            var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + comidas[pos].btn_group_width)
                            data3.innerHTML += "<p>&nbsp</p>"
                            data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                            var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value)
                            data4.innerHTML += alimento.value + " " + Idcantidad.value
                            data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + (comidas[pos].btn + 1) + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + + (comidas[pos].btn + 1) + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"
                            comidas[pos].incrementBtn()
                        }
                    } else {
                        dbox("No puedes añadir el mismo alimento en la misma comida")
                    }


                } else {
                    comidas.push(new Comida(comida.value, dia.value, (alimento.value + "-" + comida.value + "-" + dia.value), Idcantidad.value, 1, 1))
                    var data2 = document.getElementById(comida.value + "-" + dia.value);
                    data2.innerHTML += "<div class=\"btn-group\" id=\"btn-" + comida.value + "-" + dia.value + "-" + 1 + "\">"
                    var data3 = document.getElementById("btn-" + comida.value + "-" + dia.value + "-" + 1)
                    data3.innerHTML += "<button id = \"btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\" class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">"
                    var data4 = document.getElementById("btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value)
                    data4.innerHTML += alimento.value + " " + Idcantidad.value
                    data3.innerHTML += "<ul class=\"dropdown-menu\" id = \"dropdown-menu-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"> <li><a class=\"dropdown-item\"  id = \"dropdown-item-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "\"href=\"#\" onclick=\"eliminarAlimento('" + "btn-drop-" + comida.value + "-" + dia.value + "-" + 1 + "-" + alimento.value + "')\">Eliminar</a></li> </ul> </div>"


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


            /* COMPROBAR QUE NO EXISTE
            comidas.forEach(comida => {
                comida.prepareSqlModelo(nombre.value)
                query += comida.sql 
            });*/

            let query = "INSERT INTO dieta_modelo (nombre) VALUES (\"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo) VALUES (" + 1 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo) VALUES (" + 2 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo)  VALUES (" + 3 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo)  VALUES (" + 4 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo)  VALUES (" + 5 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo)  VALUES (" + 6 + ", \"" + nombre.value + "\"); \n"
            query += "INSERT INTO comidas_dia_modelo (dia, dieta_modelo)  VALUES (" + 7 + ", \"" + nombre.value + "\"); \n"
        
            comidas.forEach(comida => {
                comida.prepareSqlModelo(nombre.value)
                query += comida.sql
            });

            
            conn.query(query, (error,result,fields) => {
                if(error){
                    dbox(error);
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