	//	script

//	storing a list of all cards
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//	adding a toggable flip class to clicked card
function flipCard() {
	// to prevent faster clicking resulting in a match
	if(lockBoard) return;
	// to prevent double clicking same card resulting in a match
	if(this === firstCard) return;

	this.classList.add('flip');

	if(!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	// second click
	hasFlippedCard = false;
	secondCard = this;

	checkForMatch();
}


	//	Refactoring
function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	// its a match!!
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

//	immidiatelly invoked function for shuffleling cards by flex order number
(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

//	looping through list of all card with a forEach and adding click event
cards.forEach(card => card.addEventListener('click', flipCard));