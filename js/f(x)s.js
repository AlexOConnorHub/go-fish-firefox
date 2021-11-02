///// this file provides functionality to the gameplay
let send = () => {ws.send(JSON.stringify(info));}
// tells server we're ready
let start = () => {
    destroy(".module")
    info.am_ready = true;
    info.state_of_game = state.READY_TO_START_GAME;
    send();
} // lets player say that they aren't ready
let cancel = () => {
    destroy(".module")
    info.am_ready = false;
    info.state_of_game = state.CONNECTED;
    send();
} // asks player for card
let ask = () => {
    let sanitaryCard = sanitize(dq("input.ask").value);
    if (!sanitaryCard) {
      buildShameOnYou();
      destroy(".module", 3000);
      return;
    }
    info.card_played = sanitaryCard;
    info.state_of_game = state.PLAYING;
    console.log(info);
    destroy(".module")
    dq(".chosenHand").classList.remove("chosenHand")
    send();
} // maps grid positions to player ids 0-3
let sortHandsSets = () => {
    numPlayers = game.other_hands.length + 1;
    while (numPlayers != playerHands.length) {
      playerHands.pop();
      playerSets.pop();
    }
    rotatePlayers(game.p_id);
    if (numPlayers > 2)
      swapSpots();
} // rotates hands to the right by shamt
let rotatePlayers = (shamt) => {
    const tempHands = [...playerHands];
    const tempSets = [...playerSets];
    for (var i = 0; i < numPlayers; i++) {
      playerHands[i] = tempHands[((i - shamt) + numPlayers) % numPlayers];
      playerSets[i] = tempSets[((i - shamt) + numPlayers) % numPlayers];
    }
} // swaps player 2's and 3's spots
let swapSpots = () => {
  let ip2 = playerHands.indexOf(p2Hand);
  let ip3 = playerHands.indexOf(p3Hand);
  playerHands[ip2] = p3Hand;
  playerHands[ip3] = p2Hand;
} // animates player's hands to indicate the
  // that the player should click on a hand
let bounceHands = () => {
  playerHands.forEach(hand => {
    if (hand != p1Hand) {
      hand.classList.add("bounce");
      hand.addEventListener("click", chooseHand);
    }
  })
} // handles the choosing of a player to ask
let chooseHand = (e) => {
  playerHands.forEach(hand => {
    hand.classList.remove("bounce");
  })
  let chosenHand = e.target.parentNode.parentNode.parentNode;
  chosenHand.classList.add("chosenHand")
  console.log(chosenHand)
  info.player_asked = playerHands.indexOf(chosenHand);
  buildPlayModule();
} // cleans the user input for a card (default is "a diams")
let sanitize = (card) => {
  card = card.toLowerCase();
  let [rank, suit] = (card.length == 2) ? card.split('') : card.split(' ');
  if (card.split(' ').length > 2) {
    [rank,, suit] = card.split(' ');
  }
  console.log(`[rank, suit] = [${rank}, ${suit}]`);
  if (!rank || !suit) {return false;}
  if (ranks.includes(rank) && suits.includes(suit)) {return card;}
  // get rank
  if (!ranks.includes(rank)) {
    switch (rank) {
      case "0":
        rank = "10";
        break;
      case "two":
        rank = "2";
        break;
      case "three":
        rank = "3";
        break;
      case "four":
        rank = "4";
        break;
      case "five":
        rank = "5";
        break;
      case "six":
        rank = "6";
        break;
      case "seven":
        rank = "7";
        break;
      case "eight":
        rank = "8";
        break;
      case "nine":
        rank = "9";
        break;
      case "ten":
        rank = "10";
        break;
      case "queen":
        rank = "q";
        break;
      case "king":
        rank = "k";
        break;
      case "ace":
      case "ac":
      case "one":
      case "1":
        rank = "a";
        break;
      case "jack":
        rank = "j";
        break;
      default:
        console.log("invalid card input");
        return false;
    }
  } // get suit
  if (!suits.includes(suit)) {
    switch (suit) {
      case "diamonds":
      case "diamond":
      case "d":
        suit = "diams";
        break;
      case "heart":
      case "h":
        suit = "hearts";
        break;
      case "club":
      case "c":
        suit = "clubs";
        break;
      case "spade":
      case "s":
        suit = "spades";
        break;
      default:
        console.log("invalid card input");
        return false;
    }
  }
  return `${rank} ${suit}`;
} // makes player pick a valid card
let tryAgain = () => {
  destroy(".module");
  bounceHands();
} // keeps track of who is currently winning
let whosWinning = () => {
  let players = [...playerHands];
  players = players.map(player => {
    return playerHands.indexOf(player);
  })
  players.map(id => {
    curWinner = (matchesOf(curWinner) <= matchesOf(id)) ? id : curWinner;
  })
} // returns the number of matched player w/ p_id id has 
let matchesOf = (id) => {
  let count = 0;
  game.matches?.forEach(match => {
    if (match[0] == id) {count++;}
  })
  return count;
} // maps player_id to a player's relative position on this board
let pidToPosition = (id) => {
  switch(playerHands[id]) {
    case p1Hand:
      return "<strong>you</strong>";
    case p2Hand:
      return "the player <strong>across</strong> from you";
    case p3Hand:
      return "the player to your <strong>left</strong>";
    case p4Hand:
      return "the player to your <strong>right</strong>";
    default:
      return "another player";
  }
} // removes the first element found with the passed in selector
let destroy = (selector, lifetime) => {
  flag = false;
  var thisInt = setInterval(() => { 
    dq(selector)?.remove();
    if (flag) {clearInterval(thisInt);}
    flag = true;
  }, lifetime);
} // manages basic game logic and state advance
let handleStates = () => {
  switch (game.state) {
  case 0:
  case 1:
    (curWinner != null) ? buildRestartModule() : buildStartModule();
    break;
  case 2:
    buildCancelModule();
    break;
  case 3:
  case 4: // we've played at least once now
    whosWinning();
    drawBoard();
    break;
  case 5:
    whosWinning();
    drawBoard();
    bounceHands();
    break;
  case 6:
    console.log(`end game: ${game.state}.`);
    break;
  default:
    console.log(`invalid state: ${game.state}.`);
  }
  info.state_of_game = game.state;
  info.am_ready = (game.state > 1) ? true : false;
}