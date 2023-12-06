import { dataToStringArray } from '../readFile.js';

const data = dataToStringArray('data.txt', import.meta.url);

const duration = parseInt(data[0].replaceAll(' ', '').split(':')[1]);
const distance = parseInt(data[1].replaceAll(' ', '').split(':')[1]);

let winWays = 0;
for (let i = 0; i < Math.floor(duration / 2) + 1; i++) {
    if (distance < i * (duration - i)) winWays++;
}

winWays *= 2;

if (duration % 2 === 0) winWays--;

console.log('Ways to win:', winWays);
