var id = 0
function sendMessageRender(message,dFormat) {
    if (message != "") {
        let form = document.getElementById("message");
        id += 1
        form.innerHTML += "<div class=\"send-line\" id=\"send-line-" + id + "\">"
        console.log("send-line-" + id + "\"")
        let div = document.getElementById("send-line-" + id)
        div.innerHTML += "<li>" + message + "</li>"
        div.innerHTML += "<p>" + dFormat + "</p>"
        $('#message')[0].scrollIntoView(false);
        /*
        $input.val("");
        $('#message')[0].scrollIntoView(false);*/
    }
    return false;
}


function receivedMessageRender(message, dFormat) {
    let form = document.getElementById("message");
    id += 1
    form.innerHTML += "<div class=\"get-line\" id=\"get-line-" + id + "\">"
    let div = document.getElementById("get-line-" + id)
    div.innerHTML += "<li>" + message + "</li>"
    div.innerHTML += "<p>" + dFormat + "</p>"
    $('#message')[0].scrollIntoView(false);

}


function sentMessageRender(message, dFormat) {
    let form = document.getElementById("message");
    id += 1
    form.innerHTML += "<div class=\"send-line\" id=\"send-line-" + id + "\">"
    console.log("send-line-" + id + "\"")
    let div = document.getElementById("send-line-" + id)
    div.innerHTML += "<li>" + message + "</li>"
    div.innerHTML += "<p>" + dFormat + "</p>"
    $('#message')[0].scrollIntoView(false);
}



