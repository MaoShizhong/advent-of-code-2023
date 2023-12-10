import { dataToStringArray } from '../readFile.js';

const lines = dataToStringArray('data.txt', import.meta.url);

let sumExtrapolatedValues = 0;

lines.forEach((line) => {
    line = line.split(' ').map((num) => +num);

    const previousDecrement = getPreviousDecrement(line);
    sumExtrapolatedValues += line[0] - previousDecrement;
});

console.log('Sum of predicted past values:', sumExtrapolatedValues);

function getPreviousDecrement(nums) {
    if (nums.every((num) => num === 0)) return 0;

    const differences = [];

    for (let i = 0; i < nums.length - 1; i++) {
        differences.push(nums[i + 1] - nums[i]);
    }

    const previousDecrement = getPreviousDecrement(differences);
    return differences[0] - previousDecrement;
}
