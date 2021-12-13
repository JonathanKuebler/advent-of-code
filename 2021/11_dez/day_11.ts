import * as fs from 'fs';

const FLASHED = 11;

const READY = 10;

function loadInput(): number[][] {
    let input = fs.readFileSync('input', 'utf8').split("\n").map(x => x.split("").map(x => Number(x)));
    return input;
}

function createBorder(input: number[][]): number[][] {
    let border = Array(input[0].length + 1).fill(-1)
    for (let line of input) {
        line.push(-1)
        line.unshift(-1)
    }
    input.push(border)
    input.unshift(border)
    return input
}

function increaseNeighbors(input: number[][], y: number, x: number): number[][] {
    for (let yPos = y - 1; yPos <= y + 1; yPos++) {
        for (let xPos = x - 1; xPos <= x + 1; xPos++) {
            if (input[yPos][xPos] === -1) {
                continue
            } else if (input[yPos][xPos] === READY || input[yPos][xPos] === FLASHED) {
                continue
            } else {
                input[yPos][xPos] += 1;
            }
        }
    }

    return input
}

function runOneStep(input: number[][]): [number[][], number] {
    let flashCounter = 0;
    input = input.map(function (element) {
        return element.map(function (element) {
            if (element === -1) {
                return element
            }
            return element + 1
        });
    });

    while (input.flat().includes(READY)) {
        for (let yPos = 0; yPos < input.length; yPos++) {
            for (let xPos = 0; xPos < input[0].length; xPos++) {
                if (input[yPos][xPos] === READY) {
                    increaseNeighbors(input, yPos, xPos);
                    input[yPos][xPos] = FLASHED;
                    flashCounter++
                }
            }
        }
    }

    input = input.map(function (element) {
        return element.map(function (element) {
            if (element === FLASHED) {
                return 0
            }
            return element
        })
    })
    return [input, flashCounter]
}



let input = loadInput();

input = createBorder(input)
let counter = 0;
let tmp = 0
while (true) {
    counter++
    [input, tmp] = runOneStep(input)
    if (tmp === 100) {
        break;
    }
    console.log(tmp)
}

console.log(counter)
