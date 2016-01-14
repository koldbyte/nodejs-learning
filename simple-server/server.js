var http = require('http'),
    fs = require('fs'),
    path = require('path');

var server = http.createServer(function(req,res){
   //var resourcename = req.url;
   var resourcename = path.join(__dirname,req.url);

    if(!fs.existsSync(resourcename)){
        res.statusCode = 404;
        res.end();
        return;
    }

    var stream = fs.createReadStream(resourcename);
    stream.on('data', function(contents){
       res.write(contents);
    });

    stream.on('end',function(){
        res.end();
    });
});

server.listen(9999);
