import * as fs from 'fs';

function loadInput(): [string, string[][]] {
    let [template, tmp] = fs.readFileSync('input', 'utf8').split("\n\n")
    let input = tmp.split("\n").map(function (x) { return x.split(" -> ") });
    return [template, input];
}

function prepareInput(): [Map<string, number>, Map<string, string>] {
    let [template, input] = loadInput()

    let pairs = new Map<string, number>([])

    for (let el = 0; el < template.length - 1; el++) {
        pairs.set(template.slice(el, el + 2), 0)
    }
    for (let el = 0; el < template.length - 1; el++) {
        pairs.set(template.slice(el, el + 2), 1 + pairs.get(template.slice(el, el + 2))!)
    }

    let insertionElements = new Map<string, string>([])

    for (let el of input) {
        insertionElements.set(el[0], el[1])
    }

    return [pairs, insertionElements]

}

function runForNDays(initalPairs: Map<string, number>, insertionElements: Map<string, string>, days: number): Map<string, number> {
    let pairs: Map<string, number> = new Map<string, number>([...initalPairs])
    for (let i = 0; i < days; i++) {
        let newPairs = new Map<string, number>([])
        for (let el of insertionElements.keys()) {
            if (pairs.has(el)) {
                let newElementLeft = el[0] + insertionElements.get(el)!
                let newElementRight = insertionElements.get(el)! + el[1]
                if (newPairs.has(newElementLeft)) {
                    let tmp = newPairs.get(newElementLeft)!
                    newPairs.set(newElementLeft, tmp! + pairs.get(el)!)
                } else {
                    newPairs.set(newElementLeft, pairs.get(el)!)
                }
                if (newPairs.has(newElementRight)) {
                    let tmp = newPairs.get(newElementRight)!
                    newPairs.set(newElementRight, tmp! + pairs.get(el)!)
                } else {
                    newPairs.set(newElementRight, pairs.get(el)!)
                }
            }
        }

        pairs = newPairs
    }

    return pairs
}

function getMaxMinusMinNumberOfElements(pairs: Map<string, number>): number {
    let counter = new Map<string, number>([])
    for (let el of pairs.keys()) {
        counter.set(el[0], 0)
        counter.set(el[1], 0)
    }

    for (let el of pairs.keys()) {
        counter.set(el[0], pairs.get(el)! + counter.get(el[0])!)
        counter.set(el[1], pairs.get(el)! + counter.get(el[1])!)
    }

    let greatest = Math.max(...counter.values())
    let smallest = Math.min(...counter.values())
    return Math.ceil(greatest / 2 - smallest / 2)
}

let [pairs, insertionElements] = prepareInput()
let pairsPart1 = runForNDays(pairs, insertionElements, 10)
let pairsPart2 = runForNDays(pairs, insertionElements, 40)

console.log("Solution Part 1: " + getMaxMinusMinNumberOfElements(pairsPart1))
console.log("Solution Part 2: " + getMaxMinusMinNumberOfElements(pairsPart2))
