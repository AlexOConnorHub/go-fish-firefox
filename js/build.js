// this file builds cards, sets, hands, and decks
let suits = ["clubs", "hearts", "diams", "spades"]
// returns a card with spec. rank and suit
let card = (rank, suit) => {
  spanRank = dc("span", "rank", rank);
  spanSuit = dc("span", "suit", `&${suit};`);
  a = dc("a", `card rank-${rank} ${suit}`);
  a.href = "#";
  a.appendChild(spanRank);
  a.appendChild(spanSuit);
  li = dc("li");
  li.appendChild(a)
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
  cards.forEach(crd => {
    crd = crd.split(" ")
    ul.appendChild(card(crd[0], crd[1]));
  });
  ul.appendChild(dc("div", "clear"))
  return ul;
} // returns an overturned hand with specified number of cards
let hiddenHand = (cardNumber) => {
  ul = dc("ul", "hand")
  for (i = 0; i < cardNumber; i++) {
    ul.appendChild(cardBack());
  }
  ul.appendChild(dc("div", "clear"));
  return ul;
}
// {"hand": ["6 diams", "2 hearts", "6 spades", "7 diams", "6 clubs", "j spades", "2 clubs"], "other_hands": [], "matches": [], "state": 5}
let drawGame = () => {
  if (game.hand) {
    p1Hand.innerHTML = '';
    p1Hand.appendChild(hand(game.hand));
  }
}
// shuffles the suit array
let shuffleSuits = () => {
  suits = suits // thanks to superluminary on SO for :
  .map((card) => ({ card, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ card }) => card)
}

// other things to build
let module = (children) => {
  m = dc("div", "module");
  div = dc("div");
  children.forEach(child => {
    div.appendChild(child);
  })
  m.appendChild(div);
  return m;
}
let buildStartModule = () => {
  button = dc("button", "btn start", "Start");
  button.addEventListener("click", start); 
  document.body.appendChild(module([button]));
}