// Bridge ranking order
var orig_suit = ['♣', '♦', '♥', '♠'];
var suit_title = ["Clubs", "Diamonds", "Hearts", "Spades"];

// Ace high ranking order
var orig_rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var rank_title = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];

// Poker hands
pokerHands=["4 of a Kind", "Straight Flush", "Straight", "Flush", "High Card",
       "1 Pair", "2 Pair", "Royal Flush", "3 of a Kind", "Full House" ];
var poker_rank = {"A":14, "K":13, "Q":12, "J":11, "10":10, "9":9, "8":8, "7":7, "6":6, "5":5, "4":4, "3":3, "2":2}, poker_suit = { "♠":1, "♣":2, "♥":4, "♦":8 };

var deck = [];
var label = "";
var deckDisplay = "";
var cardsDrawn = [];
var fiveCardsDrawn = [];
var fiveCardsDrawn_rank = [];
var fiveCardsDrawn_suit = [];
var fiveCardsDrawn_Display = "";
var cardsDrawn_display = "";
var cardHistoryHighlight_index = 0;

function originalDeck(deck){
	for (i = 0; i < orig_suit.length; i++) {
  	for (j = 0; j < orig_rank.length; j++) {
    	let card = orig_rank[j] + orig_suit[i];
    	deck.push(card);
  	}
	}
}

function newDeck() {
  deck = [];
  cardsDrawn = [];
  document.getElementById("output_cardsDrawn").innerHTML = "";
  document.getElementById("cardsDrawnLabel").innerHTML = "";
  document.getElementById("generalLabel").innerHTML = "";
  document.getElementById("output_dealCard").innerHTML = "";
  originalDeck(deck);
  label = "New deck: ";
  showDeck(deck, label);
}

function showDeck(deck, label) {
  if(deck.length == 0) {
    document.getElementById("output_row").innerHTML = "";
  }
	document.getElementById("generalLabel").innerHTML = label;
  deck.forEach(listCards);
  deckDisplay = "";
}

function showCardsDrawn(cardsDrawn) {
  if(cardsDrawn.length == 0) {
    document.getElementById("output_cardsDrawn").innerHTML = "";
  }
	document.getElementById("cardsDrawnLabel").innerHTML = "Cards drawn: ";
  cardsDrawn.forEach(listCardsDrawn);
  cardsDrawn_display = "";
}

function listCards(item, index) {
  if(index == 12) {
    deckDisplay += item + "<br>";
  }
  else if(index == 25) {
    deckDisplay += item + "<br>";
  }
  else if(index == 38) {
    deckDisplay += item + "<br>";
  }
  else if(index == 51) {
    deckDisplay += item + "<br>";
  }
  else {
    deckDisplay += item + " ";
  }
  document.getElementById("output_row").innerHTML = deckDisplay;
}

function listCardsDrawn(item, index) {
  if(index == 12) {
    cardsDrawn_display += item + "<br>";
  }
  else if(index == 25) {
    cardsDrawn_display += item + "<br>";
  }
  else if(index == 38) {
    cardsDrawn_display += item + "<br>";
  }
  else if(index == 51) {
    cardsDrawn_display += item + "<br>";
  }
  else {
    cardsDrawn_display += item + " ";
  }
  document.getElementById("output_cardsDrawn").innerHTML = cardsDrawn_display;
}

function shuffleThenShow(deck) {
  if (deck.length == 0) {
    cardsDrawn = [];
    document.getElementById("output_cardsDrawn").innerHTML = "";
    originalDeck(deck);
  }
  
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = deck[i];
    deck[i] = deck[j];
    deck[j] = k;
  }
  label = "Shuffling current deck: "
  if (deck.length == 52) label = "Fresh new deck shuffled: "
  showDeck(deck, label);
}

