/*----- constants -----*/

const cardEls = document.querySelectorAll(".flip-card-inner");
const cardsContainerEl = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".flip-card");
const startButton = document.querySelector("#start-button");
const cardNumberSelector = document.getElementById("select-cards-number");
const statusMessage = document.querySelector("#status-message");
const timeLeft = document.getElementById("timer");
const timerDiv = document.getElementById("timer-div");

/*----- state variables -----*/

let chosen;
let matches;
let timer;
let timerLeft;
let card1;
let card2;
let boardSize;

/*----- cached elements  -----*/

/*----- event listeners -----*/

//event listener to trigger flipping of card
cardsContainerEl.addEventListener("click", flipCard);

//event listener to trigger start of game
startButton.addEventListener("click", startGame);

//event listener on card selector to trigger hiding of some divs based on board size selected by player
cardNumberSelector.addEventListener("change", function () {
	//establishing the boardSize value as a number
	boardSize = parseInt(cardNumberSelector.value);
	//if the boardSize value matches any of the sizes available, then allow the start button to be clicked and go through the following if statement
	if (
		boardSize === 4 ||
		boardSize === 8 ||
		boardSize === 12 ||
		boardSize === 16 ||
		boardSize === 20 ||
		boardSize === 24
	) {
		//enable start button
		startButton.style.pointerEvents = "auto";
		if (this.getAttribute("name") === "count") {
			//establishing variable to hold the value of the board size
			const number = parseInt(this.value);
			//value to hold the dom element of the game board boxes
			const gameBoardBoxes = document.querySelectorAll(".gameBoardBox");
			//looping over the length of the game board boxes array
			for (let i = 0; i < gameBoardBoxes.length; i++) {
				//if the number has not yet been selected/is at 24 display all boxes
				if (i < number) {
					gameBoardBoxes[i].style.display = "block";
					//otherwise hide the gameboard boxes that have not been selected, and make them unclickable
				} else {
					gameBoardBoxes[i].style.display = "none";
				}
			}
		}
	}
});

/*----- functions -----*/
init();

//function to flip cards
function flipCard(evt) {
	//if card1 is empty, set it to the event target for flip-card-inner
	if(card1 === ""){
		card1 = evt.target.closest(".flip-card-inner") 
	}
	else{
		card2 = evt.target.closest(".flip-card-inner")
	}
	//if the display of a card is disabled, do not do anything when it's clicked.
	if (evt.target.style.display === "") {
		return;
	}
	//value to hold clicked element on the cards
	const cardContainer = evt.target.closest(".flip-card-inner");
	//turning over the cards
	cardContainer.style.transform = "rotateY(180deg)";
	//calling the function with the clicked card passed in
	flipped(cardContainer);
}

//function to start the game
//(i.e. reset the board, reenable the game board pointer events, disable the board size selector
//disable the start button, initialize the necessary values, show the timer, and start the timer)
function startGame() {
	//resetting the board to its original state
	resetBoard();
	//enabling clicks on the game board
	gameBoard.style.pointerEvents = "auto";
	//disabling clicks on the board size selector dropdown
	cardNumberSelector.style.pointerEvents = "none";
	//disabling clicks on the start button during game play
	startButton.style.pointerEvents = "none";
	//reestablishing the initial values
	init();
	//displaying the timer
	timerDiv.style.display = "flex";
	//starting the timer countdown
	timer = setInterval(updateTimer, 1000);
	//updating the timer as game play happens
	updateTimer();
}

//function to initialize the values for the chosen number of cards, the number of matches and the time left in the timer
function init() {
	//disable start button until player selects a game board size
	startButton.style.pointerEvents = "none";
	//initializing the array to hold the number of cards clicked on to an empty array
	chosen = [];
	//initializing the number of matches to 0
	matches = 0;
	//initializing the time left in the timer
	timerLeft = 60;
	//shuffle board upon start of game
	(function shuffle() {
		//for each of the cards randomize the position on the game board
		cards.forEach((card) => {
			let ramdomPos = Math.floor(Math.random() * 24);
			card.style.order = ramdomPos;
		});
	})();
}

