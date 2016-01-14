 #Modular server

The simple server is enhanced and modularized for better organization of code.

#Components
>Main server: Contains the main server listening on port 9999 
>Router: Delegate request processing to a 'service' based on the url of the request 
>Service.fs: 'service' to serve static files
>Service.calculator: 'service' to provide basic calculations
>Service.requestProcessor: Utility module to extract query string from POST and GET requests

#Execute

http://localhost:9999/hello.html