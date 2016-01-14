/*
This module will accept the relative file path and simply return the contents if the file exists inside the webRoot
If the file does not exist, it will return errors
*/

var fs = require('fs'),
    path = require('path'),
    url = require('url');

var staticResourceService = {

    webRoot: __dirname,

    /*List of extensions served */
    allowedStaticResourceExtensions: [
        '.html',
        '.css',
        '.js',
        '.png',
        '.jpg',
        '.jpeg',
        '.ico',
        '.gif'
    ],

    isAllowedToRead: function (requestpath) {
        var ext = path.extname(requestpath);
        return this.allowedStaticResourceExtensions.indexOf(ext) != -1;
    },

    readFile: function(filepath, onComplete){
        console.log('[StaticProcessor] Reading File');

        var completePath = path.join(this.webRoot, filepath);

        if(this.isAllowedToRead(completePath)){

            if(!fs.existsSync(completePath)){
                onComplete(new Error('File does not exists'));
                return;
            }

            //Start reading the file
            var stream = fs.createReadStream(completePath, {encoding : 'utf8'});

            stream.on('error', function(){
                onComplete(new Error('Error in reading the file'));
                return;
            });

            var dataRead = '';
            stream.on('data',function(chunk){
                dataRead += chunk;
            });

            stream.on('end',function(){
                console.log('[StaticProcessor] Finished Reading File, Size = ', dataRead.length);

                onComplete(null, dataRead);
            });
        }else{
            onComplete(new Error('Not allowed to read the requested FileType.'));
            return;
        }
    },

    processRequest: function (request, response, onComplete){
        console.log('[StaticProcessor] StaticProcessor is requested to serve');
        var fileRequested = url.parse(request.url).pathname;

        var onRead = function(error, data){
            //console.log('Recieved file data ' + data);

            if(error){
                console.log('Got into Error Block');
                response.write('Server Encountered error while processing your request.\n' + error.toString());
            }

            if(data){
                console.log('Got into data block');
                response.write(data.toString());
                //response.end();
            }

            console.log('[StaticProcessor] StaticProcessor finished processing the request');

            onComplete();
        };

        this.readFile(fileRequested, onRead);
    }
}

module.exports = staticResourceService;
