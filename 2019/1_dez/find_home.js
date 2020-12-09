var fs = require("fs");

var input = fs.readFileSync(__dirname + '/input');

var array = input.toString().trim().split("\n");
var consumed_fuel = array.map(element => { return (Math.floor(element / 3) - 2) });
var sum_of_all = consumed_fuel.reduce((pv, cv) => pv + cv);

var max_sum = sum_of_all;

console.log(max_sum);

while (sum_of_all > 0) {
    consumed_fuel = consumed_fuel.map(element => { return (Math.floor(element / 3) - 2) });

    for (var i = consumed_fuel.length - 1; i >= 0; i--) {
        if (consumed_fuel[i] < 0) {
            consumed_fuel[i] = 0;
        }
    }
    sum_of_all = consumed_fuel.reduce((pv, cv) => pv + cv);
    max_sum += sum_of_all;
}


console.log(max_sum);
