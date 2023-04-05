/*----- constants -----*/
const cardEls = document.querySelectorAll(".flip-card-inner");
const cardsContainerEl = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".flip-card");
const startButton = document.querySelector("#start-button");
const cardNumberSelector = document.getElementById("select-cards-number");
const statusMessage = document.querySelector("#status-message");

/*----- state variables -----*/
let chosen;
let matches;
let time;
let card1;
let card2;

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

init();

function init() {
	chosen = [];
	matches = 0;
	// render()
}
// function init(evt){
//     evt.target.startTimer()
// }

// function startTimer(){
//     console.log("clicked")
// }

function flipped(evt) {
	const card = evt.target.closest(".flip-card-inner");
	card.style.transform = "rotateY(180deg)";
	if (!card.classList.contains("matched")) {
		card.classList.toggle("flipped");
	}
	chosen.push(card.dataset.id);

	console.log(matches);
	console.log(chosen);
	if (chosen.length === 2) {
		matches = chosen.every((id) => id === chosen[0])
			? ++matches
			: matches + 0;
	}
	if (chosen[0] === chosen[1]) {
		card1 = card.classList.add("matched");
		card2 = card.classList.add("matched");
		chosen = [];
		// freeze cards/make them unclickable
	}
	// if(chosen[0] != chosen[1]){
	// 	card.dataset.id = style.transform = "rotateY(-180deg)";
	// }
	if (matches === 12) {
		statusMessage.textContent = "You won!";
		//enable start button
	}
	// if(matches === 0 && time === 0)
	// 	statusMessage.textContent = "You lost."
	// else{

	// }
	// render()
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

// function render(){
// 	const flippedEls = document.querySelectorAll('.flipped:not(.matched)')
// 	if(flippedEls.length ===2){
// 		setTimeout(() => {
// 			flippedEls.forEach(card => {
// 				card.style.transform = 'rotateY(0deg)'
// 				card.classList.remove('flipped')
// 			})
// 		}, 1000)
// 	}
// }
