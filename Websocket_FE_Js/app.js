let stompClient = null;

function connect() {
    let socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("ok")
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (message) {
            showMessage(JSON.parse(message.body).greeting);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/gkz/hello", {}, JSON.stringify({'message': $("#textMessage").val()}));
}


function showMessage(message) {
    document.querySelector("#textAreaMessage").innerHTML += `<p>${message}</p>`;
    $("#textMessage").val("")

}

$(function () {
    connect();
    $("#send").click(function () {
        sendMessage()
    });
});
