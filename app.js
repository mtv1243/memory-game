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

let cardHolder = document.getElementById('card-holder');
let messageEl = document.querySelector('.message');
let buttonEl = document.querySelector('.play-again');

let choices = [];
//count down the number of matches left to make
let numbers = [0,0,1,1,2,2,3,3,4,4];
let randNumbers;
let counter = numbers.length/2;

cardHolder.addEventListener('click', (event)=>{

  let target = event.target;
  let cardClasses = target.classList;

  if (target.classList.contains('card')) {
    // counter++;
    choices.push(target);
    cardClasses.remove('hidden');
    console.log(choices);
    checkMatch(choices);
  }
})

buttonEl.addEventListener('click', (event)=>{

  let target = event.target;
  playAgain();

})

//--------
function checkMatch(array) {
  //if it's the second guess
  if (array[1]) {
    //if it's a match
    if (array[0].innerHTML === array[1].innerHTML) {
    console.log('pair!');
    messageEl.innerHTML = 'MATCH!';
    choices.forEach((index)=>{
      index.classList.add('disable');
    })
    choices = [];
    counter--;
    checkWin();
    //if it's not a match
    } else {
      reset();
    }
  }
}
//-------
function reset(){
  cardHolder.classList.add('disable');
  messageEl.innerHTML = 'TRY AGAIN...';
  setTimeout(()=>{
    cardHolder.classList.remove('disable');
    choices.forEach((index)=>{
      index.classList.add('hidden');
    })
    choices = [];
    console.log(choices);
  }, 1500);
}
//------
function checkWin() {
  if(counter === 0) {
    messageEl.innerHTML = 'YOU WIN!!!'
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
  counter = numbers.length/2;
}
