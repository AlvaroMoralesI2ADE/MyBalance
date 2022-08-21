let alimento = document.getElementById('Buscador');
const añadir = document.getElementById('AñadirAlimento');
const eliminar = document.getElementById('EliminarAlimento');
let tipo = document.getElementById('tipo');



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








añadir.addEventListener("click", function () {
    try {
        var alim = alimento.value;
        var type = tipo.value;
        console.log(alimento);
        if (alimento.value != "") {
            let request = 'http://localhost:8000/api/insertAlimento?'
            request += 'alimento=' + alim
            request += '&tipo=' + type

            $.getJSON(request).done(function (result) {
                dbox("Alimento añadido correctamente. " + alim + " (" + type + ")");
            });

            alimento.value = "";
        }
    } catch (error) {
        dbox(error);
    }




});




eliminar.addEventListener("click", function () {
    try {
        if (alimento.value != "") {
            var alim = alimento.value;
            var type = tipo.value;

            let request = 'http://localhost:8000/api/deleteAlimento?'
            request += 'alimento=' + alim

            $.getJSON(request).done(function (result) {
                dbox("Alimento eliminado correctamente. " + alim + " (" + type + ")");
            });

            alimento.value = "";


        }

    } catch (error) {
        dbox(error);
    }
});


