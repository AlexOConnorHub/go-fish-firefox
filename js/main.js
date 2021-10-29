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
        obj = JSON.parse(event.data);
        // we want to figure out a way to not call this every single time
        // if (game != event.data) {
            //     game = obj;
        // }
        game = obj;
        console.log(game);
        handleStates();
    };
    ws.onclose = function (evt) {
        info.state_of_game = state.DISCONNECTED;
        console.log("Closed");
    };
};

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
// tells server we're ready
let start = () => {
    dq(".module").remove();
    info.am_ready = true;
    info.state_of_game = state.READY_TO_START_GAME;
    send();
} // lets player say that they aren't ready
let cancel = () => {
    dq(".module").remove();
    info.am_ready = false;
    info.state_of_game = state.CONNECTED;
    send();
} // asks player for card
let ask = () => {
    dq(".module").remove();
    info.card_played = dq("input.ask").value;
    info.player_asked = "1"
    info.state_of_game = state.READY_TO_START_GAME;
    send();
}
let handleStates = () => {
    switch (game.state) {
    case 0:
        break;
    case 1:
        dq(".module")?.remove();
        buildStartModule();
        break;
    case 2:
        dq(".module")?.remove();
        buildCancelModule();
        break;
    case 3:
    case 4:
        drawBoard();
        break;
    case 5:
        dq(".module")?.remove();
        drawBoard();
        buildPlayModule();
        break;
    case 6:
        console.log(`end game: ${game.state}.`);
        break;
    default:
        console.log(`invalid state: ${game.state}.`);
    }
  }
// start
getID();