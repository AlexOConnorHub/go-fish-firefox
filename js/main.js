let ws;
// called after uuid is obtained
let main = () => {
    ws = new WebSocket(`ws://localhost:4444/websocket/${uuid}`);
    console.log(`made a websocket ${ws}`)
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
            console.log(game);
        }
    };
    ws.onclose = function (evt) {
        info.state_of_game = state.DISCONNECTED;
        console.log("Closed");
    };
};
// start
getID();