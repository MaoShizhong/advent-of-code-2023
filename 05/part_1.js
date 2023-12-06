import { dataToStringArray } from '../readFile.js';

const almanac = dataToStringArray('data.txt', import.meta.url, '\n\n');
const maps = {};

const seeds = almanac[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((num) => +num);

almanac.forEach((string, i) => {
    if (i === 0) return;

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

    maps[title] = {
        sources: {
            min: sources,
            max: sources.map((num, j) => num + rangeLengths[j]),
        },
        destinations: destinations,
    };
});

console.log('Seeds:', seeds);
console.dir(maps, { depth: null });

const locations = [];

seeds.forEach((seed) => {
    let value = seed;
    for (const map in maps) {
        const mins = maps[map].sources.min;
        const maxes = maps[map].sources.max;

        for (let i = 0; i < mins.length; i++) {
            if (value >= mins[i] && value <= maxes[i]) {
                const offset = value - mins[i];
                value = maps[map].destinations[i] + offset;
                break;
            }
        }
    }
    locations.push(value);
});

console.log('Lowest location num:', Math.min(...locations));
