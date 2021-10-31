// helpers
let dq = (sel) => {return document.querySelector(sel);}
let dc = (tag, classes = null, text = null) => {
  let elem = document.createElement(tag);
  if (classes) {
    elem.className = classes;
  }
  if (text) {
    elem.innerHTML = text;
  }
  return elem;
}
let appendChildren = (elem, children) => {
    children.forEach(child => {
    elem.appendChild(child);
  })
}
// locate some elements
const p1Hand = dq("#p1Hand");
const p1Sets = dq("#p1Sets");
const p2Hand = dq("#p2Hand");
const p2Sets = dq("#p2Sets");
const p3Hand = dq("#p3Hand");
const p3Sets = dq("#p3Sets");
const p4Hand = dq("#p4Hand");
const p4Sets = dq("#p4Sets");
const drawPile = dq("#drawPile");
// consts and globals
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
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
let suits = ["clubs", "hearts", "diams", "spades"];
let playerHands = [p1Hand, p2Hand, p3Hand, p4Hand];
let playerSets = [p1Sets, p2Sets, p3Sets, p4Sets];
var game = {};
let numPlayers;
let final;