/*
Main Module responsible for recieving and orchestrating requests
*/

var http = require('http');
var router = require('./service.router.js');

var requestNumber = 0;
var server = http.createServer(function(request,response){
    console.log('[Server] Recieved a request, Request #', requestNumber);

    var onComplete = function(){
        response.end();

        console.log('[Server] Finished processing request, Request #', requestNumber);

        requestNumber++;
    };

    router.route(request, response, onComplete);
});

server.listen(9999);
console.log('Server Started');
