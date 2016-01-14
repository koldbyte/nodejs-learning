/*
This module is responsible for extracting out the
    1) Parameters in a GET request
    2) Parameters in the body of the POST Request
*/
var querystring = require('querystring');
var url = require('url');

var requestProcessor = {
    getQueryData: function(request){
        console.log('[RequestProcessor] Started Processing for query data');

        if(request.method === 'GET'){
            var queryData = querystring.parse(url.parse(request.url).query);
            return queryData;
        }else if(request.method === 'POST'){
            var dataAsString = '';

            req.on('data', function (chunk) {
                dataAsString += chunk;
            });

            req.on('end', function () {
                var queryData = querystring.parse(dataAsString);
                return queryData;
            });
        }

       console.log('[RequestProcessor] Finished Processing for query data');
    }

}

module.exports = requestProcessor;