function drawOneCard(deck) {
  if (deck.length > 0) {
    label = (deck.length-1) + " cards remaining in deck: ";
    const chosenCard_index = Math.floor(Math.random() * deck.length);
    let chosenCard = deck[chosenCard_index];
    deck.splice(chosenCard_index, 1)
    cardsDrawn.push(chosenCard);
    if (deck.length == 0) {
      label = "That was the last card!";
    }
    showDeck(deck, label);
    document.getElementById("output_dealCard").innerHTML = "You've drawn: " +   rank_title[orig_rank.indexOf(chosenCard.slice(0, -1))] + " of " +   suit_title[orig_suit.indexOf(chosenCard.slice(-1))] + " (" + chosenCard + ")";
    showCardsDrawn(cardsDrawn);
  }
  
  else {
    label = "No more cards in deck! Create new deck to proceed.";
    document.getElementById("output_dealCard").innerHTML = "";
    showDeck(deck, label);
  }
}

function drawFiveCards(deck) {
  if (deck.length-5 >= 0) {
    for(let i = 0; i < 5; i++){
      const chosenCard_index = Math.floor(Math.random() * deck.length);
      let chosenCard = deck[chosenCard_index];
      deck.splice(chosenCard_index, 1)
      cardsDrawn.push(chosenCard);
    }
    label = (deck.length) + " cards remaining in deck: ";
    if (deck.length == 0) {
      label = "No more cards to draw!";
    }
    fiveCardsDrawn = cardsDrawn.slice(-5);
    showDeck(deck, label);
    fiveCardsDrawn.forEach(function(item, index) {
      fiveCardsDrawn_Display += item + " ";
      fiveCardsDrawn_rank[index] = poker_rank[item.slice(0, -1)];
      fiveCardsDrawn_suit[index] = poker_suit[item.slice(-1)];
    });
    document.getElementById("output_dealCard").innerHTML = "You've drawn: " + fiveCardsDrawn_Display;
    rankPokerHand(fiveCardsDrawn_rank, fiveCardsDrawn_suit);
    fiveCardsDrawn_Display = "";
    showCardsDrawn(cardsDrawn);
  }

  else if (deck.length == 0) {
    label = "No more cards in deck! Create new deck to proceed.";
    fiveCardsDrawn = [];
    document.getElementById("output_dealCard").innerHTML = "";
    document.getElementById("output_pokerHand").innerHTML = "";
    showDeck(deck, label);
  }
  
  else {
    label = "Cannot draw 5 cards! Just draw one card." + "<br><br>" + deck.length + " cards remaining in deck: ";
    fiveCardsDrawn = [];
    document.getElementById("output_dealCard").innerHTML = "";
    document.getElementById("output_pokerHand").innerHTML = "";
    showDeck(deck, label);
  }
}

function previousCardDrawn() {
  cardHistoryHighlight_index++;
  cardHistoryHighlight (cardHistoryHighlight_index, cardsDrawn);
}

function nextCardDrawn() {
  cardHistoryHighlight_index--;
  cardHistoryHighlight (cardHistoryHighlight_index, cardsDrawn);
}

function cardHistoryHighlight (index, cardsDrawn) {
  if (index < 0 ){
    index = 0;
    cardHistoryHighlight_index = 0;
  } 
  if (index > cardsDrawn.length-1) {
    index = cardsDrawn.length-1;
    cardHistoryHighlight_index = cardsDrawn.length-1;
  } 
  let cardHighlight = cardsDrawn[cardsDrawn.length-1-index];
  document.getElementById("output_dealCard").innerHTML = "You drew: " +   rank_title[orig_rank.indexOf(cardHighlight.slice(0, -1))] + " of " +   suit_title[orig_suit.indexOf(cardHighlight.slice(-1))] + " (" + cardHighlight + ")";
}

// Algorithm adapted from: https://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
function rankPokerHand(cs,ss) {
  var v, i, o, s = 1<<cs[0]|1<<cs[1]|1<<cs[2]|1<<cs[3]|1<<cs[4];
  for (i=-1, v=o=0; i<5; i++, o=Math.pow(2,cs[i]*4)) {v += o*((v/o&15)+1);}
  v = v % 15 - ((s/(s&-s) == 31) || (s == 0x403c) ? 3 : 1);
  v -= (ss[0] == (ss[1]|ss[2]|ss[3]|ss[4])) * ((s == 0x7c00) ? -5 : 1);
  document.getElementById("output_pokerHand").innerHTML = "Poker hand: " + pokerHands[v] + (s == 0x403c?" (Ace Low)":"")+"<br/>";
}