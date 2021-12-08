let ws;
// called after uuid is obtained
let main = () => {
    host = "10.14.2.1";
    port = 10000
    ws = new WebSocket(`ws://${host}:${port}/websocket/${uuid}`);
    var keepAlive = setInterval(function() { ws.send("PING"); }, 1000);
    // CONNECTED message when starting connection
    ws.onopen = function () {
        info.state_of_game = state.CONNECTED;
        ws.send("PING");
    };
    ws.onmessage = function (event) {
        if (final != event.data) {
            final = event.data;
            game = JSON.parse(final);
            handleStates();
        }
    };
    ws.onclose = function (evt) {
        info.state_of_game = state.DISCONNECTED;
        console.log("Closed");
    };
};
// start
getID();