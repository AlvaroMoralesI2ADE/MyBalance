
/*
function renderSuscripcion(fechaInitS, fechaInitD,  nombre, email, idsuscripcion, dietaAsignada, Novistos, AlimModificar, cont) {
    try {
      tr = $('<tr/>');
      let fechaInicio = new Date(fechaInitS);
      let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()
      
      let fechaInicioD = new Date(fechaInitD);
      let fechaInicioFormatD = fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear()
   
      console.log(fechaInicio)

      if (dietaAsignada > 0) {
        tr.append("<td class=\"table-warning\">" + nombre + "</td>");
        tr.append("<td class=\"table-warning\">" + email + "</td>");
        tr.append("<td class=\"table-warning\">" + fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear() + "</td>");
       

        if(AlimModificar > 0){ 
          //tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\">Modificar dieta</a>" + "</td>");
          tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormatD  + "&suscripcion=" + idsuscripcion  + "&semanaI=" +  fechaInicioFormat + "&num=" + cont + "\">Modificar dieta</a>" + "</td>");
        }else{
          //tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\">Modificar dieta</a>" + "</td>");
          tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormatD  + "&suscripcion=" + idsuscripcion  + "&semanaI=" +  fechaInicioFormat  + "&num=" + cont + "\">Ver dieta</a>" + "</td>");
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

        //tr.prepend("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\">Modificar dieta</a>" + "</td>");
        tr.prepend("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormatD + "&suscripcion=" + idsuscripcion + "&semanaI=" + fechaInicioFormat + "&num=" + cont + "\">Asignar dieta</a>" + "</td>");
        $('table').first().prepend(tr);


        tr.prepend("<td class=\"table-warning\">" + fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear() + "</td>");
        tr.prepend("<td class=\"table-warning\">" + email + "</td>");
        tr.prepend("<td class=\"table-warning\">" + nombre + "</td>");
      
      }
    } catch (error) {
      console.log(error)
      dbox(error)
    }
  }

*/

  
function renderSuscripcion(fechaInitS, fechaInitD,  nombre, email, idsuscripcion, dietaAsignada, Novistos, AlimModificar, cont) {
  try {
    tr = $('<tr/>');
    let fechaInicio = new Date(fechaInitS);
    let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()
    
    let fechaInicioD = new Date(fechaInitD);
    let fechaInicioFormatD = fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear()
 
    console.log(fechaInicio)

    
      tr.append("<td class=\"table-warning\">" + nombre + "</td>");
      tr.append("<td class=\"table-warning\">" + email + "</td>");
      tr.append("<td class=\"table-warning\">" + fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear() + "</td>");
     

        //tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormat + "&suscripcion=" + idsuscripcion + "&semanaF=" + fechaFinFormat  + "&semanaI=" +  fechaInicioFormat + "&num=1\">Modificar dieta</a>" + "</td>");
        tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormatD  + "&suscripcion=" + idsuscripcion  + "&semanaI=" +  fechaInicioFormat + "&num=" + cont + "\">Asignar dieta</a>" + "</td>");
      
     
      $('table').first().append(tr);

      tr2 = $('<tr/>');     
      tr2.css("border", "0");            
      let html = "<td style=\"height: 100%\">"
      html += "<div style = \"height: 100%; width: 100%;\" class=\"alert alert-warning\" role=\"alert\">"
      html +=  "<a href=\"chatAdmin.html?gmail=" + email + "\"> Mensajes: " + Novistos + " </a>"
      html += "</div></td>"
      tr2.append(html);
      $('table').first().append(tr2);


    
    
  } catch (error) {
    console.log(error)
    dbox(error)
  }
}







function renderSuscripcionMod(fechaInitS, fechaInitD,  nombre, email, idsuscripcion, dietaAsignada, Novistos, AlimModificar, cont) {
    
  let fechaInicio = new Date(fechaInitS);
  let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()
  
  let fechaInicioD = new Date(fechaInitD);
  let fechaInicioFormatD = fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear()
  tr = $('<tr/>');
  
  tr.append("<td class=\"table-warning\">" + nombre + "</td>");
  tr.append("<td class=\"table-warning\">" + email + "</td>");
  tr.append("<td class=\"table-warning\">" + fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear() + "</td>");
    
  tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormatD  + "&suscripcion=" + idsuscripcion  + "&semanaI=" +  fechaInicioFormat + "&num=" + cont + "\">Modificar dieta</a>" + "</td>");
  $('table').first().append(tr);

}




function renderSuscripcionVer(fechaInitS, fechaInitD,  nombre, email, idsuscripcion, dietaAsignada, Novistos, AlimModificar, cont) {
    let fechaInicio = new Date(fechaInitS);
    let fechaInicioFormat = fechaInicio.getDate().toString().padStart(2, "0") + "-" + (fechaInicio.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicio.getFullYear()
    let fechaInicioD = new Date(fechaInitD);
    let fechaInicioFormatD = fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear()
    tr = $('<tr/>');  
    tr.append("<td class=\"table-warning\">" + nombre + "</td>");
    tr.append("<td class=\"table-warning\">" + email + "</td>");
    tr.append("<td class=\"table-warning\">" + fechaInicioD.getDate().toString().padStart(2, "0") + "-" + (fechaInicioD.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaInicioD.getFullYear() + "</td>");
  
    tr.append("<td>" + "<a class=\"buttonTable\" href=\"adminAsignarDieta.html?gmail=" + email + "&semana=" + fechaInicioFormatD  + "&suscripcion=" + idsuscripcion  + "&semanaI=" +  fechaInicioFormat + "&num=" + cont + "\">Ver dieta</a>" + "</td>");
  $('table').first().append(tr);

}