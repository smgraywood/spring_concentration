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

/*----- cached elements  -----*/

/*----- event listeners -----*/

//event listener to trigger flipping of card
cardsContainerEl.addEventListener("click", flipCard);

//event listener to trigger start of game
startButton.addEventListener("click", startGame);

//event listener on card selector to trigger hiding of some divs based on board size selected by player
cardNumberSelector.addEventListener("change", function () {
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
				gameBoardBoxes[i].style.pointerEvents = "none";
			}
		}
	}
});

/*----- functions -----*/

//function to flip cards
function flipCard(evt) {
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
	resetBoard()
	gameBoard.style.pointerEvents = "auto";
	cardNumberSelector.style.pointerEvents = "none";
	startButton.style.pointerEvents = "none";
	init();
	timerDiv.style.display = "flex";
	timer = setInterval(updateTimer, 1000);
	updateTimer();
}

//function to initialize the values for the chosen number of cards, the number of matches and the time left in the timer
function init() {
	chosen = [];
	matches = 0;
	timerLeft = 60;
}

//function to create the flipping action on cards or not based on whether or not they're a match
function flipped(cardContainer) {
	const card = cardContainer;
	if (chosen.length === 0) {
		card1 = card;
	} else if (chosen.length === 1) {
		card2 = card;
	}
	chosen.push(card.dataset.id);

	if (chosen.length === 2) {
		if (chosen[0] === chosen[1]) {
			matches++;
			chosen = [];
			checkWin();
		} else {
			chosen = [];
			const cardsToFlip = [card1, card2];
			setTimeout(() => {
				cardsToFlip.forEach((card) => {
					card.style.transform = "rotateY(0deg)";
				});
			}, 1000);
		}
	}
}

//function to check if a player has matched all cards and therefor won
function checkWin() {
	const boardSize = parseInt(cardNumberSelector.value);
	console.log("boardSize:", boardSize);
	const totalPairs = boardSize / 2;
	if (matches === totalPairs) {
		clearInterval(timer);
		statusMessage.textContent = "You won!";
		startButton.style.pointerEvents = "auto";
		gameBoard.style.pointerEvents = "none";
		cardNumberSelector.style.pointerEvents = "auto";
	}
}

//function to check if time is at 0 and player has not finished matching
function checkLoss() {
	document.getElementById("start-button").style.display = "block";

	const boardSize = parseInt(cardNumberSelector.value);
	const totalPairs = boardSize / 2;
	if (timerLeft === 0 && matches !== totalPairs) {
		statusMessage.textContent = "You lost.";
		startButton.style.pointerEvents = "auto";
		gameBoard.style.pointerEvents = "none";
		cardNumberSelector.style.pointerEvents = "auto";
		clearInterval(timer)
	}
}

//function to update the timer as the seconds count down
function updateTimer() {
	timerLeft = timerLeft - 1;
	if (timerLeft >= 0) {
		document.getElementById(
			"timer"
		).innerHTML = `${timerLeft} seconds remaining`;
	}
	checkLoss();
}

//function to reset the board
function resetBoard() {
	chosen = [];
	matches = 0;
	timerLeft = 60;
	clearInterval(timer);
	cards.forEach((card) => {
		card.querySelector(".flip-card-inner").style.transform =
			"rotateY(0deg)";
	});
	statusMessage.textContent = "";
	timerDiv.style.display = "none";
}

//function to shuffle the board upon reload of page
(function shuffle() {
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 24);
		card.style.order = ramdomPos;
	});
})();