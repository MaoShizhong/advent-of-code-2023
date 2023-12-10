import { dataToStringArray } from '../readFile.js';

const lines = dataToStringArray('data.txt', import.meta.url);

let sumExtrapolatedValues = 0;

lines.forEach((line) => {
    line = line.split(' ').map((num) => +num);

    const nextIncrement = getNextIncrement(line);
    sumExtrapolatedValues += line.at(-1) + nextIncrement;
});

console.log('Sum of predicted values:', sumExtrapolatedValues);

function getNextIncrement(nums) {
    if (nums.every((num) => num === 0)) return 0;

    const differences = [];

    for (let i = 0; i < nums.length - 1; i++) {
        differences.push(nums[i + 1] - nums[i]);
    }

    const nextIncrement = getNextIncrement(differences);
    return differences.at(-1) + nextIncrement;
}
