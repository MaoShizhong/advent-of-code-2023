import { dataToStringArray } from '../readFile.js';

console.time('Day 10 part 1 time');

const lines = dataToStringArray('data.txt', import.meta.url);
const cells = lines.map((line) => line.split(''));

const START = 'S';
const PIPE_CONNECTIONS = {
    '|': [
        { incoming: 'N', outgoing: 'N' },
        { incoming: 'S', outgoing: 'S' },
    ],
    '-': [
        { incoming: 'E', outgoing: 'E' },
        { incoming: 'W', outgoing: 'W' },
    ],
    L: [
        { incoming: 'S', outgoing: 'E' },
        { incoming: 'W', outgoing: 'N' },
    ],
    J: [
        { incoming: 'E', outgoing: 'N' },
        { incoming: 'S', outgoing: 'W' },
    ],
    7: [
        { incoming: 'E', outgoing: 'S' },
        { incoming: 'N', outgoing: 'W' },
    ],
    F: [
        { incoming: 'W', outgoing: 'S' },
        { incoming: 'N', outgoing: 'E' },
    ],
};
const ORTHOGONAL_OFFSETS = {
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
};

const validPipes = Object.keys(PIPE_CONNECTIONS);
const startCoords = getStartCoordinates(cells);

const currentCell = {
    coordinates: startCoords,
    distanceFromStart: 0,
    to: getStartToDirection(startCoords, cells),
};

while (currentCell.pipe !== START) {
    const [startY, startX] = currentCell.coordinates;
    const [offsetY, offsetX] = ORTHOGONAL_OFFSETS[currentCell.to];
    const checkedCell = cells[startY + offsetY][startX + offsetX];

    const isPipe = validPipes.includes(checkedCell);
    const isConnected =
        isPipe &&
        PIPE_CONNECTIONS[checkedCell].some((directions) => directions.incoming === currentCell.to);

    if (isPipe && isConnected) {
        const newDirection = PIPE_CONNECTIONS[checkedCell].find(
            (directions) => directions.incoming === currentCell.to
        ).outgoing;

        currentCell.pipe = checkedCell;
        currentCell.coordinates = [startY + offsetY, startX + offsetX];
        currentCell.to = newDirection;
        currentCell.distanceFromStart++;
    } else if (checkedCell === START) {
        currentCell.pipe = START;
        currentCell.distanceFromStart++;
    }
}

console.log(
    'Steps to reach farthest from pipe from start:',
    Math.ceil(currentCell.distanceFromStart / 2)
);

function getStartCoordinates(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === START) return [i, j];
        }
    }
}

function getStartToDirection(startCoords, arr) {
    for (const [direction, offsets] of Object.entries(ORTHOGONAL_OFFSETS)) {
        const [startY, startX] = startCoords;
        const [offsetY, offsetX] = offsets;
        const checkedCell = arr[startY + offsetY][startX + offsetX];

        const isPipe = validPipes.includes(checkedCell);
        const isConnected =
            isPipe &&
            PIPE_CONNECTIONS[checkedCell].find((directions) => directions.incoming === direction);

        if (isPipe && isConnected) {
            return direction;
        }
    }
}

console.timeEnd('Day 10 part 1 time');
