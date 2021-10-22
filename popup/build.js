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
  div = dc("div", "card back", "*");
  li = dc("li").appendChild(div);
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
  cards.forEach(card => {
    card = card.split(" ")
    ul.appendChild(card(card[0], card[1]));
  });
  return ul.appendChild(dc("div", "clear"));
} // returns an overturned hand with specified number of cards
let hiddenHand = (cardNumber) => {
  ul = dc("ul", "hand")
  for (i = 0; i < cardNumber; i++) {
    ul.appendChild(cardBack());
  }
  return ul.appendChild(dc("div", "clear"));;
} // shuffles the suit array
let shuffleSuits = () => {
  suits = suits // thanks to superluminary on SO for :
  .map((card) => ({ card, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ card }) => card)
}