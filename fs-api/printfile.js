var fs = require('fs'),
    filename = 'sample.txt';

fs.readFile(filename,{encoding: 'utf8'}, function(error,data){
    console.log(data);
});


console.log("------EOF-----")
