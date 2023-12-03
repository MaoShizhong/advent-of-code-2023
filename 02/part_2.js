import { dataToStringArray } from '../readFile.js';

const games = dataToStringArray('data.txt', import.meta.url);

const cubePowers = [];

function toCubePower(red, green, blue) {
    return Math.max(...red) * Math.max(...green) * Math.max(...blue);
}

games.forEach((game, i) => {
    const redCounts = game.match(/\d+(?=\sred)/g) ?? [];
    const greenCounts = game.match(/\d+(?=\sgreen)/g) ?? [];
    const blueCounts = game.match(/\d+(?=\sblue)/g) ?? [];

    cubePowers.push(toCubePower(redCounts, greenCounts, blueCounts));
});

const sumCubePowers = cubePowers.reduce((a, c) => a + c);
console.log(sumCubePowers);
