let cardCount = 0;

initialPrompt();
function initialPrompt() {
    cardCount = Number(prompt("Escolha um número de cartas entre 4 e 14:"));
    if (cardCount % 2 != 0 || cardCount < 4 || cardCount > 14) {
        return initialPrompt();
    } else {
        startGame();
    }
}

function startGame() {
    deck.sort(randomize); // Após esta linha, o deck estará embaralhado
    for (let i = 0; i < cardCount; i = i + 2) {
        deck.drawCard(a);
        deck.drawCard(a);
    }
}

function randomize() {
    return Math.random() - 0.5;
}
