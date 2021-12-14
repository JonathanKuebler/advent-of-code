import * as fs from 'fs';

const POINT = -1;

function loadInput(): [number[][], [string, number][]] {
    let [input, folds] = fs.readFileSync('input', 'utf8').split("\n\n").map(x => x.split("\n"));
    let inputs = input.map(x => x.split(",").map(x => Number(x)))
    let foldings = folds.map(x => x.split(" ")[2]).map(x => x.split("=")).map(x => [x[0], Number(x[1])]) as [string, number][];
    return [inputs, foldings];
}

function createArray(input: number[][]): number[][] {
    let xMax = 0;
    let yMax = 0;

    for (let point of input) {
        xMax = Math.max(xMax, point[0])
        yMax = Math.max(yMax, point[1])
    }

    let line = Array(xMax + 1).fill(0)

    let newArray: number[][] = []

    for (let y = 0; y < yMax + 1; y++) {
        newArray.push([...line])
    }

    return newArray
}

function setInitalPoints(graph: number[][], points: number[][]) {
    for (let point of points) {
        graph[point[1]][point[0]] = 1;
    }
    return graph
}

function foldOnYLine(graph: number[][], yAxis: number): number[][] {
    let newArray: number[][] = []

    let top = graph.slice(0, yAxis)!
    let bottom = graph.slice(yAxis + 1)!

    for (let index = 0; index < yAxis; index++) {
        newArray[index] = top[index].map(function (element, i) {
            return Math.max(element, bottom[bottom.length - index - 1][i]);
        })
    }
    return newArray
}

function foldOnXLine(graph: number[][], xAxis: number): number[][] {
    let newArray: number[][] = []
    for (let line in graph) {
        let left = graph[line].slice(0, xAxis)!
        let right = graph[line].slice(xAxis + 1)!
        newArray[line] = left.map(function (element, i) {
            return Math.max(element, right[right.length - i - 1]);
        })
    }
    return newArray
}

function letsFold(graph: number[][], folds: any): number[][] {

    for (let fold of folds) {
        if (fold[0] === "x") {
            graph = foldOnXLine(graph, fold[1])
        } else {
            graph = foldOnYLine(graph, fold[1])
        }
    }
    return graph
}

function setup(): [number[][], any] {

    let [input, folds] = loadInput()
    let graph = createArray(input)

    setInitalPoints(graph, input)

    return [graph, folds]
}

function countPoints(graph: number[][]): number {
    let counter = 0;

    for (let line of graph) {
        counter += line.reduce((x, y) => x + y)
    }
    return counter
}

function runPart1(): number {
    let [graph, folds] = setup();

    graph = letsFold(graph, folds)

    console.log(graph)

    let stringArray: string[] = []

    for (let line of graph) {
        stringArray.push("" + [...line])
    }

    console.log(stringArray)

    return countPoints(graph)
}

function runPart2() {

}



runPart1()
runPart2()
