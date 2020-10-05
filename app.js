/*
PSEUDO CODE

SETUP:
create cards with pictures
  create pairs
hide
set to inactive

PLAY:
user clicks
  card shows
  set to active
  check if match {
    if yes {
      set pair to solved
      check if win game
        if yes {
          display modal
        }
      }
    }
    if no {
      set pair to inactive
      hide pair
    }
*/

//GLOBAL VARIABLES
let cardHolder = document.getElementById('card-holder');
let messageEl = document.querySelector('.message');
let buttonEl = document.querySelector('.play-again');
let scoreEl = document.querySelector('.score');

let choices = [];
//count down the number of matches left to make
// must be an even number
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
let randNumbers;
let counter = numbers.length/2;
let score = 0;

// shuffle the cards to begin
playAgain();

// check if the numbers in the cards match
cardHolder.addEventListener('click', (event)=>{

  let card = event.target.children[0];
  let cardClasses = card.classList;

  if (card.classList.contains('card')) {
    // counter++;
    choices.push(card);
    cardClasses.remove('hidden');
    console.log(choices);
    checkMatch(choices);
  }
})

// shuffle the cards and hide them when click the button
buttonEl.addEventListener('click', playAgain);

//--------
function checkMatch(array) {
  //if it's the second guess
  if (array[1]) {
    //if it's a match
    if (array[0].innerHTML === array[1].innerHTML) {
    console.log('pair!');
    messageEl.classList.remove('match-try');
    messageEl.classList.add('match-success');
    score++;
    console.log(score);
    scoreEl.innerHTML = score;
    choices.forEach((index)=>{
      index.classList.add('matched');
    })
    choices = [];
    counter--;
    checkWin();
    //if it's not a match
    } else {
      reset();
      messageEl.classList.add('match-try');
      messageEl.classList.remove('match-success');
    }
  }
}
//-------
function reset(){
  messageEl.classList.add('match-try');
  cardHolder.classList.add('disable');
  setTimeout(()=>{
    cardHolder.classList.remove('disable');
    choices.forEach((index)=>{
      index.classList.add('hidden');
    })
    choices = [];
    console.log(choices);
  }, 1000);
}
//------
function checkWin() {
  if(counter === 0) {
    buttonEl.classList.remove('hidden');
  }
}
//------
function playAgain() {
  let cards = document.querySelectorAll('.card');
  randNumbers = numbers.slice(0);
  for (var i = randNumbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randNumbers[i];
        randNumbers[i] = randNumbers[j];
        randNumbers[j] = temp;
    }
  console.log(randNumbers);
  cards.forEach((index)=>{
    index.classList.add('hidden');
    index.classList.remove('disable');
    index.innerHTML = randNumbers[0];
    randNumbers.shift();
  })
  buttonEl.classList.add('hidden');
  messageEl.innerHTML = '';
  score = 0;
  scoreEl.innerHTML = 0;
  counter = numbers.length/2;
}
