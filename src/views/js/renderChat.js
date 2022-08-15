var id = 0
function sendMessageRender(message,d) {
    dFormat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
    [d.getHours(),
        ('0' + d.getMinutes()).slice(-2)
        ].join(':');
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


function receivedMessageRender(message, d) {
    dFormat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
    [d.getHours(),
        ('0' + d.getMinutes()).slice(-2)
        ].join(':');
    let form = document.getElementById("message");
    id += 1
    form.innerHTML += "<div class=\"get-line\" id=\"get-line-" + id + "\">"
    let div = document.getElementById("get-line-" + id)
    div.innerHTML += "<li>" + message + "</li>"
    div.innerHTML += "<p>" + dFormat + "</p>"
    $('#message')[0].scrollIntoView(false);

}


function sentMessageRender(message, d) {
    dFormat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
    [d.getHours(),
        ('0' + d.getMinutes()).slice(-2)
        ].join(':');
    let form = document.getElementById("message");
    id += 1
    form.innerHTML += "<div class=\"send-line\" id=\"send-line-" + id + "\">"
    console.log("send-line-" + id + "\"")
    let div = document.getElementById("send-line-" + id)
    div.innerHTML += "<li>" + message + "</li>"
    div.innerHTML += "<p>" + dFormat + "</p>"
    $('#message')[0].scrollIntoView(false);
}



