import { dataToStringArray } from '../readFile.js';

console.time('Execution time:');

const LETTER_NUMERIC_VALUES = {
    J: 1,
    T: 10,
    Q: 11,
    K: 12,
    A: 13,
};

const HAND_TYPE_KEYS = {
    '1-1': 6,
    '2-1': 5,
    '2-2': 4,
    '3-1': 3,
    '3-2': 2,
    '4-1': 1,
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

// Do not judge how messy and brutey this is!
function getHandType(hand) {
    const pips = hand.split('');

    const sortedNonJPipsDesc = pips
        .filter((pip) => pip !== 'J')
        .toSorted((pipA, pipB) => {
            const valueA = parseInt(pipA) || LETTER_NUMERIC_VALUES[pipA];
            const valueB = parseInt(pipB) || LETTER_NUMERIC_VALUES[pipB];

            return valueB - valueA;
        });

    let highestModePipIndex = 0;
    let highestModePipOccurances = 0;
    sortedNonJPipsDesc.forEach((pip, i) => {
        const occurrences =
            sortedNonJPipsDesc.lastIndexOf(pip) - sortedNonJPipsDesc.indexOf(pip) + 1;

        if (occurrences > highestModePipOccurances) {
            highestModePipIndex = i;
            highestModePipOccurances = occurrences;
        }
    });

    const pipsAccountingForJ = pips.map((pip) =>
        pip === 'J' ? sortedNonJPipsDesc[highestModePipIndex] ?? '1' : pip
    );
    const duplicates = pipsAccountingForJ.filter(
        (pip) => pipsAccountingForJ.indexOf(pip) !== pipsAccountingForJ.lastIndexOf(pip)
    );

    const uniquePips = [...new Set(pipsAccountingForJ)];
    const uniqueDuplicates = [...new Set(duplicates)];

    return HAND_TYPE_KEYS[`${uniquePips.length}-${uniqueDuplicates.length}`] ?? 0;
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

console.timeEnd('Execution time:');
