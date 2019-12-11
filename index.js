"use strict";
const startButton = document.getElementById("dealCards");
const hit = document.getElementById("hitButton");
const stand = document.getElementById("standButton");
var gameScreen = document.getElementById("gameScreen");
const betWindow = document.getElementById("betScreen");
var bankroll = 2500;
const betinstructions = document.getElementById("betinstructions");
let game;
const playersHand = document.getElementById("playerHand");
const dealersHand = document.getElementById("dealerHand");
const bankRoll = document.getElementById("bankRoll");
var playerHand = [];
var dealerhidden = [];
var dealershown = [];
var playerTotal;
var DealerTotal;
var bet;
bankRoll.innerHTML = "Bank Roll: " + bankroll;

startButton.addEventListener("click", function(start){
    start.preventDefault();
    bet = document.getElementById("playerBet").value;
    bankroll = bankroll - bet;
    bankRoll.innerHTML = "Bank Roll: " + bankroll;
    gameScreen.className = "";
    startButton.className = "hidden";
    betWindow.className = "hidden";
    playerHand.push(dealCard(deck));
    playerHand.push(dealCard(deck));
    dealerhidden.push(dealCard(deck));
    dealershown.push(dealCard(deck));
    betinstructions.className = "hidden";
    checkBlackJack();
    playerTotal = playerHand.reduce((a,b) => a + b, 0);
    DealerTotal = dealershown.reduce((a,b) => a + b, 0);
    playersHand.innerHTML = "<h3>Players Hand: </h3>" + playerHand + "<h3> Total:</h3> " + playerTotal ;
    if(playerHand.includes(11) && playerTotal < 21 ){
        playersHand.innerHTML ="<h3>Players Hand: </h3>" + playerHand + "<h3> Total:</h3> Soft " + playerTotal;
     }
    dealersHand.innerHTML = "<h3>Dealers Hand (One Card Hidden): </h3>" + dealershown + "<h3>Total: </h3>" + DealerTotal;
    if (playerTotal == 21 && checkBlackJack() == false){
        bankroll = bankroll + (bet * 2.5);
        bankRoll.innerHTML = "Bank Roll: " + bankroll;
        resetGame();
        return alert("BlackJack");
        }
        else if (playerTotal < 21 && checkBlackJack() == true)
        {
            resetGame();
            return alert ("dealer BlackJack");
        }
        else if (playerTotal == 21 && checkBlackJack() == true){
            bankroll = bankroll + bet;
            resetGame(); 
            return alert ("dealer/player blackjack");
        }
   });

hit.addEventListener("click", function(hit){

playerHand.push(dealCard(deck));
playerTotal = playerHand.reduce((a,b) => a + b, 0);
playersHand.innerHTML = "<h3>Players Hand: </h3>" + playerHand + "<h3> Total:</h3> " + playerTotal ;

if (playerHand.reduce((a,b) => a + b, 0) > 21 && playerHand.includes(11) == false){
    resetGame();
    return alert ("you have busted with " + playerTotal);
    }
    else if (playerTotal > 21 && playerHand.includes(11) == true){
        var index = playerHand.indexOf(11);
        playerHand[index] = 1;
        playerTotal = playerHand.reduce((a,b) => a + b, 0);
        playersHand.innerHTML ="<h3>Players Hand: </h3>" + playerHand + "<h3> Total:</h3>  " + playerTotal;
    }
});

stand.addEventListener("click", function(stand){
    dealershown.push(dealerhidden);
    dealershown = dealershown.map(Number);
    DealerTotal = dealershown.reduce((a,b) => a + b, 0);
    dealersHand.innerHTML = "<h3>Dealers Hand: </h3>" + dealershown + "<h3>Total: </h3>" + DealerTotal;
    while (DealerTotal < 17)
    {
        dealershown.push(dealCard(deck));
        DealerTotal = dealershown.reduce((a,b) => a + b, 0);
        dealersHand.innerHTML = "<h3>Dealers Hand: </h3>" + dealershown + "<h3>Total: </h3>" + DealerTotal;
    }
    if (DealerTotal > 21 && dealershown.includes(11) == false)
         {  bankroll = bankroll + (bet* 2);
            bankRoll.innerHTML = "Bank Roll: " + bankroll;
            resetGame();
            return alert ("Dealer busts with " + DealerTotal + " good win!");}
    else if (DealerTotal > 21 && dealershown.includes(11) == true)
    {
        var index = dealershown.indexOf(11);
        dealershown[index] = 1;
        DealerTotal = DealerHand.reduce((a,b) => a + b, 0);
       dealersHand.innerHTML ="<h3>Dealers Hand: </h3>" + dealershown + "<h3> Total:</h3>  " + DealerTotal;
    }    
    else if (DealerTotal == playerTotal){
        bankroll = bankroll + bet;
        bankRoll.innerHTML = "Bank Roll: " + bankroll;
        resetGame();
        return alert ("Push");
    } 
    else if (DealerTotal > playerTotal){
        resetGame();
        return alert ("Dealer wins");
    }
    else if (playerTotal > DealerTotal) {
        bankroll = bankroll + (bet * 2);
        bankRoll.innerHTML = "Bank Roll: " + bankroll;
        resetGame();
        return alert ("Player Wins");
    } 
});

function resetGame()
{
    betWindow.className = "";
    gameScreen.className = "hidden";
    playerHand.length = 0;
    dealershown.length = 0;
    dealerhidden.length = 0;
    startButton.className = "";
}

var decklength = 52;
var deck = [2,3,4,5,6,7,8,9,10,10,10,10,11,
            2,3,4,5,6,7,8,9,10,10,10,10,11,
            2,3,4,5,6,7,8,9,10,10,10,10,11,
            2,3,4,5,6,7,8,9,10,10,10,10,11];


function dealCard(deck){
    var randomCard = Math.floor(decklength * Math.random());
    return deck[randomCard];
}


function checkBlackJack(){
    var dealerBlackJack = [];
    var dealerJackTotal;
    dealerBlackJack.push(dealershown);
    dealerBlackJack.push(dealerhidden);
    dealerJackTotal = dealerBlackJack.reduce((a,b) => a + b, 0);
    if (dealerJackTotal == 21){return true;}
    else {return false;}
}

