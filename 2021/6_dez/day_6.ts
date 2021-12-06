import * as fs from 'fs';

function load_input(): number[] {
    let input = fs.readFileSync('input', 'utf8').split(",").map(Number)
    return input
}

function setInitalAges(input: number[]): number[] {
    let ages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let age in input) {
        ages[input[age]] += 1
    }
    return ages
}

function setup(): number[] {
    let input = load_input()
    let ages = setInitalAges(input)
    return ages
}

function runForNDays(ages: number[], days: number): number[] {
    for (let day = 0; day < days; day++) {
        let newFish = ages[0]
        for (let index = 1; index <= ages.length; index++) {
            ages[index - 1] = ages[index]
            if (index === 7) {
                ages[6] += newFish
            }
        }
        ages[8] = newFish;
    }
    return ages
}

function countFish(ages: number[]): number {
    let numberOfFish = 0;
    for (let key in ages) {
        numberOfFish += ages[key]
    }
    return numberOfFish
}

function run(days: number): number {
    let ages = setup()
    ages = runForNDays(ages, days)
    return countFish(ages)
}

console.log("Solution Part 1: " + run(80))

console.log("Solution Part 2: " + run(256))
