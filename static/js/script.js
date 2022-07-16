//challenge 1: age in days

function ageInDays(){
    let birthYear = prompt('Enter your birth year');
    days = (2022-birthYear) *365;
    console.log(days);
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ days +' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
};

function reset(){
    document.getElementById('ageInDays').remove();
}

// challenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flexCatGen');
    image.src = 'https://static.wikia.nocookie.net/a17c712a-832f-4965-9a1a-bbe4a141f2d5/scale-to-width/755';
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissor
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    console.log(humanChoice);
    botChoice = numToChoice(randToRpsInt());
    console.log(botChoice);
    results = decide(humanChoice, botChoice); //[0,1] human lost | bot won
    message = finalMessage(results);  //{'message' : 'You won!', 'color': 'green'}
    console.log(results);
    console.log(message.message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numToChoice(number){
    return ['rock', 'paper', 'scissor'][number]
}

function decide(humanChoice, computerChoice){
    var rpsDatabase = {
        'rock' : {'scissor' : 1, 'rock' : 0.5, 'paper' : 0},
        'paper' : {'rock' : 1, 'paper' : 0.5 , 'scissor' : 0},
        'scissor' : {'paper' : 1, 'scissor' : 0.5, 'rock' :0}
    };
    var yourScore = rpsDatabase[humanChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][humanChoice];

    return[yourScore, computerScore];
}

function finalMessage([yourChoice, computerChoice]){
    if (yourChoice === 0){
        return {'message' : 'You lost!', 'color' : 'red'};
    }
    else if ( yourChoice === 1) {
        return {'message' :'You won!', 'color' : 'green'};
    }
    else{
        return {'message': 'Its a tie!', 'color' :'yellow'};
    }
}
 function rpsFrontEnd(myChoice, computerChoice, message){
    var imageSource = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src ='" + imageSource[myChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px #1547bcc3'> " ;
    messageDiv.innerHTML = "<h1 style='color:" +message['color']+";font-size: 60px; padding: 30px; '>" +message['message'] +"</h1>"
    botDiv.innerHTML = " <img src = '" + imageSource[computerChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(218, 24, 24, 0.8)'>" ;
    
    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
 }


// challenge 4: Change the color of button

var allButtons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i<allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(thisButton){
    if (thisButton.value === 'red'){
        buttonRed();
    }
    else if (thisButton.value === 'green'){
        buttonGreen();
    }
    else if (thisButton.value === 'reset'){
        buttonColorReset();
    }
    else if (thisButton.value === 'random'){
        randomColors();
    }
}

function buttonRed(){
    for(let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for(let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}


// Challenge 5

let blackjackGame = {
    'you' : {'scoreSpan' : '#your-blackjack-result', 'div' : '#your-box', 'score' : 0},
    'dealer' : { 'scoreSpan' :'#dealer-blackjack-result', 'div' : '#dealer-box', 'score': 0},
    'cards' :['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap' : {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'Q':10, 'J':10, 'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

//Hit button
function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU);
    } 
}

function showCard(activePlayer,card){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/image/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }
}

//Deal button
function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for( let i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }

        for( let i=0; i<dealerImages.length; i++){
            dealerImages[i].remove();
        }
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        YOU['score' ]= 0;
        DEALER['score'] = 0;

        blackjackGame['turnsOver'] = true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(activePlayer, card){
    if ( card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];

        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';        
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Stand button
async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand']=== true){
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

//compute winner and return whos just won
function computeWinner(){
    let winner;

    if(YOU['score'] <=21){
        if (YOU['score'] > DEALER['score'] || DEALER['score'] >21 ){
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <=21){
        blackjackGame['losses']++;
        winner = DEALER
    }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    if (blackjackGame['turnsOver'] === true){

        let message, messageColor;

        if (winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You Won!";
            messageColor = 'green';
            winSound.play();
        }
        else if( winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You Lost!";
            lossSound.play();
            messageColor = 'red';
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "Its a Tie!";
            messageColor = 'yellow';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }    
}