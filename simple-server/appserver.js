var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring');

var staticResourceExtns = [
    '.html',
    '.css'
];

function isStatic(path) {
    var ext = path.extname(path);
    return staticResourceExtns.indexOf(ext) != -1;
}

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);

    console.log("Requested -> ",  urlObj.pathname);

    if (isStatic(urlObj.pathname)) {
        console.log('Serving Static Request');
        var resourcename = path.join(__dirname, urlObj.pathname);

        if (!fs.existsSync(resourcename)) {
            res.statusCode = 404;
            res.end();
            return;
        }

        var stream = fs.createReadStream(resourcename);
        stream.on('data', function (contents) {
            res.write(contents);
        });

        stream.on('end', function () {
            res.end();
        });
        console.log('Finished Serving Static Request');
    } else {
        console.log('Serving Calculator');

        if (req.method === 'GET') {
            var queryData = querystring.parse(urlObj.query);

            console.log('[GET]Query is', queryData);

            var op = queryData.operation;
            var num1 = parseInt(queryData.num1);
            var num2 = parseInt(queryData.num2);

            console.log("[GET]Started Calculator ->", op, ' , ', num1, ', ', num2);

            var calculator = require('./calculator');
            var result;

            result = calculator[op](num1, num2);
            console.log('[GET]Result is ', result);

            res.write('Your result is ' + result.toString());
            res.end();
        } else if (req.method === 'POST') {
            var dataAsString = '';

            req.on('data', function (chunk) {
                dataAsString += chunk;
            });

            req.on('end', function () {
                var queryData = querystring.parse(dataAsString);

                var op = queryData.operation;
                var num1 = parseInt(queryData.num1);
                var num2 = parseInt(queryData.num2);

                console.log("[POST]Started Calculator ->", op, ' , ', num1, ', ', num2);

                var calculator = require('./calculator');
                var result;

                result = calculator[op](num1, num2);

                console.log('[POST]Result is ', result);

                res.write('Your result is ' + result.toString());
                res.end();

                console.log('Finished Serving Calculator');
            })

        }

    }
});

server.listen(9999);
