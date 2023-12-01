import { input } from './data.js';

const numbers = input.map((str) => {
    const digits = str.match(/\d/g) ?? [];
    const num = `${digits.at(0)}${digits.at(-1)}`;
    return +num;
});

const sum = numbers.reduce((a, c) => a + c);
console.log(sum);
