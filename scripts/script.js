const OPTIONS = ['ROCK', 'PAPER', 'SCISSORS'];

function capitalize(word) {
    let start = word.substr(0, 1).toUpperCase();
    let rest = word.substr(1).toLowerCase();
    return start + rest;
}

function random(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}

function computerPlay() {
    return OPTIONS[random(0, 3)];
}

function getWins() {
    return +document.querySelector('.wins').lastElementChild.textContent;
}

function setWins(num) {
    document.querySelector('.wins').lastElementChild.textContent = num;
}

function getTies() {
    return +document.querySelector('.ties').lastElementChild.textContent;
}

function setTies(num) {
    document.querySelector('.ties').lastElementChild.textContent = num;
}

function getLosses() {
    return +document.querySelector('.losses').lastElementChild.textContent;
}

function setLosses(num) {
    document.querySelector('.losses').lastElementChild.textContent = num;
}

function getPlayerChoice() {
    return document.querySelector('.player-choice').textContent;
}

function isYourTurn() {
    return document.querySelector('.turn').firstElementChild.textContent === 'Your turn!';
}

function toggleYourTurn() {
    if (isYourTurn()) {
        document.querySelector('.turn').firstElementChild.textContent = '';
    } else {
        document.querySelector('.turn').firstElementChild.textContent = 'Your turn!';
    }
}

function makeSelection(e) {
    if (!isYourTurn()) proceed();
    let str = capitalize(e.target.id);
    setPlayerChoice(str);
    setFeedbackMsg('');
}

function setPlayerChoice(str) {
    document.querySelector('.player-choice').textContent = str;
}

function setComputerChoice(str) {
    document.querySelector('.computer-choice').textContent = str;
}

function setFeedbackMsg(str) {
    document.querySelector('.feedback').textContent = str;
}

function getResult() {
    return document.querySelector('.result').textContent;
}

function setResult(str) {
    document.querySelector('.result').textContent = str;
}

function resetGame() {
    setWins(0);
    setTies(0);
    setLosses(0);
    clearChoices();
    if (!isYourTurn()) {
        toggleYourTurn();
    }
}

function updateResults(playerSelection, computerSelection) {
    setComputerChoice(computerSelection);

    let playerSelIdx = OPTIONS.indexOf(playerSelection.toUpperCase());
    let computerSelIdx = OPTIONS.indexOf(computerSelection.toUpperCase());

    if ((playerSelIdx + 2) % 3 === computerSelIdx) {
        setFeedbackMsg(`You Win! ${playerSelection} beats ${computerSelection}`);
        setWins(getWins() + 1);
    } else if (playerSelIdx === computerSelIdx) {
        setFeedbackMsg(`Its a Tie! Both played ${playerSelection}`);
        setTies(getTies() + 1);
    } else {
        setFeedbackMsg(`You Lose! ${computerSelection} beats ${playerSelection}`);
        setLosses(getLosses() + 1);
    }

    if (getWins() >= 5) {
        setResult('You are the champion!! You won 5 games first :D');
    } else if (getLosses() >= 5) {
        setResult('The computer is the champion!! You lost 5 games :/');
    }
}

function clearChoices() {
    setPlayerChoice('');
    setComputerChoice('');
    setFeedbackMsg('');
    setResult('');
}

function proceed(e) {
    if (getResult() !== '') {
        resetGame();
        return;
    }
    if (isYourTurn()) {
        playRound(e);
    } else {
        clearChoices();
        toggleYourTurn();
    }
}

function playRound(e) {
    if (getResult() !== '') resetGame();
    
    let playerSelection = getPlayerChoice();
    if (playerSelection == '') {
        setFeedbackMsg('You need to choose one option')
        return
    }

    let computerSelection = capitalize(computerPlay());
    
    updateResults(playerSelection, computerSelection);
    toggleYourTurn(); 
}


const choiceButtons = document.querySelectorAll('.choice-btn');
choiceButtons.forEach(btn => {
    btn.addEventListener(
        'click', 
        makeSelection
    )
});

const confirmBtn = document.querySelector('#confirm');
confirmBtn.addEventListener('click', proceed);

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', resetGame);

resetGame();