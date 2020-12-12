var fs = require("fs");

var input = fs.readFileSync(__dirname + '/input');

var array = input.toString().trim().split(",").map(element => parseInt(element));

function pos_0(array) {


    for (var i = 0; i < array.length; i += 4) {
        if (array[i] == 1) {
            array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]];
        } else if (array[i] == 2) {
            array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]];
        } else if (array[i] == 99) {
            break;
        }
    }
}

array[1] = 12
array[2] = 2
pos_0(array)

console.log(array[0])

noun = 0
verb = 0
for (var i = 0; i < 100; i += 1) {
    for (var j = 0; j < 100; j += 1) {
        array = input.toString().trim().split(",").map(element => parseInt(element));
        array[1] = i
        array[2] = j

        pos_0(array)
        console.log(i)
        if (array[0] == 19690720) {
            console.log(array[0])
            noun = i
            verb = j
            break
        }

    }
    if (array[0] == 19690720) {
        break
    }

}
console.log(verb + noun * 100)
