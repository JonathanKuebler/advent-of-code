import { SlowBuffer } from 'buffer';
import * as fs from 'fs';

interface possible { "a": string, "b": string, "c": string, "d": string, "e": string, "f": string, "g": string }

function load_input() {
    let input = fs.readFileSync('input', 'utf8').split("\n")
    let solution = input.map(x => x.split(" | "))
    return solution
}

function getIntersect(a: string, b: string) {
    let res = ""
    for (let str of a.split("")) {
        if (b.includes(str)) {
            res += str;
        }
    }
    return res
}

function getANotinB(a: string, b: string) {
    let res = ""
    for (let str of a.split("")) {
        if (!b.includes(str)) {
            res += str;
        }
    }
    return res;
}

function getSimpleNumbers(): number {
    let input = load_input();
    let counter = 0;
    for (let inpt of input) {
        for (let sol of inpt[1].split(" ")) {
            if (sol.length == 2 || sol.length == 4 || sol.length == 3 || sol.length == 7)
                counter++;
        }
    }
    return counter
}

function getSumOfOutputs(): number {
    let input = load_input();

    let sum = 0;
    let counter = ""

    for (let inpt of input) {
        let sol = inpt[1].split(" ");
        inpt = inpt[0].split(" ").sort((a, b) => a.length - b.length);
        let possible: any = { "a": "", "b": "", "c": "", "d": "", "e": "", "f": "", "g": "" }
        for (let nbrs of inpt) {
            if (nbrs.length === 2) {
                possible["c"] += nbrs
                possible["f"] += nbrs
            } else if (nbrs.length === 3) {
                possible["c"] = getIntersect(possible["c"], nbrs)
                possible["f"] = getIntersect(possible["f"], nbrs)
                possible["a"] = getANotinB(getANotinB(nbrs, possible["c"]), possible["f"])

            } else if (nbrs.length === 4) {
                possible["b"] = getANotinB(getANotinB(nbrs, possible["c"]), possible["f"])
                possible["c"] = getIntersect(possible["c"], nbrs)
                possible["d"] = getANotinB(getANotinB(nbrs, possible["c"]), possible["f"])
                possible["f"] = getIntersect(possible["f"], nbrs)
            } else if (nbrs.length === 7) {
                possible["e"] = getANotinB(getANotinB(getANotinB(getANotinB(getANotinB(nbrs, possible["c"]), possible["f"]), possible["a"]), possible["b"]), possible["d"])
                possible["g"] = getIntersect(possible["g"], getANotinB(getANotinB(getANotinB(getANotinB(getANotinB(nbrs, possible["c"]), possible["f"]), possible["a"]), possible["b"]), possible["d"]))
            } else if (nbrs.length != 6) {
                possible["d"] = getIntersect(possible["d"], nbrs)
                if (possible["g"].length != 0) {
                    possible["g"] = getIntersect(getANotinB(nbrs, possible["a"]), possible["g"])
                } else {
                    possible["g"] = getANotinB(nbrs, possible["a"])
                }

            } else {
                possible["f"] = getIntersect(possible["f"], nbrs)
                if (possible["g"].length != 0) {
                    possible["g"] = getIntersect(getANotinB(nbrs, possible["a"]), possible["g"])
                } else {
                    possible["g"] = getANotinB(nbrs, possible["a"])
                }
            }
        }

        let keys = ["a", "b", "c", "d", "e", "f", "g"]
        for (let key of keys) {
            if (possible[key].length === 1) {
                for (let other of keys) {
                    if (other != key) {
                        possible[other] = getANotinB(possible[other], possible[key])
                    }
                }
            }
        }
        for (let so of sol) {
            if (so.length === 2) {
                counter += 1
            } else if (so.length === 3) {
                counter += 7
            } else if (so.length === 4) {
                counter += 4
            } else if (so.length === 7) {
                counter += 8
            } else if (!so.includes(possible["f"]) && !so.includes(possible["b"])) {
                counter += 2
            } else if (!so.includes(possible["b"]) && !so.includes(possible["e"])) {
                counter += 3
            } else if (!so.includes(possible["c"]) && !so.includes(possible["e"])) {
                counter += 5
            } else if (so.includes(possible["e"]) && !so.includes(possible["c"])) {
                counter += 6
            } else if (so.includes(possible["e"])) {
                counter += 0
            } else {
                counter += 9
            }
        }
        sum += Number(counter)
        counter = ""
    }
    return sum;
}

console.log(getSimpleNumbers())

console.log(getSumOfOutputs())
