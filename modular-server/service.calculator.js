/*
This module is responsible for calculating the result
just a dumb calculator
*/

var calculator = {

    add: function (a, b) {
        return a + b;
    },

    subtract:function (a, b) {
        return a - b;
    },

    multiply: function (a, b) {
        return a * b;
    },

    divide: function (a, b) {
        return a / b;
    },

    processRequest: function(request, response, onComplete){
        console.log('[Calculator] Calculator is called for processing the request');

        var requestProcessor = require('./service.requestProcessor.js');
        var queryData = requestProcessor.getQueryData(request);

        var op = queryData.op;
        var a = parseInt(queryData.a);
        var b = parseInt(queryData.b);

        if(typeof this[op] === 'function'){
            var result = this[op](a,b);

            console.log('[Calculator] Finished calculating. Result is ' + result);

            response.write(result.toString());
        }else{
            response.write('undefined');
        }
        onComplete();
    },
}

module.exports = calculator;
