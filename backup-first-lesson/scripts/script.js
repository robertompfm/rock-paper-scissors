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

function showSelections(playerSelection, computerSelection) {
    console.log(`You chose ${capitalize(playerSelection)}`);
    console.log(`Computer chose ${capitalize(computerSelection)}`);
}

function getPlayerSelection() {
    let choice = prompt('Rock, Paper or Scissors, which do you choose?').toUpperCase();
    if (OPTIONS.indexOf(choice) === -1) {
        console.log('Wrong input! Try again')
        choice = getPlayerSelection();
    }

    return choice;
}


function playRound(playerSelection, computerSelection) {
    let playerSelIdx = OPTIONS.indexOf(playerSelection.toUpperCase());
    let computerSelIdx = OPTIONS.indexOf(computerSelection.toUpperCase());

    if ((playerSelIdx + 2) % 3 === computerSelIdx) {
        return `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    } else if (playerSelIdx === computerSelIdx) {
        return `Its a Tie! Both played ${capitalize(playerSelection)}`;
    } else {
        return `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
    }
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

game();