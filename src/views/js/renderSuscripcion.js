
function renderSuscripcion(fecha_inicioS, fecha_finS, nombre, email, idsuscripcion, dietaAsignada, Novistos, AlimModificar) {
    try {
      tr = $('<tr/>');
      let fechaInicioS = fecha_inicioS
      let fechaFinS = fecha_finS
      //let fechaInicioD = fecha_inicio
      //let fechaFinD = fecha_fin
  
      let fechaFin = new Date(fechaFinS);
      let fechaInicio = new Date(fechaInicioS);
      //let fechaFind = new Date(fechaFinD);
      //let fechaIniciod = new Date(fechaInicioD);
  
      let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()
      let fechaFinFormat = fechaFin.getDate().toString().padStart(2, "0") + "-" + (fechaFin.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaFin.getFullYear()
   
      //let fechaInicioFormatD = fechaIniciod.getDate().toString().padStart(2, "0") + "-" + (fechaIniciod.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaIniciod.getFullYear()
  
      console.log(dietaAsignada + " " + Novistos + " " + AlimModificar)
      console.log(dietaAsignada)
      if (dietaAsignada > 0) {
        tr.append("<td class=\"table-warning\">" + nombre + "</td>");
        tr.append("<td class=\"table-warning\">" + email + "</td>");
        tr.append("<td class=\"table-warning\">" + fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear() + "</td>");
        tr.append("<td class=\"table-warning\">" + fechaFin.getDate().toString().padStart(2, "0") + "-" + (fechaFin.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaFin.getFullYear() + "</td>");
       
        if(AlimModificar > 0){ 
          tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\">Modificar dieta</a>" + "</td>");
        }else{
          tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\">Ver dieta</a>" + "</td>");
        }
       
        $('table').first().append(tr);

        tr2 = $('<tr/>');     
        tr2.css("border", "0"); 
        
 
            
        let html = "<td style=\"height: 100%\">"
        html += "<div style = \"height: 100%; width: 100%;\" class=\"alert alert-warning\" role=\"alert\">"
        html +=  "<a href=\"chatAdmin.html?gmail=" + email + "\"> Mensajes: " + Novistos + " </a>"
        html += "</div></td>"
        tr2.append(html);
        $('table').first().append(tr2);
  
      } else {
        tr2 = $('<tr/>');     
        tr2.css("border", "0"); 
        let html = "<td style=\"height: 100%\">"
        html += "<div style = \"height: 100%; width: 100%;\" class=\"alert alert-warning\" role=\"alert\">"
        html +=  "<a href=\"chatAdmin.html?gmail=" + email + "\"> Mensajes: " + Novistos + " </a>"
        html += "</div></td>"
        tr2.prepend(html);
        $('table').first().prepend(tr2);


        tr.prepend("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\" + idsuscripcion>Asignar dieta</a>" + "</td>");
        $('table').first().prepend(tr);


        tr.prepend("<td class=\"table-warning\">" + fechaFin.getDate().toString().padStart(2, "0") + "-" + (fechaFin.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaFin.getFullYear() + "</td>");
        tr.prepend("<td class=\"table-warning\">" + fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear() + "</td>");
        tr.prepend("<td class=\"table-warning\">" + email + "</td>");
        tr.prepend("<td class=\"table-warning\">" + nombre + "</td>");
      
      }
    } catch (error) {
      console.log(error)
      dbox(error)
    }
  }