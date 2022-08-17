
function dbox (msg) {
    if (msg != undefined) {
      document.getElementById("boxTxt").innerHTML = msg;
      document.getElementById("boxBack").classList.add("show");
    } else { document.getElementById("boxBack").classList.remove("show"); }
}


function dboxSuscripcion(){
      document.getElementById("boxCancel").classList.add("show");  
}


