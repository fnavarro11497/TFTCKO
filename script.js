const compButtons = document.querySelectorAll('.comp-button');
const rounds = document.querySelector('.round');
const combatText = document.querySelector('.combat-text');
const buttonPlayAgain = document.querySelector('.play-again');


let playerLives = 100;
let computerLives = 100;
let round = 0;

function countRounds() {
    round += 1;
    rounds.innerText = `RONDA: ${round}`;
    return rounds;
}

function computerPlay(){
    const comps = ['astral', 'jubiloso', 'jade'];
    const computerSelection = comps[Math.floor(Math.random() * comps.length)];
    const computerIcon = document.getElementById("changeImg");

    if (computerSelection === 'astral') {
        computerIcon.src="./images/aurelion-sol-lol-splash-art-uhdpaper.com-hd-692-1.jpg";
        }
    else if (computerSelection === 'jubiloso'){
        computerIcon.src="./images/Daeja.jpg";
    }
    else if (computerSelection === 'jade'){
        computerIcon.src="./images/b6de1865-shi-oh-yu-splash-1.jpg";
    }

    return computerSelection

}


function countLives (playerSeletion, computerSelection) {
    const gameOutput = document.querySelector('.game-output');
    const computerPlayDiv = document.querySelector('.computer.play-div');

    switch (true) {
        case (playerSeletion === computerSelection):
            combatText.innerText = `Empate! Ninguno pega ni verga, parece la composicion de 6 guardianes de Matsuki.`;
            break
            case (playerSeletion === 'astral' && computerSelection === 'jubiloso'):
            case (playerSeletion === 'jubiloso' && computerSelection === 'jade'):
            case (playerSeletion === 'jade' && computerSelection === 'astral'):
                combatText.textContent = `Claaaase turcazoo! Tus ${playerSeletion} se culearon a sus ${computerSelection}! Que barbaro, te la diste.`
                computerLives -= 20;
                break;
            default:
                combatText.innerText = `Sos la verga... Te quitaron 20 de un solo turcazo, sus ${computerSelection} le metieron la yuca a tus ${playerSeletion}!`
                playerLives -= 20;
                break;
    }
    const lives = document.querySelector('.lives');
    lives.innerText = `TU VIDA: ${playerLives} | VIDA DEL ENEMIGO ${computerLives}`;
    return [playerLives, computerLives];
}

function endGame(playerHealth, computerHealth) {
    if (playerHealth === 0 || computerHealth === 0) {
        compButtons.forEach((button) => {
            button.setAttribute('disabled', '');
            button.classList.add('disabled-button', 'opacity');
        })


        const computerIcon = document.querySelector('.computer-icon'); 
        computerIcon.style.opacity = '0.5';

        const gameEndText = document.querySelector('.game-end-text');
        if (playerLives > computerLives) {
            combatText.innerText = `Que rico PL! Le metiste la yuca, te la diste.`;
            gameEndText.textContent = 'Ganaste esta!'
        }
        else {
            combatText.innerText = 'Te fuiste en mierda! Te quitaron todo el PL, no bajaste de division porque no se puede. Sos la verga!';
            gameEndText.textContent = 'Perdiste esta!';
        }

        buttonPlayAgain.style.visibility = 'visible';
    }
}


function resetGame() {
    buttonPlayAgain.addEventListener('click', () => {
        window.location.reload();
    });
}

function playGame() {
    let playerSelection;
    compButtons.forEach((comp) => {
        comp.addEventListener('click', () => {
            const compImgs = document.querySelectorAll('.AstralImg');
            if (comp.classList.contains('astral-button')){
                playerSelection = 'astral';
            } else if (comp.classList.contains('Jubiloso-button')){
                playerSelection = 'jubiloso';
            } else {
                playerSelection = 'jade';
            }
            countRounds();
            countLives(playerSelection, computerPlay());
            endGame(playerLives, computerLives);
            resetGame();
            
        });
    });
}

playGame();