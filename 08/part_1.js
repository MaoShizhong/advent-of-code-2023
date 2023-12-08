import { dataToStringArray } from '../readFile.js';

const data = dataToStringArray('data.txt', import.meta.url, '\n\n');

const directions = data[0].split('').map((letter) => (letter === 'R' ? 1 : 0));
const mapData = data[1].split('\n');

const map = {};
mapData.forEach((line) => {
    const key = line.slice(0, 3);
    const left = line.match(/(?<=\()[A-Z]{3}/)[0];
    const right = line.match(/[A-Z]{3}(?=\))/)[0];

    map[key] = { 0: left, 1: right };
});

let stepsTaken = 0;
let currentPosition = 'AAA';
const destination = 'ZZZ';

while (currentPosition !== destination) {
    for (const direction of directions) {
        stepsTaken++;
        currentPosition = map[currentPosition][direction];

        if (currentPosition === destination) break;
    }
}

console.log('Steps required from AAA to ZZZ:', stepsTaken);
