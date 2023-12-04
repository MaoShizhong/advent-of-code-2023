import { dataToStringArray } from '../readFile.js';

const scratchCards = dataToStringArray('data.txt', import.meta.url);

const cardCounts = {};
scratchCards.forEach((_, i) => (cardCounts[i] = 1));

for (let id of Object.keys(cardCounts)) {
    id = +id;
    const matchCount = countWinningNums(scratchCards[id]);

    for (let i = 1; i < matchCount + 1; i++) {
        cardCounts[id + i] += cardCounts[id];
    }
}

const totalCards = Object.values(cardCounts).reduce((a, c) => a + c);
console.log('Total cards:', totalCards);

function countWinningNums(scratchCard) {
    const winningNums = scratchCard.match(/(?<=:.*)\d+(?=.*\|)/g) ?? [];
    const chosenNums = scratchCard.match(/(?<=\|.*)\d+/g) ?? [];

    let numberOfMatches = 0;
    chosenNums.forEach((num) => {
        if (winningNums.includes(num)) numberOfMatches++;
    });

    return numberOfMatches;
}
