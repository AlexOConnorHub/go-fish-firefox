// Leave at top, makes websocket
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
var state_of_game = state.DISCONNECTED;

// CONNECTED message when starting connection
ws.onopen = function () {
    ws.send("CONNECTED");
    state_of_game = state.CONNECTED;
};

// Upon receiving a message ...
ws.onmessage = function (evt) {
    console.log(evt.data);
};

// When we close do this:
ws.onclose = function (evt) {
    console.log("Closed");
};

// Add functions here
handler = function() { // called when increment is clicked
    ws.send("INCREMENT");
}

// This is where to add event listeners
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("TestButton").addEventListener("click", handler);
});

