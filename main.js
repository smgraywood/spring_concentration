/*----- constants -----*/
const cardEls = document.querySelectorAll(".flip-card-inner");
const cardsContainerEl = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".flip-card");
const startButton = document.querySelector("#start-button");
const cardNumberSelector = document.getElementById("select-cards-number");

/*----- state variables -----*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time;

/*----- cached elements  -----*/

/*----- event listeners -----*/
// startButton.addEventListener("click", init)

cardsContainerEl.addEventListener("click", flipped);

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

// function init(evt){
//     evt.target.startTimer()
// }

// function startTimer(){
//     console.log("clicked")
// }

function flipped(evt) {
	evt.target.closest(".flip-card-inner").style.transform = "rotateY(180deg)";

	// firstCard = ""
	// secondCard = ""
	// if (firstCard === ""){
	//     evt.target.closest(".flip-card-inner").style.transform = "rotateY(180deg)";
	//     firstCard = evt.target.closest("img")}
	//     console.log(evt.target.closest('img'))
	// if (firstCard !== ""){
	//     evt.target.closest(".flip-card-inner").style.transform = "rotateY(180deg)";
	//     secondCard = evt.target.closest('img.src')}
	// if (firstCard===cardEls.getElementByTagName('img').src && secondCard===cardEls.getElementByTagName('img').src){
	//     then freeze
	// }
}

function checkIfMatch() {
	let flippedCards = document.querySelectorAll(".flip-card.flipped");
	if (flippedCards.length === 2) {
		let card1 = flippedCards[0].getAttribute("data-flowers");
		let card2 = flippedCards[1].getAttribute("data-flowers");
		if (card1 === card2) {
			// cards match, keep them flipped over
			flippedCards.forEach((card) => card.classList.add("matched"));
		} else {
			// cards don't match, flip them back over
			flippedCards.forEach((card) => card.classList.remove("flipped"));
		}
	}
}


// function checkIfMatch(){
//     if (firstCard (need to access source image and compare) === secondCard){
//         keep cards flipped
//         and make them unclickable
//     }
//     else{
//         flip cards back (similar to flipped but backwards)
//         make sure theres a time lapse (timeOut)
//     }
// }

// function checkIfMatch(){
// //     if(cardEls.getElementByTagName('img').src === cardEls.getElementByTagName('img').src){

// //     }

// }

(function shuffle() {
	cards.forEach((card) => {
		let ramdomPos = Math.floor(Math.random() * 24);
		card.style.order = ramdomPos;
	});
})();

//to do startTimer
