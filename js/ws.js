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
    state_of_game : state.DISCONNECTED,
    am_ready : false
}
var game = {};

let send = () => {ws.send(JSON.stringify(info));}
// CONNECTED message when starting connection
ws.onopen = function () {
    info.state_of_game = state.CONNECTED;
    send();
    buildStartModule();
};
ws.onmessage = function (event) {
    obj = JSON.parse(event.data);
    // we want to figure out a way to not call this every single time
    if (game != event.data) {
        game = obj;
        drawGame();
    }
};
ws.onclose = function (evt) {
    info.state_of_game = state.DISCONNECTED;
    console.log("Closed");
};

let start = (e) => {
    info.am_ready = true;
    info.state_of_game = state.READY_TO_START_GAME;
    send();
    dq(".module").remove();
}