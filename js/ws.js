var ws = new WebSocket("ws://localhost:4444/websocket");
console.log(`made a websocket ${ws}`)
var keepAlive = setInterval(function() { ws.send("PING"); }, 1000);
const state= {
    DISCONNECTED: 0,
    CONNECTED: 1,
    READY_TO_START_GAME: 2,
    PLAYING_GAME: 3,
    WAITING_FOR_OTHERS: 4,
    PLAYING: 5,
    END_OF_GAME: 6
};
var info = {
    "state_of_game": state.DISCONNECTED,
    "am_ready": true
}

// CONNECTED message when starting connection
ws.onopen = function () {
    info["state_of_game"] = state.CONNECTED;
    ws.send(JSON.stringify(info));
};

ws.onmessage = function (evt) {
    console.log(evt.data);
    // here i will use the JSON object to do various things
};

ws.onclose = function (evt) {
    console.log("Closed");
};
