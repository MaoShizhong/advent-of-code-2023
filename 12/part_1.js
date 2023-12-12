import { dataToStringArray } from '../readFile.js';

console.time('Execution time');

const data = dataToStringArray('data.txt', import.meta.url);
const duplicates = [];
const springArrangements = getSpringArrangements(data);
let sumPossibleArrangements = 0;

for (const [line, properties] of Object.entries(springArrangements)) {
    properties.permutations = [];
    getPermutations(properties.arrangement, properties.permutations);
    properties.count = 0;

    properties.permutations.forEach((permutation, i) => {
        if (properties.regex.test(permutation)) {
            sumPossibleArrangements++;
            properties.count++;
        }
    });

    // This is hacky as hell
    const duplicate = duplicates.find((entry) => entry.line === line);
    if (duplicate) sumPossibleArrangements += duplicate.extras * properties.count;
}

console.log('Sum of possible arrangements:', sumPossibleArrangements);

function getSpringArrangements(arr) {
    const obj = {};

    arr.forEach((line) => {
        if (Object.keys(obj).includes(line)) {
            const entry = duplicates.find((duplicate) => duplicate.line === line);
            if (entry) {
                entry.extras++;
            } else {
                duplicates.push({ line: line, extras: 1 });
            }
        }

        const [springs, groupString] = line.split(' ');
        const groups = groupString.split(',');

        let regexString = '^';
        groups.forEach((size, i) => {
            const springGroup = '#'.repeat(+size);

            if (i === 0) {
                regexString += `[^#]*${springGroup}[^#]+`;
            } else if (i === groups.length - 1) {
                regexString += `${springGroup}[^#]*$`;
            } else {
                regexString += `${springGroup}[^#]+`;
            }
        });

        obj[line] = { arrangement: springs, regex: new RegExp(regexString), groups: groupString };
    });

    return obj;
}

function getPermutations(arrangement, permutations, i = 0) {
    if (i === arrangement.length) {
        permutations.push(arrangement);
        return;
    }

    if (arrangement[i] === '?') {
        const dot = `${arrangement.slice(0, i)}.${arrangement.slice(i + 1)}`;
        getPermutations(dot, permutations, i + 1);

        const hash = `${arrangement.slice(0, i)}#${arrangement.slice(i + 1)}`;
        getPermutations(hash, permutations, i + 1);
    } else {
        getPermutations(arrangement, permutations, i + 1);
    }
}
