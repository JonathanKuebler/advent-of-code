import * as fs from 'fs';
const lst = fs.readFileSync('input', 'utf8').slice(1, -1).split("\n").map(item => Number(item));

let greater = 0;

for (let i = 1; i < lst.length; i++) {
    if (lst[i] < lst[i + 1]) {
        greater++;
    }
}

console.log(greater)

let greater_sliding = 0;

for (let i = 0; i < lst.length - 2; i++) {
    if ((lst[i] + lst[i + 1] + lst[i + 2]) < (lst[i + 1] + lst[i + 2] + lst[i + 3])) {
        greater_sliding++;
    }
}

console.log(greater_sliding)
