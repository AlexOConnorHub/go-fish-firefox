var  ws = new WebSocket("ws://localhost:8080/websocket");
ws.onopen = function() {
    ws.send("Hello, world");
};
ws.onmessage = function (evt) {
    console.log(evt.data);
};

var clickButton = function() {
    ws.send("Test");
}