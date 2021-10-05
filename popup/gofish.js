// Leave at top, makes websocket
var ws = new WebSocket("ws://localhost:4444/websocket");
var keepAlive = setInterval(function() { ws.send("PING"); }, 55000);

// INIT message upon connection
ws.onopen = function () {
    ws.send("INIT");
};

// Upon receiving a message
ws.onmessage = function (evt) {
    console.log(evt.data);
};

// Add functions here
handler = function() {
    ws.send("Test");
}

random = function() {
    console.log("Hello");
}

// This is where to add event listeners
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("TestButton").addEventListener("click", handler);
});

