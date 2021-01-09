// Bridge ranking order
var orig_suit = ['♣', '♦', '♥', '♠'];

// Ace high ranking order
var orig_rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

var suit_title = ["Clubs", "Diamonds", "Hearts", "Spades"];
var rank_title = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

var deck = [];
var label = "";

function originalDeck(deck){
	for (i = 0; i < orig_suit.length; i++) {
  	for (j = 0; j < orig_rank.length; j++) {
    	let card = orig_rank[j] + orig_suit[i];
    	deck.push(card);
  	}
	}
}

originalDeck(deck);

function showDeck(deck, label) {
	document.getElementById("generalLabel").innerHTML = label;
  for (x = 0; x < deck.length; x += 13) {
    // console.log(deck[x] + " " + deck[x + 1] + " " + deck[x + 2] + " " + deck[x + 3] + " " + deck[x + 4] + " " + deck[x + 5] + " " + deck[x + 6] + " " + deck[x + 7] + " " + deck[x + 8] + " " + deck[x + 9] + " " + deck[x + 10] + " " + deck[x + 11] + " " + deck[x + 12]);
    document.getElementById("output_row"+x).innerHTML = deck[x] + " " + deck[x + 1] + " " + deck[x + 2] + " " + deck[x + 3] + " " + deck[x + 4] + " " + deck[x + 5] + " " + deck[x + 6] + " " + deck[x + 7] + " " + deck[x + 8] + " " + deck[x + 9] + " " + deck[x + 10] + " " + deck[x + 11] + " " + deck[x + 12];
  }
}

function choice() {

  var response = prompt("Type the corresponding number of choice from the following options:\n(1) Shuffle deck.\n(2) Arrange shuffled deck by suit.\n(3) Arrange shuffled deck by rank.\n(4) Deal a card.");
  switch(response) {
  	case "1":
    	shuffleThenShow(deck);
      break;
    case "2":
    	arrangeBySuit(deck);
    	break;
    case "3":
    	arrangeByRank(deck);
    	break;
    case "4":
    	dealCard(deck);
    	break;
  }
}

function justShuffle(deck) {
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = deck[i];
    deck[i] = deck[j];
    deck[j] = k;
  }
}

function shuffleThenShow(deck) {
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = deck[i];
    deck[i] = deck[j];
    deck[j] = k;
  }
  // console.log("Number of cards in deck: " + deck.length);
  // console.log("Shuffled deck: ");
  label = "Shuffled deck: "
  document.getElementById("output_dealCard").innerHTML = "";
  showDeck(deck, label);
}

function arrangeBySuit(deck) {
	justShuffle(deck);
    // console.log("Shuffled deck: ");
    label = "Shuffled deck";
    showDeck(deck, label);
  
	deck.sort(function(a, b) {
  		var x = a.charAt(a.length-1);
   		var y = b.charAt(b.length-1);
	    if (x < y) {return 1;}
  	  if (x > y) {return -1;}
    	return 0;
    });
  
    // console.log("Number of cards in deck: " + deck.length);
    // console.log("Arranged by suit: ");
    label = "Arranged by suit:";
    document.getElementById("output_dealCard").innerHTML = "";
    showDeck(deck, label);
}

function arrangeByRank(deck) {
	justShuffle(deck);
    // console.log("Shuffled deck: ");
    label = "Shuffled deck";
    showDeck(deck, label);
  
	deck.sort(function(a, b) {
  		var x = orig_rank.indexOf(a.slice(0,-1));
   		var y = orig_rank.indexOf(b.slice(0,-1));
	    if (x < y) {return -1;}
  	  if (x > y) {return 1;}
    	return 0;
    });
    label = "Arranged by rank:";
    document.getElementById("output_dealCard").innerHTML = "";
    showDeck(deck, label);
}

function dealCard(deck) {
	label = "Previous deck of cards:";
	showDeck(deck, label);
	let chosenCard = deck[Math.floor(Math.random() * 52)];
    document.getElementById("output_dealCard").innerHTML = "You've chosen: " +   rank_title[orig_rank.indexOf(chosenCard.slice(0,-1))] + " of " +   suit_title[orig_suit.indexOf(chosenCard.charAt(chosenCard.length-1))];
}

/*
function reset() {
    document.getElementById("generalLabel").innerHTML = "Reset!";
    document.getElementById("output_dealCard").innerHTML = "";
    document.getElementById("output_row0").innerHTML = "";
    document.getElementById("output_row13").innerHTML = "";
    document.getElementById("output_row26").innerHTML = "";
    document.getElementById("output_row39").innerHTML = "";
}
*/

function reset() {
	deck = [];
  label = "Reset!<br><br>Original deck of cards:";
  document.getElementById("output_dealCard").innerHTML = "";
  originalDeck(deck);
  showDeck(deck, label);
}

// choice();