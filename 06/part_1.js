import { dataToStringArray } from '../readFile.js';

const data = dataToStringArray('data.txt', import.meta.url);

const durations = data[0].match(/\d+/g).map((num) => +num);
const distances = data[1].match(/\d+/g).map((num) => +num);

const numberOfWaysToWin = durations.map((duration, race) => {
    let winWays = 0;
    for (let i = 0; i < Math.floor(duration / 2) + 1; i++) {
        if (distances[race] < i * (duration - i)) winWays++;
    }

    const durationIsEven = duration % 2 === 0;
    return durationIsEven ? winWays * 2 - 1 : winWays * 2;
});

const product = numberOfWaysToWin.reduce((a, c) => a * c);
console.log('Product:', product);
