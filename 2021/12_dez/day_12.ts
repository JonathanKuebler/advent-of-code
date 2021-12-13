import * as fs from 'fs';

export class Node<T> {
    data: T;
    adjacent: Node<T>[];

    constructor(data: T) {
        this.data = data;
        this.adjacent = [];
    }

    addAdjacent(node: Node<T>): void {
        this.adjacent.push(node);
    }

}

class Graph<T> {

    nodes: Map<T, Node<T>> = new Map();
    constructor() {
    }
    addNode(data: T): Node<T> {

        let node = this.nodes.get(data);
        if (node) return node;
        node = new Node(data);
        this.nodes.set(data, node);

        return node;
    }
    addEdge(source: T, destination: T): void {

        const sourceNode = this.addNode(source);
        const destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);
        destinationNode.addAdjacent(sourceNode);
    }
}

function loadInput(): string[][] {
    let input = fs.readFileSync('input', 'utf8').split("\n").map(function (x) { return x.split("-") });
    return input;
}

function getGraph(): Graph<string> {
    let input = loadInput();

    let graph = new Graph<string>();

    for (let line of input) {
        graph.addEdge(line[0], line[1]);
    }

    return graph;
}

function addIfNotAlreadyThere(array1: Node<string>[][], array2: Node<string>[]): Node<string>[][] {

    let included = false;

    let newArray: Node<string>[][] = array1;

    for (let nodes of array1) {
        if (nodes === array2) {
            included = true;
        }
    }

    if (!included) {
        newArray.push(array2)
    }

    return newArray;

}

function deepMerge(array1: Node<string>[][], array2: Node<string>[][]): Node<string>[][] {

    let newArray: Node<string>[][] = array1;

    for (let nodes2 of array2) {
        let included = false;
        for (let nodes1 of array1) {
            if (nodes2 === nodes1) {
                included = true;
            }

        }
        if (!included) {
            newArray.push(nodes2)
        }
    }

    return newArray

}

function pathWasAlreadyTaken(possiblePaths: Node<string>[][], currentPath: Node<string>[]) {
    let alreadyGone = false;
    for (let path of possiblePaths) {
        for (let i = 0; i < path.length; i++) {
            if (path.slice(0, path.length - i) === currentPath) {
                alreadyGone = true;
            }
        }
    }
    return alreadyGone;
}

function getAllPaths(graph: Graph<string>, possiblePaths: Node<string>[][], currentPath: Node<string>[], visitedTwice: boolean): Node<string>[][] {
    let recentElement: Node<string> = (graph.nodes.get(currentPath[currentPath.length - 1].data))!;

    if (recentElement.data === "start" && currentPath.length > 2) {
        return possiblePaths
    }

    if (recentElement.data === "end") {
        return addIfNotAlreadyThere(possiblePaths, currentPath);
    }

    if (pathWasAlreadyTaken(possiblePaths, currentPath)) {
        return possiblePaths;
    }

    for (let node of recentElement.adjacent) {
        if (!currentPath.some(element => element.data === node.data) || node.data === node.data.toUpperCase()) {
            possiblePaths = deepMerge(possiblePaths, getAllPaths(graph, possiblePaths, currentPath.concat(node), visitedTwice));
        } else if (!visitedTwice) {
            possiblePaths = deepMerge(possiblePaths, getAllPaths(graph, possiblePaths, currentPath.concat(node), true));
        }
    }

    return possiblePaths;
}


let graph = getGraph()

let possiblePaths: Node<string>[][] = [];

console.log(getAllPaths(graph, possiblePaths, [graph.nodes.get("start")!], false).length)
