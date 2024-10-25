import deck from './data.js';

const gridEl = document.querySelector('.grid');
const textEl = document.querySelector('.text');
const scoreDisplay = document.getElementById('score');

const cards = shuffle(deck);
let chosenCards = [];
let chosenCardsIds = [];
let matchCards = [];
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard() {
    for (let i = 0; i < cards.length; i++) {
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', './images/back.png');
        imgEl.setAttribute('data-id', i);
        imgEl.addEventListener('click', showCard);
        gridEl.insertAdjacentElement('beforeend', imgEl);
    }
}

function showCard() {
    textEl.textContent = 'Card choosen!';

    const id = this.getAttribute('data-id');
    this.setAttribute('src', cards[id].img);

    if(!chosenCardsIds.includes(id)) {
        chosenCardsIds.push(id);
        chosenCards.push(cards[id].name);
    } else {
        textEl.textContent = 'You choose the same card! Choose another!';
    }

    setTimeout(() => {
        if(chosenCardsIds.length === 2) {
            const imgEl = document.querySelectorAll('img');
    
            if(chosenCards[0] === chosenCards[1]) {
                textEl.textContent = 'You have a match!';
                imgEl[chosenCardsIds[0]].setAttribute('src', './images/white.png');
                imgEl[chosenCardsIds[1]].setAttribute('src', './images/white.png');
                imgEl[chosenCardsIds[0]].removeEventListener('click', showCard);
                imgEl[chosenCardsIds[1]].removeEventListener('click', showCard);
                imgEl[chosenCardsIds[0]].classList.add('disabled');
                imgEl[chosenCardsIds[1]].classList.add('disabled');
                matchCards.push(chosenCards[0], chosenCards[1]);
                score++;
            } else {
                textEl.textContent = 'Not a match. Try again!';
                imgEl[chosenCardsIds[0]].setAttribute('src', './images/back.png');
                imgEl[chosenCardsIds[1]].setAttribute('src', './images/back.png');
            }
    
            chosenCards = [];
            chosenCardsIds = [];
            scoreDisplay.textContent = score;
        }
    
        if(cards.length / 2 === matchCards.length / 2) {
            textEl.textContent = 'Congratulations! You found them all!';
            matchCards = [];
        }
    }, 300);

    console.log('cards: ', chosenCards);
    console.log('ids: ', chosenCardsIds);
    console.log('matchs: ', matchCards);
}

createCard();