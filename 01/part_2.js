import { input } from './data.js';

// overlapping number words never more than 1 char
const validWordReplacements = {
    one: 'o1e',
    two: 't2o',
    three: 'th3ee',
    four: 'fo4r',
    five: 'fi5e',
    six: 's6x',
    seven: 'se7en',
    eight: 'ei8ht',
    nine: 'ni9e',
};

function substituteNumWordsWithDigits(string) {
    for (const [word, substitute] of Object.entries(validWordReplacements)) {
        string = string.replaceAll(word, substitute);
    }

    return string;
}

const numbers = input.map((str) => {
    const substitutedStr = substituteNumWordsWithDigits(str);
    const digits = substitutedStr.match(/\d/g) ?? []; // or substitutedStr.replaceAll(/[^\d]/g, '')
    const num = `${digits.at(0)}${digits.at(-1)}`;

    return +num;
});

const sum = numbers.reduce((a, c) => a + c);
console.log(sum);
