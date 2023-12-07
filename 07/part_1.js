import { dataToStringArray } from '../readFile.js';

const LETTER_NUMERIC_VALUES = {
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

const HAND_TYPE_KEYS = {
    '1-1': 6,
    '2-1': 5,
    '2-2': 4,
    '3-1': 3,
    '3-2': 2,
    '4-1': 1,
    '5-0': 0,
};

const data = dataToStringArray('data.txt', import.meta.url);
const handTypes = {};
const hands = data.map((row) => {
    const arr = row.split(' ');
    return [...arr, getHandType(arr[0])];
});

hands.sort(sortByHandTypeAsc);

hands.forEach((hand) => {
    const key = hand.at(-1);

    if (!handTypes[key]) handTypes[key] = [hand];
    else handTypes[key].push(hand);
});

for (const setOfHands of Object.values(handTypes)) {
    setOfHands.sort(sortByHandStrengthAsc);
}

const scoreTotal = Object.values(handTypes).flat().reduce(sumHandScores, 0);
console.log('Score total:', scoreTotal);

function getHandType(hand) {
    const pips = hand.split('');
    const duplicates = pips.filter((pip) => pips.indexOf(pip) !== pips.lastIndexOf(pip));

    const uniquePips = [...new Set(pips)];
    const uniqueDuplicates = [...new Set(duplicates)];

    return HAND_TYPE_KEYS[`${uniquePips.length}-${uniqueDuplicates.length}`];
}

function sortByHandTypeAsc(handA, handB) {
    return handA.at(-1) - handB.at(-1);
}

function sortByHandStrengthAsc(handA, handB) {
    handA = handA[0].split('').map((pip) => parseInt(pip) || LETTER_NUMERIC_VALUES[pip]);
    handB = handB[0].split('').map((pip) => parseInt(pip) || LETTER_NUMERIC_VALUES[pip]);

    for (let i = 0; i < handA.length; i++) {
        if (handA[i] > handB[i]) {
            return 1;
        } else if (handA[i] < handB[i]) {
            return -1;
        }
    }

    return 0;
}

function sumHandScores(currentTotal, hand, index) {
    const handScore = +hand[1] * (index + 1);
    return currentTotal + handScore;
}
