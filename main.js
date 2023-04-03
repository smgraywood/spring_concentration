/*----- constants -----*/
const cards = document.querySelectorAll(".flip-card");
console.log(cards);

/*----- state variables -----*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/*----- cached elements  -----*/

/*----- event listeners -----*/

// cards.forEach((card) => card.addEventListener("click", card.style.transform ='rotateY(180deg)'));



/*----- functions -----*/

function clicked(){
    console.log('clicked')
    document.getElementsByClassName(".flip-card").style.transform ='rotateY(180deg)'
}

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
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 24);
		card.style.order = ramdomPos;
	});
})();
