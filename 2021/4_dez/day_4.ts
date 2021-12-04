import * as fs from 'fs';

const CORRECT = -1;

interface Game {
    bingo_boards: number[][][];
    numbers_called: number[];
}

function loadInput(): Game {
    const input = fs.readFileSync('input', 'utf8').split("\n\n");

    const numbers_called = input[0].split(",").map(Number)
    let bingo_boards = input.slice(1).map(function (item) {
        return item.split("\n").map(function (item) {
            return item.trim().split(/\s+/).map(Number);
        });
    });
    return { bingo_boards: bingo_boards, numbers_called: numbers_called };
}

function checkHorizontal(board: number[][]) {
    let bingo = true;
    for (let line of board) {
        for (let cell of line) {
            if (cell != CORRECT) {
                bingo = false;
                break;
            }
        }
        if (bingo === true) {
            return true;
        }
        bingo = true;
    }
    return false;
}

function checkVertical(board: number[][]) {
    let bingo = true;
    for (let column = 0; column < board[0].length; column++) {
        for (let row = 0; row < board.length; row++) {
            if (board[row][column] != CORRECT) {
                bingo = false;
                break;
            }
        }
        if (bingo === true) {
            return true;
        }
        bingo = true;
    }
    return false;
}

function checkIfDone(board: number[][]) {
    if (checkHorizontal(board)) {
        return true;
    }
    else if (checkVertical(board)) {
        return true;
    }
    else {
        return false;
    }
}

function sumOfUnmarked(board: number[][]): number {
    let sum = 0;
    for (let line of board) {
        for (let el of line) {
            if (el != CORRECT) {
                sum += el;
            }
        }
    }
    return sum;
}

function removeDone(bingo_boards: number[][][]) {
    for (let board of bingo_boards) {
        if (checkIfDone(board) && bingo_boards.length > 1) {
            const index = bingo_boards.indexOf(board);
            bingo_boards.splice(index, 1);
        }
    }
}

function markCorrect(board: number[][], nbr: number): number[][] {
    board = board.map(function (line) {
        for (let el in line) {
            if (line[el] === nbr) {
                line[el] = CORRECT;
            }
        }
        return line;
    });
    return board;
}

function playBingoToWin(bingo_boards: number[][][], numbers_called: number[]): number | void {
    for (let nbr of numbers_called) {
        for (let board of bingo_boards) {
            markCorrect(board, nbr)
            if (checkIfDone(board)) {
                return sumOfUnmarked(board) * nbr;
            }
        }
    }
}

function playBingoToLoose(bingo_boards: number[][][], numbers_called: number[]): number | void {
    for (let nbr of numbers_called) {
        for (let board of bingo_boards) {
            markCorrect(board, nbr)
        }
        removeDone(bingo_boards)

        if (bingo_boards.length === 1 && checkIfDone(bingo_boards[0])) {
            return sumOfUnmarked(bingo_boards[0]) * nbr;
        }
    }
}

var { bingo_boards, numbers_called } = loadInput();

let result = playBingoToWin(bingo_boards, numbers_called);

console.log(result);

({ bingo_boards, numbers_called } = loadInput());

result = playBingoToLoose(bingo_boards, numbers_called);

console.log(result);
