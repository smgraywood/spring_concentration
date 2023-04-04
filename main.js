/*----- constants -----*/
const cardEls = document.querySelectorAll(".flip-card-inner");
const cardsContainerEl = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".flip-card");

const cardNumberSelector = document.getElementById("select-cards-number");

/*----- state variables -----*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time;

/*----- cached elements  -----*/

/*----- event listeners -----*/
cardsContainerEl.addEventListener("click", flipped);

function flipped(evt) {
	evt.target.closest(".flip-card-inner").style.transform = "rotateY(180deg)";
}

cardNumberSelector.addEventListener("change", function () {
	if (this.getAttribute("name") === "count") {
		const number = parseInt(this.value);
		const gameBoardBoxes = document.querySelectorAll(".gameBoardBox");
		for (let i = 0; i < gameBoardBoxes.length; i++) {
			if (i < number) {
				gameBoardBoxes[i].style.display = "block";
			} else {
				gameBoardBoxes[i].style.display = "none";
			}
		}
	}
});

/*----- functions -----*/

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add("flip");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	checkForMatch();
}

// function checkForMatch() {
// 	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
// 	isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
// 	firstCard.removeEventListener("click", flipCard);
// 	secondCard.removeEventListener("click", flipCard);

// 	resetBoard();
// }

// function unflipCards() {
// 	lockBoard = true;

// 	setTimeout(() => {
// 		firstCard.classList.remove("flip");
// 		secondCard.classList.remove("flip");
// 		resetBoard();
// 	}, 1500);
// }

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	console.log("shuffle");
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 24);
		card.style.order = ramdomPos;
	});
})();
