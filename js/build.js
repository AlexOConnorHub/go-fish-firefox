// this file builds cards, sets, hands, and decks
// returns a card with spec. rank and suit
let card = (rank, suit) => {
  spanRank = dc("span", "rank", rank.toUpperCase());
  spanSuit = dc("span", "suit", `&${suit};`);
  a = dc("a", `card rank-${rank} ${suit}`);
  a.href = "#";
  a.appendChild(spanRank);
  a.appendChild(spanSuit);
  li = dc("li");
  li.appendChild(a);
  return li;
} // returns a card back
let cardBack = () => {
  a = dc("a", "card back", "*");
  a.href = "#";
  li = dc("li"); li.appendChild(a);
  return li;
} // returns a set of spec. rank
let set = (rank) => {
  ul = dc("ul", "hand set")
  shuffleSuits();
  suits.forEach(suit => {
    ul.appendChild(card(rank, suit));
  });
  return ul;
} // returns hand with the specified cards
let hand = (cards) => {
  ul = dc("ul", "hand")
  cards?.forEach(crd => {
    crd = crd.split(" ");
    ul.appendChild(card(crd[0], crd[1]));
  });
  ul.appendChild(dc("div", "clear"));
  if (game.hand?.length > 15) {
    p1Hand.classList.add("tooBig");
  } else {
    p1Hand.classList.remove("tooBig");
  }
  return ul;
} // returns an overturned hand with specified number of cards
let hiddenHand = (cardNumber) => {
  ul = dc("ul", "hand")
  for (i = 0; i < cardNumber; i++) {
    ul.appendChild(cardBack());
  }
  ul.appendChild(dc("div", "clear"));
  return ul;
} // draws the drawpile
let deck = (cardsLeft) => {
  ul = dc("ul", "deck");
  for (i = 0; (i < cardsLeft) && (i < 10); i++) {
    ul.appendChild(cardBack());
  }
  if (cardsLeft != 0) {
    let deckSize = dc("span", "deckSize", `${cardsLeft}`);
    ul.lastChild.appendChild(deckSize);
  }
  ul.appendChild(dc("div", "clear"));
  return ul;
} // redraws board
let drawBoard = () => {
  clearBoard();
  let numCardsInPlay = 0;
  if (!numPlayers) {sortHandsSets();}
  playerHands[game.p_id].appendChild(hand(game.hand));
  numCardsInPlay += game.hand?.length;
  game.other_hands?.forEach(hand => { // other hands
    playerHands[hand[0]].appendChild(hiddenHand(hand[1]));
    numCardsInPlay += hand[1];
  }); // sets
  game.matches?.forEach(match => {
    playerSets[match[0]].appendChild(set(match[1]));
    numCardsInPlay += 4;
  }); // drawpile
  drawPile.appendChild(deck(52 - numCardsInPlay));
  if (game.last_play.card_asked_for) {lastCardCorner();}
}
let clearBoard = () => {
  [playerHands, playerSets].forEach(grp => {
    grp.forEach(elem => {
      elem.innerHTML = '';
    });
  });
}
// shuffles the suit array
let shuffleSuits = () => {
  suits = suits // thanks to superluminary on SO for :
  .map((card) => ({ card, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ card }) => card)
}

// other things to build
// pulls up a module with contents
let module = (children) => {
  let m = dc("div", "module");
  div = dc("div");
  appendChildren(div, children)
  m.appendChild(div);
  return m;
} // allows player to start a game
let buildStartModule = () => {
  let button = dc("button", "btn start", "Start");
  button.addEventListener("click", start); 
  document.body.appendChild(module([button]));
} // allows player to restart a game
let buildRestartModule = () => {
  let winLoss = dc("p", "winLoss", 
    `You ${(curWinner == game.p_id) ? "won!" : "lost :/"}`);
  //partialRedraw(); // redraw player's hand and set
  let button = dc("button", "btn restart", "Restart");
  button.addEventListener("click", start); 
  let flexbox = dc("div", "flexbox vertical center")
  appendChildren(flexbox, [winLoss, button]);
  document.body.appendChild(module([flexbox]));
} // allows player to change their mind
let buildCancelModule = () => {
  let button = dc("button", "btn cancel", "Cancel");
  button.addEventListener("click", cancel); 
  document.body.appendChild(module([button]));
} // lets player ask another player for a card
let buildPlayModule = () => {
  let input = dc("input", "ask btn mb-half");
  input.placeholder = "2 hearts";
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      dq("button.ask").click();
    }
  }); 
  let button = dc("button", "btn ask", "Ask for Card");
  button.addEventListener("click", ask);
  let flexbox = dc("div", "flexbox vertical center")
  appendChildren(flexbox, [input, button]);
  document.body.appendChild(module([flexbox]));
  input.focus();
} // builds module that scolds player for invalid input
let buildShameOnYou = () => {
  let shameOnYou = dc("p", "shameOnYou", 
    "Example of valid input:<strong><br/>Jack spades<br/>" + 
    "js<br/>jack of spades<br/></strong>")
  // let okay = dc("button", "btn okay", "Okay");
  // okay.addEventListener("click", tryAgain);
  let flexbox = dc("div", "flexbox vertical center")
  appendChildren(flexbox, [shameOnYou]);
  document.body.appendChild(module([flexbox]));
} // draws a small popup informing the player of last card played
let lastCardCorner = () => {
  let corner = dc("div", "lastCardPlayed corner playingCards " + 
    "fourColours miniscule flexbox center");
  let s = game.last_play.success;
  let askingP = pidToPosition(game.last_play.player_asking);
  let askedP = pidToPosition(game.last_play.player_asked);
  let message = `${askingP} asked ${askedP} for this card,` + 
    ` ${s ? "and received or drew": "but didn't get"} it.`;
  message = dc("span", "capitalize", message);
  let cardAsked = game.last_play.card_asked_for;
  let div = dc("div");
  div.appendChild(hand([cardAsked]));
  destroy(".corner", 7000);
  appendChildren(corner, [message, div]);
  document.body.appendChild(corner);
}