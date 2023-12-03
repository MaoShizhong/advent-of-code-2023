import { dataToStringArray } from '../readFile.js';

const schematic = dataToStringArray('data.txt', import.meta.url);
const partNumberCandidates = [];

schematic.forEach(registerPartNumberCandidates);

const parts = partNumberCandidates.filter(hasSurroundingSymbol);
const sumPartNumbers = parts.reduce((a, c) => a + parseInt(c.number), 0);
console.log('Sum:', sumPartNumbers);

function registerPartNumberCandidates(line, lineIndex) {
    const partNumberCandidatesInLine = [];

    const indexes = {};

    for (let i = 0; i < line.length; i++) {
        if (!isNaN(+line[i]) && isNaN(+line[i - 1])) {
            indexes.start = i;
        }

        if (!isNaN(+line[i]) && isNaN(+line[i + 1])) {
            indexes.end = i;
            partNumberCandidatesInLine.push({ ...indexes });
        }
    }

    partNumberCandidatesInLine.forEach((setOfIndexes) => {
        partNumberCandidates.push({
            number: line.slice(setOfIndexes.start, setOfIndexes.end + 1),
            lineIndex: lineIndex,
            startIndex: setOfIndexes.start,
            endIndex: setOfIndexes.end,
        });
    });
}

function hasSurroundingSymbol(candidate) {
    for (let i = candidate.lineIndex - 1; i <= candidate.lineIndex + 1; i++) {
        if (!schematic[i]) continue;

        for (let j = candidate.startIndex - 1; j <= candidate.endIndex + 1; j++) {
            if (schematic[i][j] && /[^\d.]/.test(schematic[i][j])) {
                return true;
            }
        }
    }

    return false;
}
