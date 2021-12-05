import * as fs from 'fs';

type direction = -1 | 0 | 1;

interface line {
    x1: number;
    x2: number;
    xd: direction;
    y1: number;
    y2: number;
    yd: direction;
}

function dropDiagonal(lines: line[]): line[] {
    let toDrop: number[] = [];
    for (let line of lines) {
        if (!isNotDiagonal(line)) {
            toDrop.unshift(lines.indexOf(line))
        }
    }
    for (let index of toDrop) {
        lines.splice(index, 1)
    }
    return lines
}

function isNotDiagonal(line: line): boolean {
    if (line.y1 === line.y2 || line.x1 === line.x2) {
        return true
    }
    return false
}

function getDirection(n1: number, n2: number): direction {
    return Math.sign(n2 - n1) as direction;
}

function loadLines(): line[] {
    const loadedLines = fs.readFileSync('input', 'utf8').split("\n").map(function (el) {
        return el.split(" -> ");
    });

    let lines: line[] = []

    for (let loadedLine of loadedLines) {
        let [x1, y1] = loadedLine[0].split(",").map(Number); // forgetting the cast cost me ~2h
        let [x2, y2] = loadedLine[1].split(",").map(Number);
        let xd = getDirection(x1, x2);
        let yd = getDirection(y1, y2);

        let line: line = {
            x1: x1,
            x2: x2,
            xd: xd,
            y1: y1,
            y2: y2,
            yd: yd
        }
        lines.push(line)
    }

    return lines
}

function getMaxDimensions(lines: line[]): { max_x: number, max_y: number } {
    let max_x = 0;
    let max_y = 0;
    for (let line of lines) {
        max_x = Math.max(max_x, Math.max(line.x1, line.x2));
        max_y = Math.max(max_y, Math.max(line.y1, line.y2));
    }
    return { max_x, max_y };
}

function createResultArray(lines: line[]): number[][] {
    let { max_x, max_y } = getMaxDimensions(lines)
    let results: number[][] = new Array(max_y + 1)
        .fill(0)
        .map(() =>
            new Array(max_x + 1).fill(0)
        );
    return results;
}


function drawLines(lines: line[]): number[][] {
    let results = createResultArray(lines);
    for (let line of lines) {
        for (let addition = 0; addition <= Math.max(Math.abs(line.x2 - line.x1), Math.abs(line.y2 - line.y1)); addition++) {
            results[line.y1 + (line.yd * addition)][line.x1 + (line.xd * addition)] += 1;
        }
    }
    return results
}

function countDangerousAreas(lines: line[]): number {
    let counter = 0;
    let ArrayOfHydrothermalVents = drawLines(lines)
    for (let y = 0; y < ArrayOfHydrothermalVents.length; y++) {
        for (let x = 0; x < ArrayOfHydrothermalVents[0].length; x++) {
            if (ArrayOfHydrothermalVents[y][x] > 1) {
                counter++;
            }
        }
    }
    return counter;
}

let lines = loadLines();

lines = dropDiagonal(lines);

console.log("Solution Part1: " + countDangerousAreas(lines));

lines = loadLines();

console.log("Solution Part2: " + countDangerousAreas(lines));
