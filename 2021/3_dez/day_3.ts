import * as fs from 'fs';
const diaRep = fs.readFileSync('input', 'utf8').split("\n");

function getMostLeastCommon(list: Array<string>, indx: number): string[] {
    let zeros = 0;
    let ones = 0;
    for (let index in list) {
        if (list[index][indx] === "1") {
            ones += 1;
        } else {
            zeros += 1;
        }
    }
    if (zeros > ones) {
        return ["0", "1"]
    } else {
        return ["1", "0"]
    }
};

let gamma = "";
let epsilon = "";

for (let i = 0; i < diaRep[0].length; i++) {
    let mostAndLeast = getMostLeastCommon(diaRep, i);
    gamma += mostAndLeast[0];
    epsilon += mostAndLeast[1];
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

let oxygen = diaRep;
let co2 = diaRep;

for (let i = 0; i < diaRep[0].length; i++) {
    if (oxygen.length != 1) {
        oxygen = oxygen.filter(el => el[i] === getMostLeastCommon(oxygen, i)[0]);
    }
    if (co2.length != 1) {
        co2 = co2.filter(el => el[i] === getMostLeastCommon(co2, i)[1]);
    }
}

console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));
