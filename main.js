/*----- constants -----*/
const cardEls = document.querySelectorAll(".flip-card-inner");
const cardsContainerEl = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".flip-card");
const startButton = document.querySelector("#start-button");
const cardNumberSelector = document.getElementById("select-cards-number");
const statusMessage = document.querySelector("#status-message")

/*----- state variables -----*/
let chosen
let matches
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


init()

function init(){
	chosen = []
	matches = 0
}
// function init(evt){
//     evt.target.startTimer()
// }

// function startTimer(){
//     console.log("clicked")
// }

function flipped(evt) {

	const card = evt.target.closest(".flip-card-inner")
	card.style.transform = "rotateY(180deg)";

	card.classList.toggle('flipped');

	chosen.push(card.dataset.id)

	console.log(matches)
	console.log(chosen) 
	if(chosen.length === 2){
		matches = chosen.every(id => id === chosen[0]) ? matches + 1: matches + 0 
		chosen = []
	if(matches.length >= 1){
		const card = evt.target.closest(".flip-card-inner")
		card.style.transform = "rotateY(180deg)"	
	}
	if(matches === 12){
		statusMessage.textContent = "You won!"
	}
	else{

	}
		render()
	}
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

function render(){

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
