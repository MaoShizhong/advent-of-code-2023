import { dataToStringArray } from '../readFile.js';

const schematic = dataToStringArray('data.txt', import.meta.url);
const partNumberCandidates = [];

schematic.forEach(registerPartNumberCandidates);

const parts = [];
partNumberCandidates.forEach(extractParts);

const gears = parts.filter(isGear);
const gearRatios = gears.map(getGearRatios);
const sumGearRatios = gearRatios.reduce((a, c) => a + c);
console.log('Sum:', sumGearRatios);

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

function extractParts(candidate) {
    for (let i = candidate.lineIndex - 1; i <= candidate.lineIndex + 1; i++) {
        if (!schematic[i]) continue;

        for (let j = candidate.startIndex - 1; j <= candidate.endIndex + 1; j++) {
            if (schematic[i][j] && /[^\d.]/.test(schematic[i][j])) {
                parts.push({
                    number: candidate.number,
                    symbolID: `${schematic[i][j]}${i}-${j}`,
                });
            }
        }
    }
}

function isGear(part) {
    const symbolIdAppearances = parts.reduce(
        (a, c) => (c.symbolID === part.symbolID ? a + 1 : a),
        0
    );
    return symbolIdAppearances === 2;
}

function getGearRatios(gear, i) {
    const matchingGear = gears.find(
        (otherGear, j) => otherGear.symbolID === gear.symbolID && i < j
    );
    console.log(gear, matchingGear);

    return matchingGear ? parseInt(gear.number) * parseInt(matchingGear.number) : 0;
}
