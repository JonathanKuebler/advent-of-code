import * as fs from 'fs';

let smallest = 0;

function load_input(): number[][] {
    let tmp = fs.readFileSync('input', 'utf8').split("\n")
    let input = tmp.map(x => x.split("").map(Number))
    return input
}

function makeBasin(map: number[][], y: number, x: number, setNumber: number): number[][] {
    map[y][x] = setNumber
    return map
}


function checkAdjacent() {

    let input = load_input()
    let basins = input
    let lowest = 0;
    let smallest = -1;

    for (let Ypos = 0; Ypos < input.length; Ypos++) {
        for (let Xpos = 0; Xpos < input[0].length; Xpos++) {
            let current = input[Ypos][Xpos]
            if (Ypos === 0) {
                if (Xpos === 0) {
                    if (current < input[Ypos][Xpos + 1] && current < input[Ypos + 1][Xpos]) {
                        basins = makeBasin(basins, Ypos, Xpos, smallest);
                        smallest--
                        lowest += current + 1;
                    }
                } else if (Xpos === input[0].length - 1) {
                    if (current < input[Ypos][Xpos - 1] && current < input[Ypos + 1][Xpos]) {
                        basins = makeBasin(basins, Ypos, Xpos, smallest);
                        smallest--
                        lowest += current + 1;
                    }
                } else if (current < input[Ypos][Xpos + 1] && current < input[Ypos + 1][Xpos] && current < input[Ypos][Xpos - 1]) {
                    basins = makeBasin(basins, Ypos, Xpos, smallest);
                    smallest--
                    lowest += current + 1;
                }
            } else if (Ypos === input.length - 1) {
                if (Xpos === 0) {
                    if (current < input[Ypos][Xpos + 1] && current < input[Ypos - 1][Xpos]) {
                        basins = makeBasin(basins, Ypos, Xpos, smallest);
                        smallest--
                        lowest += current + 1;
                    }
                } else if (Xpos === input[0].length - 1) {
                    if (current < input[Ypos][Xpos - 1] && current < input[Ypos - 1][Xpos]) {
                        basins = makeBasin(basins, Ypos, Xpos, smallest);
                        smallest--
                        lowest += current + 1;
                    }
                } else if (current < input[Ypos][Xpos + 1] && current < input[Ypos - 1][Xpos] && current < input[Ypos][Xpos - 1]) {
                    basins = makeBasin(basins, Ypos, Xpos, smallest);
                    smallest--
                    lowest += current + 1;
                }
            } else {
                if (Xpos === 0) {
                    if (current < input[Ypos][Xpos + 1] && current < input[Ypos - 1][Xpos] && current < input[Ypos + 1][Xpos]) {
                        basins = makeBasin(basins, Ypos, Xpos, smallest);
                        smallest--
                        lowest += current + 1;
                    }
                } else if (Xpos === input[0].length - 1) {
                    if (current < input[Ypos][Xpos - 1] && current < input[Ypos - 1][Xpos] && current < input[Ypos + 1][Xpos]) {
                        basins = makeBasin(basins, Ypos, Xpos, smallest);
                        smallest--
                        lowest += current + 1;
                    }
                } else if (current < input[Ypos][Xpos + 1] && current < input[Ypos - 1][Xpos] && current < input[Ypos][Xpos - 1] && current < input[Ypos + 1][Xpos]) {
                    basins = makeBasin(basins, Ypos, Xpos, smallest);
                    smallest--
                    lowest += current + 1;
                }
            }
        }
    }

    return basins;
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

function checkForMerge(basins: number[][], YposCur: number, XposCur: number, YposNew: number, XposNew: number): number[][] {
    if (basins[YposNew][XposNew] != basins[YposCur][XposCur] && basins[YposNew][XposNew] < 0) {
        basins = mergeBasins(basins, basins[YposNew][XposNew], basins[YposCur][XposCur])
    }
    return basins
}


let basins = checkAdjacent()
function createBasins(basins: number[][]) {
    for (let Ypos = 0; Ypos < basins.length; Ypos++) {
        for (let Xpos = 0; Xpos < basins[0].length; Xpos++) {
            if (basins[Ypos][Xpos] < 0) {
                let value = basins[Ypos][Xpos]
                if (Ypos === 0) {
                    if (Xpos === 0) {
                        if (9 != basins[Ypos][Xpos + 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos + 1)
                            basins = makeBasin(basins, Ypos, Xpos + 1, value);
                        }
                        if (9 != basins[Ypos + 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos + 1, Xpos)
                            basins = makeBasin(basins, Ypos + 1, Xpos, value);
                        }
                    } else if (Xpos === basins[0].length - 1) {
                        if (9 != basins[Ypos][Xpos - 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos - 1)
                            basins = makeBasin(basins, Ypos, Xpos - 1, value);
                        }
                        if (9 != basins[Ypos + 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos + 1, Xpos)
                            basins = makeBasin(basins, Ypos + 1, Xpos, value);
                        }
                    } else {
                        if (9 != basins[Ypos][Xpos + 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos + 1)
                            basins = makeBasin(basins, Ypos, Xpos + 1, value)
                        }
                        if (9 != basins[Ypos + 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos + 1, Xpos)
                            basins = makeBasin(basins, Ypos + 1, Xpos, value)
                        }
                        if (9 != basins[Ypos][Xpos - 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos - 1)
                            basins = makeBasin(basins, Ypos, Xpos - 1, value);
                        }
                    }
                } else if (Ypos === basins.length - 1) {
                    if (Xpos === 0) {
                        if (9 != basins[Ypos][Xpos + 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos + 1)
                            basins = makeBasin(basins, Ypos, Xpos + 1, value);
                        }
                        if (9 != basins[Ypos - 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos - 1, Xpos + 1)
                            basins = makeBasin(basins, Ypos - 1, Xpos, value);
                        }
                    } else if (Xpos === basins[0].length - 1) {
                        if (9 != basins[Ypos][Xpos - 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos - 1)
                            basins = makeBasin(basins, Ypos, Xpos - 1, value);
                        }
                        if (9 != basins[Ypos - 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos - 1, Xpos)
                            basins = makeBasin(basins, Ypos - 1, Xpos, value);
                        }
                    } else {
                        if (9 != basins[Ypos][Xpos + 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos + 1)
                            basins = makeBasin(basins, Ypos, Xpos + 1, value)
                        }
                        if (9 != basins[Ypos - 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos - 1, Xpos)
                            basins = makeBasin(basins, Ypos - 1, Xpos, value)
                        }
                        if (9 != basins[Ypos][Xpos - 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos - 1)
                            basins = makeBasin(basins, Ypos, Xpos - 1, value);
                        }
                    }
                } else {
                    if (Xpos === 0) {
                        if (9 != basins[Ypos][Xpos + 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos + 1)
                            basins = makeBasin(basins, Ypos, Xpos + 1, value)
                        }
                        if (9 != basins[Ypos - 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos - 1, Xpos)
                            basins = makeBasin(basins, Ypos - 1, Xpos, value)
                        }
                        if (9 != basins[Ypos + 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos + 1, Xpos)
                            basins = makeBasin(basins, Ypos + 1, Xpos, value);
                        }
                    } else if (Xpos === basins[0].length - 1) {
                        if (9 != basins[Ypos][Xpos - 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos - 1)
                            basins = makeBasin(basins, Ypos, Xpos - 1, value)
                        }
                        if (9 != basins[Ypos - 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos - 1, Xpos)
                            basins = makeBasin(basins, Ypos - 1, Xpos, value)
                        }
                        if (9 != basins[Ypos + 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos + 1, Xpos)
                            basins = makeBasin(basins, Ypos + 1, Xpos, value);
                        }
                    } else {
                        if (9 != basins[Ypos][Xpos + 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos + 1)
                            basins = makeBasin(basins, Ypos, Xpos + 1, value)
                        }
                        if (9 != basins[Ypos][Xpos - 1]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos, Xpos - 1)
                            basins = makeBasin(basins, Ypos, Xpos - 1, value)
                        }
                        if (9 != basins[Ypos - 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos - 1, Xpos)
                            basins = makeBasin(basins, Ypos - 1, Xpos, value);
                        }
                        if (9 != basins[Ypos + 1][Xpos]) {
                            checkForMerge(basins, Ypos, Xpos, Ypos + 1, Xpos)
                            basins = makeBasin(basins, Ypos + 1, Xpos, value);
                        }
                    }
                }
            }
        }
    }
    return basins
}

for (let i = 0; i < 10; i++) {
    basins = createBasins(basins)
}
let lst = basins.reduce((accumulator, value) => accumulator.concat(value), [])
let set = new Set(lst)

let counter: any = {}

for (let el of set) {
    for (let y = 0; y < basins.length; y++) {
        for (let x = 0; x < basins[0].length; x++) {
            if (basins[y][x] === el && basins[y][x] != 9) {
                if (counter[el]) {
                    counter[el] += 1
                } else {
                    counter[el] = 1
                }
            }
        }
    }
}

var items = Object.keys(counter).map(function (key) {
    return [key, counter[key]];
});

items = items.sort(function (first: number[], second: number[]) {
    return second[1] - first[1];
});
items = items.slice(0, 3)
let result = 1;
for (let key of items) {
    result = result * Number(key[1])
}
console.log(result)