//function to create the flipping action on cards or not based on whether or not they're a match
function flipped(cardContainer) {
	// //variable to hold the value of the parameter
	const card = cardContainer;
	//if there are no cards chosen let the first card equal the parameter value
	if (chosen.length === 0) {
		card1 = card;
		//else if there is one card chosen let the second card chosen equal the parameter value
	} else if (chosen.length === 1) {
		card2 = card;
	}
	//otherwise push the chosen cards id into the chosen array
	chosen.push(card.dataset.id);

	//if two cards have been chosen make a series of decisions based on whether or not those cards are matches
	if (chosen.length === 2) {
		//if the cards are a match, increment the matches variable, reset the chosen array, and check to see if that was the last matching pair
		if (chosen[0] === chosen[1] && card1.id !== card2.id) {
			matches++;
			chosen = [];
			checkWin();
			//otherwise reset the chosen array and flip the cards back over after 1 second
		} else {
			chosen = [];
			const cardsToFlip = [card1, card2];
			setTimeout(() => {
				cardsToFlip.forEach((card) => {
					card.style.transform = "rotateY(0deg)";
				});
			}, 1000);
			card1=""
			card2=""
		}
	}
}

//function to check if a player has matched all cards and therefor won
function checkWin() {
	//variable to hold the value of the chosen board size
	const boardSize = parseInt(cardNumberSelector.value);
	//variable to hold the total number of matches needed to win
	const totalPairs = boardSize / 2;
	//if the number of matches made is the same as the number of matches needed to win go through winning logic
	if (matches === totalPairs) {
		//pause the timer at its current time
		clearInterval(timer);
		//display a message to let the player know that they won the game
		statusMessage.textContent = "You won!";
		//reenable the start button so the player can play again
		startButton.style.pointerEvents = "auto";
		//disable the ability to click on the board
		gameBoard.style.pointerEvents = "none";
		//reenable the ability to choose the board size
		cardNumberSelector.style.pointerEvents = "auto";
	}
}

//function to check if time is at 0 and player has not finished matching
function checkLoss() {
	//display start button
	document.getElementById("start-button").style.display = "block";
	//variable to hold the value of the chosen board size
	const boardSize = parseInt(cardNumberSelector.value);
	//variable to hold the total number of matches needed to win
	const totalPairs = boardSize / 2;
	//if the time left is at 0 and the number of matches made is not the same as the number of matches needed to win go through loss logic
	if (timerLeft === 0 && matches !== totalPairs) {
		//display a message saying the player lost
		statusMessage.textContent = "You lost.";
		//reenable the start button
		startButton.style.pointerEvents = "auto";
		//disable the ability to click on the board
		gameBoard.style.pointerEvents = "none";
		//reenable the ability to choose board size
		cardNumberSelector.style.pointerEvents = "auto";
		//pause the timer at current time
		clearInterval(timer);
	}
}

//function to update the timer as the seconds count down
function updateTimer() {
	//updating the timerLeft variable to decrement it by one as it counts down
	timerLeft = timerLeft - 1;
	//if the time is greater than or equal to 0 show the seconds remaining in the timer div
	if (timerLeft >= 0) {
		document.getElementById(
			"timer"
		).innerHTML = `${timerLeft} seconds left`;
	}
	//otherwise go through loss logic
	checkLoss();
}

//function to reset the board
function resetBoard() {
	//initialize chosen to an empty array
	chosen = [];
	//initialize matches to 0
	matches = 0;
	//reset the timer
	timerLeft = 60;
	//clear the timer
	clearInterval(timer);
	//turn all the cards back over the the blank side
	cards.forEach((card) => {
		card.querySelector(".flip-card-inner").style.transform =
			"rotateY(0deg)";
	});
	//empty out the win or loss message
	statusMessage.textContent = "";
	//hide the timer
	timerDiv.style.display = "none";
}

//function to shuffle the board
(function shuffle() {
	//for each of the cards randomize the position on the game board
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 24);
		card.style.order = ramdomPos;
	});
})();