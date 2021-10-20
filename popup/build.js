// this file builds cards, sets, hands, and decks
let suits = ["clubs", "hearts", "diams", "spades"]

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
}

let set = (rank) => {
  ul = dc("ul", "hand set")
  shuffleSuits();
  suits.forEach(suit => {
    ul.appendChild(card(rank, suit));
  });
  return ul;
}

let hand = (cards) => {
  ul = dc("ul", "hand")
  cards.forEach(card => {
    card = card.split(" ")
    ul.appendChild(card(card[0], card[1]));
  });
  return ul;
}


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
let shuffleSuits = () => {
  suits = suits // thanks to superluminary on SO for :
  .map((card) => ({ card, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ card }) => card)
}