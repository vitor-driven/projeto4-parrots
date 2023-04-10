let cardCount = 0;
let firstCard = null;
let secondCard = null;
let totalPlays;
let totalFound;
let gameDisabled = false;
let gameArea = document.querySelector(".gameArea");
gameArea.innerHTML = "";

let cardTypes = [
    'img src="/rsc/bobrossparrot.gif" alt="Bob Ross"',
    'img src="/rsc/bobrossparrot.gif" alt="Bob Ross"',
    'img src="/rsc/explodyparrot.gif" alt="Explosion"',
    'img src="/rsc/explodyparrot.gif" alt="Explosion"',
    'img src="/rsc/fiestaparrot.gif" alt="Fiesta"',
    'img src="/rsc/fiestaparrot.gif" alt="Fiesta"',
    'img src="/rsc/metalparrot.gif" alt="Metal"',
    'img src="/rsc/metalparrot.gif" alt="Metal"',
    'img src="/rsc/revertitparrot.gif" alt="Revert"',
    'img src="/rsc/revertitparrot.gif" alt="Revert"',
    'img src="/rsc/tripletsparrot.gif" alt="Triplet"',
    'img src="/rsc/tripletsparrot.gif" alt="Triplet"',
    'img src="/rsc/unicornparrot.gif" alt="Unicorn"',
    'img src="/rsc/unicornparrot.gif" alt="Unicorn"',
];

initialPrompt();
function initialPrompt() {
    cardCount = Number(prompt("Escolha o número de cartas entre 4 e 14:"));
    if (cardCount % 2 != 0 || cardCount < 4 || cardCount > 14) {
        return initialPrompt();
    } else {
        totalPlays = 0;
        totalFound = 0;
        gameDisabled = false;
        gameArea.innerHTML = "";
        startGame();
    }
}

function startGame() {
    // Primeira função gera o deck do jogo
    let gameDeck = [];
    for (let i = 0; i < cardCount; i++) {
        gameDeck.push(cardTypes[i]);
    }
    gameDeck.sort(randomize); // Após esta linha, o deck do jogo estará embaralhado

    // Agora as cartas são criadas na página
    for (let j = 0; j < cardCount; j++) {
        gameArea.innerHTML += `
        <div class="container" data-test="card">
            <div class="card" onClick="selectCard(this)">
                <div class="card-back">
                    <img src="rsc/back.png" data-test"face-down-image" alt="Carta virada para baixo" />
                </div>
                <div class="card-front">
                    <${gameDeck[j]} data-test="face-up-image" />
                </div>
            </div>
        </div>
        `;
    }
}

function randomize() {
    return Math.random() - 0.5;
}

function disableGame() {
    gameDisabled = true;
}

function enableGame() {
    gameDisabled = false;
}

function selectCard(card) {
    if (gameDisabled == true || card === firstCard) {
        return;
    }
    card.classList.add("flipped");
    if (firstCard == null) {
        firstCard = card;
        totalPlays++;
        return;
    } else {
        secondCard = card;
        totalPlays++;
        disableGame();
        setTimeout(() => {
            checkPair();
            enableGame();
        }, 1000);
    }
}

function checkPair() {
    if (firstCard.innerHTML == secondCard.innerHTML) {
        foundPair();
    } else {
        notPair();
    }
    firstCard = null;
    secondCard = null;
    return;
}

function foundPair() {
    firstCard.classList.add("found");
    secondCard.classList.add("found");
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    totalFound++;
    if (totalFound == cardCount / 2) {
        gameWon();
    }
}

function notPair() {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
}

function gameWon() {
    clearInterval(runClock());
    alert(`Parabéns! Você ganhou em ${totalPlays} jogadas!`);
    restartGame();
}

function restartGame() {
    let playAgain;
    playAgain = prompt("Gostaria de jogar denovo?");
    if (playAgain == "sim") {
        initialPrompt();
    } else if (playAgain != "não") {
        return;
    }
}
