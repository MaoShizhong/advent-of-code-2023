import { dataToStringArray } from '../readFile.js';

const data = dataToStringArray('data.txt', import.meta.url, '\n\n');

const directions = data[0].split('').map((letter) => (letter === 'R' ? 1 : 0));
const mapData = data[1].split('\n');

const map = {};
mapData.forEach((line) => {
    const key = line.slice(0, 3);
    const left = line.match(/(?<=\()[A-Z\d]{3}/)[0];
    const right = line.match(/[A-Z\d]{3}(?=\))/)[0];

    if (key.endsWith('A')) {
        map.starts = (map.starts ?? []).concat([key]);
    }

    map[key] = { 0: left, 1: right };
});

console.log('Start positions:', map.starts);

const stepsPerCycle = {};
map.starts.forEach((position) => {
    const start = position;
    stepsPerCycle[start] = [];

    let count = 0;
    while (!position.endsWith('Z')) {
        for (const direction of directions) {
            count++;
            position = map[position][direction];

            if (position.endsWith('Z')) {
                stepsPerCycle[start] = count;
                break;
            }
        }
    }
});

console.log(
    'All routes simultaneously at a destination point:',
    lowestCommonMultiple(...Object.values(stepsPerCycle)),
    'steps'
);

function lowestCommonMultiple(...nums) {
    nums = nums.flat();

    if (nums.length === 2) {
        return (nums[0] * nums[1]) / greatestCommonDivisor(nums[0], nums[1]);
    } else {
        return lowestCommonMultiple(nums[0], lowestCommonMultiple(...nums.slice(1)));
    }
}

function greatestCommonDivisor(a, b) {
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}
