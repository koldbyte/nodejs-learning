/*
This module will route the request to specific components which should be called to parse the specific request
*/
//requireds here
var url = require('url');

//Initialise the processors available here
var calculator = require('./service.calculator.js');
var staticProcessor = require('./service.fs.js');

//Define the Routing list
var routeList = new Array();
routeList['\/calculator'] = calculator;
routeList['(.+)'] = staticProcessor;

var router = {

    route: function(request, response, onComplete){
        console.log('[Router] Router is processing the request');

        var requestedUrl = request.url;
        var urlObj = url.parse(requestedUrl);

        var matchWith = urlObj.pathname;

        console.log('[router] Pathname is ' + matchWith);

        var matchFound = false;
        for(var route in routeList){
            //console.log('[Router] Trying to match');
            if(routeList.hasOwnProperty(route)){
                if(matchWith.match(route) != null){
                    //Found a match within the router
                    matchFound = true;

                    console.log('[Router] A router matched with provided request');

                    routeList[route].processRequest(request, response, onComplete);
                    //response.end();
                    return;
                }
            }
        }

        //TODO
        if(!matchFound){
            //send to a default router
            response.write('Error! No suitable router found for your request');
        }

        onComplete();

        console.log('[Router] Finished Routing the request');
    }
}

module.exports = router;
