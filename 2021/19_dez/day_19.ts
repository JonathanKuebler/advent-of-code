import * as fs from 'fs';

const flips = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, -1, -1]]
const rotations = [["x", "y", "z"], ["x", "z", "y"], ["y", "x", "z"], ["y", "z", "x"], ["z", "y", "x"], ["z", "x", "y"]]

function loadInput() {
    let input = fs.readFileSync('test_input', 'utf8').split("\n\n").map(x => x.split("\n"));
    return input
}

function prepareInput(input: string[][]): number[][][] {
    let scanners = []
    for (let scanner of input) {
        scanners.push(scanner.slice(1).map(x => x.split(",").map(x => Number(x))))
    }
    return scanners
}

function rotate(scanner: any[][], rotation: string[]): number[][] {
    let rotScanner: number[][] = [];

    for (let beacon of scanner) {
        rotScanner.push([...beacon])
        for (let axis in rotation) {

            if (rotation[axis] === "x") {
                rotScanner[rotScanner.length - 1][axis] = beacon[0]
            } else if (rotation[axis] === "y") {
                rotScanner[rotScanner.length - 1][axis] = beacon[1]
            } else if (rotation[axis] === "z") {
                rotScanner[rotScanner.length - 1][axis] = beacon[2]
            }
        }
    }
    return rotScanner;
}

function flipping(scanner: number[][], flip: number[]): number[][] {
    let flipScanner: number[][] = [];

    for (let beacon of scanner) {
        flipScanner.push(beacon.map((value, index) => value * flip[index]))
    }


    return flipScanner
}

function countOverlappingBeacons(scanner1: number[][], scanner2: number[][]): [string, number] {
    let resultList: { [key: string]: number } = {};
    for (let beacon2 of scanner2) {
        for (let beacon1 of scanner1) {
            let key = beacon2.map((value, index) => beacon1[index] + value)
            resultList[key.toString()] = (resultList[key.toString()] + 1) || 1;
        }
    }
    let biggest = Object.entries(resultList).reduce((x, y) => (x[1] > y[1]) ? x : y)
    return biggest
}

function checkIfOrientationMatches(scanner1: number[][], scanner2: number[][]): [string, number] | null {
    let overlapping = countOverlappingBeacons(scanner1, scanner2)
    if (overlapping[1] >= 12) {
        return overlapping
    }
    return null
}

function findOrientationIfPossible(scanner1: number[][], scanner2: number[][]): [number[], number, string[], number[]] | null {
    for (let rotation of rotations) {
        let rotScanner = rotate(scanner2, rotation)
        for (let flip of flips) {
            let flipRotScanner = flipping(rotScanner, flip)
            let biggest = checkIfOrientationMatches(scanner1, flipRotScanner)
            if (biggest) {
                return [biggest[0].split(",").map(x => Number(x)), biggest[1], rotation, flip]
            }
        }
    }
    return null
}

let input = loadInput()
let scanners = prepareInput(input)


let transformers: any = []
for (let first = 0; first < scanners.length; first++) {
    for (let second = 0; second < scanners.length; second++) {
        if (first === second) {
            continue;
        }
        let biggest = findOrientationIfPossible(scanners[first], scanners[second])
        if (biggest) {
            transformers.push([first, second, ...biggest])
        }
    }
}
scanners = prepareInput(input)
let result: any = []
for (let elements of scanners[0]) {
    let key = elements.toString()
    result[key] = 1
}

console.log(transformers)


let left: number[] = []
for (let index = 1; index < scanners.length; index++) {
    left.push(index)
}

let finalTransform: { [key: string]: number[] } = {}
let multiplier: { [key: string]: number[] } = {}
let roti: { [key: string]: string[] } = {}

finalTransform["" + 0] = [0, 0, 0]
multiplier["" + 0] = [1, 1, 1]
roti["" + 0] = ["x", "y", "z"]

while (left.length > 1) {
    for (let element in left) {
        if (Object.keys(finalTransform).includes("" + left[element])) {
            delete left[element]
        } else {
            for (let el of transformers) {
                if (el[1] === left[element] && Object.keys(finalTransform).includes("" + el[0])) {
                    let multip = multiplier["" + el[0]]
                    let newCenter = rotate([el[2]], roti["" + el[0]])[0]
                    newCenter = multip.map((x: number, y: number) => x * newCenter[y])
                    finalTransform["" + left[element]] = finalTransform[el[0]].map((x, y) => x + newCenter[y])

                    multiplier["" + el[1]] = el[5]
                    roti["" + el[1]] = el[4]

                    break;
                }
            }
        }
        left = left.filter(x => x != undefined)
    }
}
console.log(finalTransform)

result = []
for (let elements of scanners[0]) {
    let key = elements.toString()
    result[key] = 1
}
scanners = prepareInput(input)
for (let el = 1; el < Object.keys(finalTransform).length; el++) {
    for (let element in scanners[el]) {

        let tmp = scanners[el][element]
        tmp = flipping([tmp], multiplier["" + el])[0]
        let tmptmp = rotate([tmp], roti["" + el])[0]
        let key = tmptmp.map((x, y) => finalTransform["" + el][y] + x).toString()
        result[key] = (result[key] + 1) || 1
    }
}
console.log(Object.keys(result).length)

// // result = []
// // for (let elements of scanners[0]) {
// //     let key = elements.toString()
// //     result[key] = 1
// // }
// // scanners = prepareInput(input)
// // for (let el = 1; el < Object.keys(finalTransform).length; el++) {
// //     console.log("-------------------------------------------------------------------")
// //     console.log("ELEMENT:")
// //     console.log(el)
// //     console.log(finalTransform["" + el])
// //     console.log("--------")
// //     for (let element in scanners[el]) {

// //         let tmp = scanners[el][element]
// //         tmp = flipping([tmp], mu["" + el])[0]
// //         let tmptmp = rotate([tmp], ro["" + el])[0]
// //         let key = tmptmp.map((x, y) => finalTransform["" + el][y] - x).toString()
// //         console.log(key)
// //         result[key] = (result[key] + 1) || 1
// //     }
// // }
// // console.log(Object.keys(result).length)
