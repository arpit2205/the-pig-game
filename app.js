/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying, dice1, dice2;
var dice1DOM = document.getElementById('dice-1');
var dice2DOM = document.getElementById('dice-2');

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (isGamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        dice1DOM = document.getElementById('dice-1');
        dice2DOM = document.getElementById('dice-2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = './assets/dice-' + dice1 + '.png';
        dice2DOM.src = './assets/dice-' + dice2 + '.png';

        //3. Update round score IF the rolled number is NOT 1
        if ((dice1 === 1 || dice2 === 1) || ((dice1 === 6) && (dice2 === 6))) {
            //Next Player
            nextPlayer();

        } else {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {

    if (isGamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            dice1DOM.style.display = 'none';
            dice2DOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            isGamePlaying = false;

        } else {
            //Next Player
            nextPlayer();
            dice1DOM.style.display = 'none';
            dice2DOM.style.display = 'none';
        }
    }
})


document.querySelector('.btn-new').addEventListener('click', init);


///////////////////////////////////////////////////////////////////////////

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Toggle active class
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

}




















