import * as fs from 'fs';

const openBrackets: string[] = ['(', '{', '[', '<'];
const closeBrackets: string[] = [')', '}', ']', '>'];
const costPart1: { [braket: string]: number } = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const costPart2: { [braket: string]: number } = { "(": 1, "[": 2, "{": 3, "<": 4 };

function loadInput(): string[] {
    let input = fs.readFileSync('input', 'utf8').split("\n");
    return input;
}

function check(line: string): [number, number] {
    let holder = [];
    let broken = "";
    for (let letter of line) {
        if (openBrackets.includes(letter)) {
            holder.push(letter);
        } else if (closeBrackets.includes(letter)) {
            const openPair = openBrackets[closeBrackets.indexOf(letter)]
            if (holder[holder.length - 1] === openPair) {
                holder.splice(-1, 1);
            } else {
                broken = letter;
                break;
            }
        }
    }

    if (broken != "") {
        return [Number(costPart1[broken]), 0];
    } else {
        let contest = 0;
        for (let index = holder.length - 1; index >= 0; index--) {
            contest = contest * 5;
            contest = contest + costPart2[holder[index]];
        }
        return [0, Number(contest)];
    }
}

let input = loadInput();

let scorePart1: number = 0;
let scorePart2 = [];
for (let line of input) {
    let [part1, part2] = check(line);
    scorePart1 += Number(part1);
    if (Number(part2) != 0) {
        scorePart2.push(Number(part2));
    }
}
console.log("Solution Part 1: " + scorePart1);


scorePart2 = scorePart2.sort(function (x, y) { return x - y });
console.log("Solution Part 2: " + scorePart2[(scorePart2.length - 1) / 2]);
