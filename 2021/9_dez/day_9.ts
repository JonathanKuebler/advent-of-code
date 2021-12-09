import * as fs from 'fs';

function load_input(): number[][] {
    let input = fs.readFileSync('input', 'utf8').split("\n").map(x => x.split("").map(Number))

    //This was not my Idea but it makes the most sense to get rid of my If-else
    //madness.
    for (let line of input) {
        line.push(9);
        line.unshift(9);
    }
    let line = Array(input[0].length).fill(9);
    input.push(line);
    input.unshift(line);
    return input;
}

function findBasinSeeds(): [number[][], number] {
    let input = load_input();
    let basins = input;
    let numberOfLowest = 0;
    let basinSeed = -1;

    for (let Ypos = 0; Ypos < input.length; Ypos++) {
        for (let Xpos = 0; Xpos < input[0].length; Xpos++) {
            let current = input[Ypos][Xpos]
            if (input[Ypos][Xpos] === 9) {
                continue;
            } else if (current < input[Ypos][Xpos + 1] &&
                current < input[Ypos - 1][Xpos] &&
                current < input[Ypos][Xpos - 1] &&
                current < input[Ypos + 1][Xpos]) {
                basins[Ypos][Xpos] = basinSeed;
                basinSeed--
                numberOfLowest += current + 1;
            }
        }
    }

    return [basins, numberOfLowest];
}

function mergeBasins(basins: number[][], oldValue: number, newValue: number): number[][] {
    for (let Ypos = 0; Ypos < basins.length; Ypos++) {
        for (let Xpos = 0; Xpos < basins[0].length; Xpos++) {
            if (basins[Ypos][Xpos] === oldValue) {
                basins[Ypos][Xpos] = newValue;
            }
        }
    }
    return basins
}

function flowOneDirection(basins: number[][], YposCur: number, XposCur: number, YposNew: number, XposNew: number): number[][] {
    if (basins[YposNew][XposNew] != basins[YposCur][XposCur] && basins[YposNew][XposNew] < 0) {
        basins = mergeBasins(basins, basins[YposNew][XposNew], basins[YposCur][XposCur]);
    } else {
        basins[YposNew][XposNew] = basins[YposCur][XposCur];
    }
    return basins
}


function letItFlow(basins: number[][]) {
    for (let Ypos = 0; Ypos < basins.length; Ypos++) {
        for (let Xpos = 0; Xpos < basins[0].length; Xpos++) {
            if (basins[Ypos][Xpos] < 0) {
                let basinSeed = basins[Ypos][Xpos]
                if (basins[Ypos - 1][Xpos] != 9) {
                    flowOneDirection(basins, Ypos, Xpos, Ypos - 1, Xpos)
                }
                if (basins[Ypos + 1][Xpos] != 9) {
                    flowOneDirection(basins, Ypos, Xpos, Ypos + 1, Xpos)
                }
                if (basins[Ypos][Xpos - 1] != 9) {
                    flowOneDirection(basins, Ypos, Xpos, Ypos, Xpos - 1)
                }
                if (basins[Ypos][Xpos + 1] != 9) {
                    flowOneDirection(basins, Ypos, Xpos, Ypos, Xpos + 1)
                }
            }
        }
    }
    return basins
}

function createBasins(basins: number[][]): number[][] {
    let numberOfBasins = basins.reduce((accumulator, value) => accumulator.concat(value), [])
    while (numberOfBasins.filter(function (x: number) { return x > -1 && x != 9 }).length > 1) {
        basins = letItFlow(basins)
        numberOfBasins = basins.reduce((accumulator, value) => accumulator.concat(value), [])
    }
    return basins
}

function solutionPart2(basins: number[][]): number {
    let counter: any = {}
    let list = basins.reduce((accumulator, value) => accumulator.concat(value), [])
    for (const num of list) {
        counter[num] = counter[num] ? counter[num] + 1 : 1;
    }

    var result = Object.keys(counter).map(function (key) {
        return [key, counter[key]];
    });

    result = result.sort(function (first, second) {
        return second[1] - first[1];
    });

    return result.slice(1, 4).map(x => x[1]).reduce((x, y) => x * y);
}

let [basins, solutionPart1] = findBasinSeeds()

console.log(solutionPart1)

console.log(solutionPart2(createBasins(basins)))
