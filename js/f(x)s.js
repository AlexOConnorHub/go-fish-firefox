///// this file provides functionality to the gameplay
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
    let sanitaryCard = sanitize(dq("input.ask").value);
    if (!sanitaryCard) {
      buildShameOnYou();
      return;
    }
    info.card_played = sanitaryCard;
    info.state_of_game = state.PLAYING;
    console.log(info);
    dq(".module").remove();
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
  let [rank, suit] = card.toLowerCase().split(' ');
  console.log(`[rank, suit] = [${rank}, ${suit}]`);
  if (!rank || !suit) {return false;}
  if (ranks.includes(rank) && suits.includes(suit)) {return card;}
  // get rank
  if (!ranks.includes(rank)) {
    switch (rank) {
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
  dq(".module").remove();
  bounceHands();
} 
let whosWinning = () => {
  // if (game.matches.length <= 0) {return;}
  let players = [...playerHands];
  players = players.map(player => {
    return playerHands.indexOf(player);
  })
  players.map(id => {
    curWinner = (matchesOf(curWinner) <= matchesOf(id)) ? id : curWinner;
  })
  console.log(`curWinner is ${curWinner}`);
} 
let matchesOf = (id) => {
  let count = 0;
  console.log("game.matches.length", game.matches.length);
  game.matches?.forEach(match => {
    if (match[0] == id) {count++;}
  })
  return count;
}
// manages basic game logic and state advance
let handleStates = () => {
  switch (game.state) {
  case 0:
  case 1:
    dq(".module")?.remove();
    (curWinner != null) ? buildRestartModule() : buildStartModule();
    break;
  case 2:
    dq(".module")?.remove();
    buildCancelModule();
    break;
  case 3:
  case 4: // we've played at least once now
    whosWinning();
    drawBoard();
    break;
  case 5:
    whosWinning();
    dq(".module")?.remove();
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