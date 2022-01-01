import * as fs from 'fs';
import { exit } from 'process';

const flips: number[][] = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, -1, -1]]
const rotations: string[][] = [["x", "y", "z"], ["x", "z", "y"], ["y", "x", "z"], ["y", "z", "x"], ["z", "y", "x"], ["z", "x", "y"]]

class Scanner {
    id: number;
    localBeacons: number[][];
    globalBeacons: number[][] = [];
    globalScannerPosition: number[] = [];
    globalRotation: string[] = [];
    globalFlip: number[] = [];

    constructor(id: number, localBeacons: number[][]) {
        this.id = id;
        this.localBeacons = localBeacons;
    }
}

function loadInput() {
    let input = fs.readFileSync('test_input', 'utf8').split("\n\n").map(x => x.split("\n"));
    return input
}


function prepareInput(input: string[][]): Scanner[] {
    let scanners: Scanner[] = []
    for (let scanner of input) {
        scanners.push(new Scanner(input.indexOf(scanner), scanner.slice(1).map(x => x.split(",").map(x => Number(x)))))
    }
    scanners[0].globalScannerPosition = [0, 0, 0];
    scanners[0].globalRotation = ["x", "y", "z"];
    scanners[0].globalFlip = [1, 1, 1];
    scanners[0].globalBeacons = scanners[0].localBeacons;
    return scanners
}


function rotateBeacon(beacon: any[], rotation: string[]): number[] {
    let rotScanner: any[] = [];
    rotScanner.push(...beacon)
    for (let axis in rotation) {
        if (rotation[axis] === "x") {
            rotScanner[axis] = beacon[0]
        } else if (rotation[axis] === "y") {
            rotScanner[axis] = beacon[1]
        } else if (rotation[axis] === "z") {
            rotScanner[axis] = beacon[2]
        }
    }
    return rotScanner;
}

function rotateBeacons(beacons: number[][], rotation: string[]): number[][] {
    let rotScanner: number[][] = [];

    for (let beacon of beacons) {
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

function computeBestCombination(testBeacons: number[][], referenceBeacons: number[][]): [string, number] {
    let allVectors: { [key: string]: number } = {};
    for (let testBeacon of testBeacons) {
        for (let referenceBeacon of referenceBeacons) {
            let key = testBeacon.map((value, index) => referenceBeacon[index] + value)
            allVectors[key.toString()] = (allVectors[key.toString()] + 1) || 1;
        }
    }
    let biggest = Object.entries(allVectors).reduce((x, y) => (x[1] > y[1]) ? x : y)
    return biggest
}

function testAllOrientations(scannerToBeTested: Scanner, referenceScanner: Scanner) {
    for (let flip of flips) {
        for (let rotation of rotations) {
            let testBeacons = [...scannerToBeTested.localBeacons]
            testBeacons = testBeacons.map(x => x.map((x, y) => x * flip[y]))
            testBeacons = rotateBeacons(testBeacons, rotation)
            let best = computeBestCombination([...testBeacons], [...referenceScanner.localBeacons])
            if (best[1] >= 12) {
                console.log(best)
                if (referenceScanner.globalScannerPosition.length > 0) {
                    let localVector = best[0].split(",").map(x => Number(x))
                    localVector = localVector.map((x, y) => x * referenceScanner.globalFlip[y])
                    localVector = rotateBeacon(localVector, referenceScanner.globalRotation)
                    scannerToBeTested.globalScannerPosition = referenceScanner.globalScannerPosition.map((value, index) => localVector[index] - value)
                    scannerToBeTested.globalFlip = flip.map((x, y) => x * referenceScanner.globalFlip[y])
                    scannerToBeTested.globalRotation = rotateBeacon(rotation, referenceScanner.globalRotation).map(x => "" + x)
                    return true;
                }
            }
        }
    }
    return false;
}

function findNextGlobalScannerposition(scannerToBeTested: Scanner, allScanners: Scanner[]) {
    for (let scanner of allScanners) {
        if (scanner != scannerToBeTested) {
            if (testAllOrientations(scannerToBeTested, scanner)) {
                return true;
            }
        }
    }
    return false;
}

function findAllGlobalScannerPositions(scanners: Scanner[]) {
    while (!scanners.every((x) => x.globalScannerPosition.length != 0)) {
        for (let scanner of scanners) {
            if (scanner.globalScannerPosition.length === 0) {
                if (findNextGlobalScannerposition(scanner, scanners)) {
                    break;
                }
            }
        }
    }
}

let input = loadInput()

let scanners = prepareInput(input)
findAllGlobalScannerPositions(scanners)

console.log(scanners)
