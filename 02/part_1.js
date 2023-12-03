import { dataToStringArray } from '../readFile.js';

const games = dataToStringArray('data.txt', import.meta.url);

const COLOR_LIMITS = {
    RED: 12,
    GREEN: 13,
    BLUE: 14,
};

const validGameIDs = [];

games.forEach((game, i) => {
    const redCounts = game.match(/\d+(?=\sred)/g) ?? [];
    const greenCounts = game.match(/\d+(?=\sgreen)/g) ?? [];
    const blueCounts = game.match(/\d+(?=\sblue)/g) ?? [];

    if (
        redCounts.every((count) => +count <= COLOR_LIMITS.RED) &&
        greenCounts.every((count) => +count <= COLOR_LIMITS.GREEN) &&
        blueCounts.every((count) => +count <= COLOR_LIMITS.BLUE)
    ) {
        validGameIDs.push(i + 1);
    }
});

const sumValidIDs = validGameIDs.reduce((a, c) => a + c);
console.log(sumValidIDs);
