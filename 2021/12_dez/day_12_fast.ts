import * as fs from 'fs';

export class Node {
    data: string;
    adjacent: Node[];
    explored: boolean;

    constructor(data: string) {
        this.data = data;
        this.adjacent = [];
        this.explored = false;
    }

    addAdjacent(node: Node): void {
        this.adjacent.push(node);
    }

    setExplored(): void {
        if (this.data != this.data.toUpperCase()) {
            this.explored = true;
        }
    }

    setUnexplored(): void {
        if (this.data != this.data.toUpperCase()) {
            this.explored = false;
        }
    }

}

class Graph {

    nodes: Map<string, Node> = new Map();
    constructor() {
    }
    addNode(data: string): Node {

        let node = this.nodes.get(data);
        if (node) return node;
        node = new Node(data);
        this.nodes.set(data, node);

        return node;
    }
    addEdge(source: string, destination: string): void {

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

function getGraph(): Graph {
    let input = loadInput();

    let graph = new Graph();

    for (let line of input) {
        graph.addEdge(line[0], line[1]);
    }

    return graph;
}
let currentPath: Node[] = []
let simplePaths: Node[][] = []
let counter = 0;
function dfs(graph: Graph, u: Node, v: Node, extra: boolean) {
    if (u.data === "start" && currentPath.length > 1) {
        return;
    }
    if (u.explored) {
        if (u === v) {
            return;
        }
        if (extra) {
            extra = false;
        } else {
            return;
        }
    }
    u.setExplored()
    currentPath.push(u);
    if (u === v) {
        let tmp = [...currentPath]
        simplePaths.push(tmp);
        u.setUnexplored()

        currentPath.pop()
        return;
    }
    for (let adjacent of u.adjacent) {
        dfs(graph, adjacent, v, extra);
    }
    currentPath.pop()
    if (extra) {
        u.setUnexplored()
    } else if (!currentPath.some(el => el.data === u.data)) {
        u.setUnexplored()
    }

}


let graph = getGraph()

dfs(graph, graph.nodes.get("start")!, graph.nodes.get("end")!, true)

console.log(simplePaths.length)
