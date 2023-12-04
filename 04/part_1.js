import { dataToStringArray } from '../readFile.js';

const scratchCards = dataToStringArray('data.txt', import.meta.url);

const points = scratchCards.reduce(scoreScratchCards, 0);

function scoreScratchCards(currentScore, scratchCard) {
    const winningNums = scratchCard.match(/(?<=:.*)\d+(?=.*\|)/g) ?? [];
    const chosenNums = scratchCard.match(/(?<=\|.*)\d+/g) ?? [];

    let numberOfMatches = 0;
    let scratchCardScore = 0;
    chosenNums.forEach((num) => {
        if (winningNums.includes(num)) {
            scratchCardScore = scratchCardScore * 2 || 1;
            numberOfMatches++;
        }
    });

    return currentScore + scratchCardScore;
}

console.log(points);
