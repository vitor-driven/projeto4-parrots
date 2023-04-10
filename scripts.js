let cardCount = 0;
let firstCard;
let secondCard;
let totalPlays;
let totalPairs;
let totalFound;
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
        totalPairs = cardCount / 2;
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
        <div class="card">
            <div class="card-back">
                <img src="rsc/back.png" alt="Carta virada para baixo" />
            </div>
            <div class="card-front">
                <${gameDeck[j]} />
            </div>
        </div>
        `;
    }
}

function randomize() {
    return Math.random() - 0.5;
}

function selectCard() {
    if (gameDisabled == true || this === firstCard) {
        return;
    }
    this.ClassList.add("flipped");
    if (firstCard === undefined) {
        firstCard = this;
        totalPlays++;
        return;
    } else {
        secondCard = this;
        totalPlays++;
        checkPair();
    }
}

function checkPair() {
    if (firstCard.innerHTML == secondCard.innerHTML) {
        foundPair();
    } else {
        notPair();
    }
    return;
}

function foundPair() {
    firstCard.ClassList.add("found");
    secondCard.ClassList.add("found");
    totalFound++;
    if (totalFound == totalPairs) {
        gameWon();
    }
}

function notPair() {
    firstCard.ClassList.remove("flipped");
    secondCard.ClassList.remove("flipped");
}

function gameWon() {
    alert(`Parabéns! Você ganhou em ${totalPlays} jogadas!`);
}
