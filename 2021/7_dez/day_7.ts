import * as fs from 'fs';

function load_input(): number[] {
    let input = fs.readFileSync('input', 'utf8').split(",").map(Number)
    return input
}

function getCost(goal: number, position: number): number {
    let cost = 0;
    for (let i = 1; i <= Math.abs(goal - position); i++) {
        cost += i;
    }
    return cost
}


function getCostPar1(crabs: number[]): number {
    crabs = crabs.sort(function (a, b) {
        return a - b;
    });

    let median = crabs[(crabs.length / 2)];

    let fuelCost = 0;

    for (let index in crabs) {
        fuelCost += Math.abs(crabs[index] - median);
    }
    return fuelCost
}

function getCostPart2(crabs: number[]): number {
    crabs = crabs.sort(function (a, b) {
        return a - b;
    });

    let median = crabs[(crabs.length / 2)];

    let newCost: { [med: number]: number } = {};
    for (let search = median - 500; search < median + 500; search++) {
        let tmp = 0;
        for (let el of crabs) {
            tmp += getCost(search, el);
        }
        newCost[search] = tmp;
    }

    let lowest = 9999999999999999999999;
    let winner = 0;

    for (let el in newCost) {
        if (newCost[el] < lowest) {
            winner = newCost[el];
            lowest = newCost[el];
        }
    }
    return winner;
}


let crabs = load_input()
let fuelCost = getCostPar1(crabs)
console.log(fuelCost)


crabs = load_input()
let winner = getCostPart2(crabs)
console.log(winner)
