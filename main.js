/*----- constants -----*/
const cardEls = document.querySelectorAll(".flip-card-inner");
const cardsContainerEl = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".flip-card");
const startButton = document.querySelector("#start-button");
const cardNumberSelector = document.getElementById("select-cards-number");
const statusMessage = document.querySelector("#status-message");
const timeLeft = document.getElementById("timer")


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

startButton.addEventListener("click", init)

/*----- functions -----*/


function flipCard(evt){
	const cardContainer = evt.target.closest('.flip-card-inner')
	cardContainer.style.transform = 'rotateY(180deg)'
	flipped(cardContainer)
}



init();

function init(evt) {
	chosen = [];
	matches = 0;
	chosen = []
	timerLeft = 60
	timer = setInterval(updateTimer, 1000);
	updateTimer()
	document.getElementById('startButton').style.display = 'none';
}

function flipped(cardContainer) {
	const card = cardContainer;
	if (chosen.length === 0){
		card1=card
	}
	else if(chosen.length === 1){
		card2=card
	}
	chosen.push(card.dataset.id)

	if (chosen.length === 2) {
		if (chosen[0] === chosen[1]) {
			matches++
			chosen = [];
		} else {
			chosen = []
			const cardsToFlip = [card1, card2]
			setTimeout(() => {
				cardsToFlip.forEach((card) => {
					card.style.transform = 'rotateY(0deg)'
				})
			}, 1000);
		}
	}

	if (matches === 12 && time > 0) {
		statusMessage.textContent = "You won!";
		//enable start button
	}
	// if(matches === 0 && time === 0)
	// 	statusMessage.textContent = "You lost."
	// else{

	// }
	// render()
}

function gameOver(){
	clearInterval(timer)
	document.getElementById('startButton').style.display = 'block';
}

function updateTimer(){
	timerLeft = timerLeft-1
	if(timerLeft >=0)
	document.getElementById('timer').innerHTML = timeLeft
	gameOver()
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

// card1.style.transform = 'rotateY(0deg)'
// card1.classList.remove('flipped')
// card2.style.transform = 'rotateY(0deg)'
// card.classList.remove('flipped')
