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

function setPlayerChoiceMsg(str) {
    document.querySelector('.player-choice').textContent = str;
}

function setComputerChoiceMsg(str) {
    document.querySelector('.computer-choice').textContent = str;
}

function setResultMsg(str) {
    document.querySelector('.result').textContent = str;
}

function getOverallResult() {
    return document.querySelector('.overall-result').textContent;
}

function setOverallResult(str) {
    document.querySelector('.overall-result').textContent = str;
}

function resetGame() {
    setWins(0);
    setTies(0);
    setLosses(0);
    setPlayerChoiceMsg('');
    setComputerChoiceMsg('');
    setResultMsg('');
    setOverallResult('');
}

function updateResults(playerSelection, computerSelection) {
    setPlayerChoiceMsg('You chose ' + playerSelection);
    setComputerChoiceMsg('Computer chose ' + computerSelection);

    let playerSelIdx = OPTIONS.indexOf(playerSelection.toUpperCase());
    let computerSelIdx = OPTIONS.indexOf(computerSelection.toUpperCase());

    if ((playerSelIdx + 2) % 3 === computerSelIdx) {
        setResultMsg(`You Win! ${playerSelection} beats ${computerSelection}`);
        setWins(getWins() + 1);
    } else if (playerSelIdx === computerSelIdx) {
        setResultMsg(`Its a Tie! Both played ${playerSelection}`);
        setTies(getTies() + 1);
    } else {
        setResultMsg(`You Lose! ${computerSelection} beats ${playerSelection}`);
        setLosses(getLosses() + 1);
    }

    if (getWins() >= 5) {
        setOverallResult('You are the champion!! You won 5 games first :D');
    } else if (getLosses() >= 5) {
        setOverallResult('The computer is the champion!! You lost 5 games :/');
    }
}

function playRound(e) {
    if (getOverallResult() !== '') resetGame();
    
    let playerSelection = capitalize(e.target.parentElement.id);
    let computerSelection = capitalize(computerPlay());
    
    updateResults(playerSelection, computerSelection);    
}

function game(num = 5) {
    for (let i = 0; i < num; i++) {
        console.log(`ROUND ${i + 1}:`)
        
        let playerSelection = getPlayerSelection();
        let computerSelection = computerPlay();

        showSelections(playerSelection, computerSelection);
        
        console.log(playRound(playerSelection, computerSelection));

        console.log();
    }
}


const buttons = document.querySelectorAll('.choice');
buttons.forEach(btn => {
    btn.addEventListener(
        'click', 
        playRound
    )
});

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', resetGame)