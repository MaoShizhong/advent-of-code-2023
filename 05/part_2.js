import { dataToStringArray } from '../readFile.js';

console.time('Execution time');

const almanac = dataToStringArray('data.txt', import.meta.url, '\n\n');
const maps = new Map();

const seeds = [];
almanac[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((num) => +num)
    .forEach((num, i, arr) => {
        if (i % 2 === 1) return;

        seeds.push({ min: num, max: num + arr[i + 1] });
    });

almanac
    .slice(1)
    .toReversed()
    .forEach((string) => {
        const splitString = string.split(':');
        const title = splitString[0];
        const numbers = splitString[1]
            .trim()
            .replaceAll('\n', ' ')
            .split(' ')
            .map((num) => +num);

        const rangeLengths = numbers.filter((_, i) => i % 3 === 2);
        const destinations = numbers.filter((_, i) => i % 3 === 0);
        const sources = numbers.filter((_, i) => i % 3 === 1);

        maps.set(title, {
            destinations: {
                min: destinations,
                max: destinations.map((num, j) => num + rangeLengths[j]),
            },
            sources: sources,
        });
    });

let lowestLocationNum = 0;
let seedNum;
while (!seedNumInSeeds(seedNum)) {
    seedNum = findSeedNum(lowestLocationNum);
    lowestLocationNum++;
}

console.log('Lowest location num:', lowestLocationNum - 1);
console.timeEnd('Execution time');

function seedNumInSeeds(seedNum) {
    for (const seedRange of seeds) {
        if (seedNum >= seedRange.min && seedNum <= seedRange.max) {
            return true;
        }
    }

    return false;
}

function findSeedNum(locationNum) {
    let value = locationNum;

    maps.forEach((map) => {
        const mins = map.destinations.min;
        const maxes = map.destinations.max;

        for (let i = 0; i < mins.length; i++) {
            if (value >= mins[i] && value <= maxes[i]) {
                const offset = value - mins[i];
                value = map.sources[i] + offset;
                break;
            }
        }
    });

    return value;
}
