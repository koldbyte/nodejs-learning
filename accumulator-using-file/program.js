var acc = require('./accumulator'),
    fs = require('fs');;

var stream = fs.readFile('sample.txt', {
    encoding: 'utf8'
}, function (err, data) {
    var lines = data.split('\n');

    lines.map(function (line) {
        if (line.length > 0) {
            var query = line.split(',');
            if (query[0] == 'add') {
                acc.add(parseInt(query[1]));
            } else if (query[0] == 'subtract') {
                acc.subtract(parseInt(query[1]));
            } else if (query[0] == 'multiply') {
                acc.multiply(parseInt(query[1]));
            } else if (query[0] == 'divide') {
                acc.divide(parseInt(query[1]));
            }

            console.log("Doing operation => ", line, " , result is ", acc.getResult());
        }
    });
});
