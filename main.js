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

cardsContainerEl.addEventListener("click", flipCard);

startButton.addEventListener("click", startGame);

cardNumberSelector.addEventListener("change", function () {
	if (this.getAttribute("name") === "count") {
		const number = parseInt(this.value);
		const gameBoardBoxes = document.querySelectorAll(".gameBoardBox");
		for (let i = 0; i < gameBoardBoxes.length; i++) {
			if (i < number) {
				gameBoardBoxes[i].style.display = "block";
			} else {
				gameBoardBoxes[i].style.display = "none";
				gameBoardBoxes[i].style.pointerEvents = "none";
			}
		}
	}
});

/*----- functions -----*/

function flipCard(evt) {
	const cardContainer = evt.target.closest(".flip-card-inner");
	cardContainer.style.transform = "rotateY(180deg)";
	flipped(cardContainer);
}
function startGame() {
	gameBoard.style.pointerEvents = "auto";
	cardNumberSelector.style.pointerEvents = "none";
	startButton.style.pointerEvents = "none";
	init();
	timerDiv.style.display = "flex";
	timer = setInterval(updateTimer, 1000);
	updateTimer();
	//reset board
}

function init() {
	chosen = [];
	matches = 0;
	chosen = [];
	timerLeft = 60;
}

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
	// if(matches === 0 && time === 0)
	//
	// else{

	// }
	// render()
}

function gameOver() {
	clearInterval(timer);
	document.getElementById("start-button").style.display = "block";

	// if (matches === number of cards selected) {
	// 	//stop timer
	// 	statusMessage.textContent = "You won!";
	// 	startButton.style.pointerEvents = "auto";

	// }
	// else{
	statusMessage.textContent = "You lost.";
	startButton.style.pointerEvents = "auto";
	gameBoard.style.pointerEvents = "none";
	cardNumberSelector.style.pointerEvents = "auto";
	// }

	//reset board
}

function updateTimer() {
	timerLeft = timerLeft - 1;
	if (timerLeft >= 0)
		document.getElementById(
			"timer"
		).innerHTML = `${timerLeft} seconds remaining`;
	else gameOver();
}

(function shuffle() {
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 24);
		card.style.order = ramdomPos;
	});
})();

//to do stoptimer when game is won
