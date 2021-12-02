import * as fs from 'fs';
const lst = fs.readFileSync('input', 'utf8').split("\n").map(x => x.split(" "));

let forward = 0
let down = 0
let aim = 0

function change_position_1() {
    forward = 0
    down = 0
    aim = 0
    lst.filter(function (el) {
        if (el[0] == "forward") {
            forward += Number(el[1])
        }
        else if (el[0] == "down") {
            down += Number(el[1])
        }
        else if (el[0] == "up") {
            down -= Number(el[1])
        }
    })
}

function change_position_2() {
    forward = 0
    down = 0
    aim = 0
    lst.filter(function (el) {
        if (el[0] == "forward") {
            forward += Number(el[1])
            down += (aim * Number(el[1]))
        }
        else if (el[0] == "down") {
            aim += Number(el[1])
        }
        else if (el[0] == "up") {
            aim -= Number(el[1])
        }
    })
}

change_position_1()

console.log(down * forward)

change_position_2()

console.log(down * forward)
