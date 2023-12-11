import { dataToStringArray } from '../readFile.js';

console.time('Execution time');

const EXPANSION_FACTOR = 2;
const EXPANSION_CORRECTION = EXPANSION_FACTOR - 1;

const smallSpace = dataToStringArray('data.txt', import.meta.url);
const expandedSpace = expandSpace(smallSpace);
const galaxyPairs = getGalaxyPairs(expandedSpace);
let sumShortestPairDistances = 0;

galaxyPairs.forEach((pairings, galaxy) => {
    pairings.forEach((otherGalaxy) => {
        const differenceY = Math.abs(otherGalaxy[0] - galaxy[0]);
        const differenceX = Math.abs(otherGalaxy[1] - galaxy[1]);

        sumShortestPairDistances += differenceY + differenceX;
    });
});

console.log('Sum of shortest paths between galaxy pairs:', sumShortestPairDistances);

function expandSpace(space) {
    for (let i = 0; i < space[0].length; i++) {
        if (space.every((row) => row[i] === '.')) {
            space = space.map(
                (row) => `${row.slice(0, i)}${'.'.repeat(EXPANSION_CORRECTION)}${row.slice(i)}`
            );
            i += EXPANSION_CORRECTION;
        }
    }

    for (let i = 0; i < space.length; i++) {
        const fullEmptyRow = '.'.repeat(space[i].length);

        if (space[i] === fullEmptyRow) {
            const insertedRows = Array(EXPANSION_CORRECTION).fill(fullEmptyRow);

            space.splice(i, 0, ...insertedRows);
            i += EXPANSION_CORRECTION;
        }
    }

    return space;
}

function getGalaxyPairs(space) {
    const pairs = new Map();
    const galaxies = [];

    for (let i = 0; i < space.length; i++) {
        for (let j = 0; j < space[i].length; j++) {
            if (space[i][j] === '#') {
                galaxies.push([i, j]);
            }
        }
    }

    galaxies.forEach((galaxy) => {
        pairs.set(
            galaxy,
            galaxies.filter((otherGalaxy) => {
                return otherGalaxy !== galaxy && !(pairs.get(otherGalaxy) ?? []).includes(galaxy);
            })
        );
    });

    return pairs;
}

console.timeEnd('Execution time');
