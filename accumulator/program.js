var accumulator = require("./accumulator");

var res = accumulator.add(5).add(10).multiply(2).getResult();
console.log(res);
