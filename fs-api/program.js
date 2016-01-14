/*Sync*/

function addSync(x,y){
    console.log("[Provider] processing " , x , " and ", y);
    var result = x + y;
    console.log("[Provider] Returning result");
    return result;
}

function addSyncClient(x,y){
    console.log("[Consumer] Triggering add");
    var result = addSync(x,y);
    console.log("[Consumer] result = ", result);
}

/*Async*/

function add(x,y, onResult){
    console.log("[Provider] processing", x, " and ", y);
    setTImeout(function(){
        if(!x || !y) return onResult(new Error("Invalid Arguments"));
        //if(!x || !y) throw new Error("Invalid Argument");
        var result = x+y;
        console.log("[Provider] returning result");
        if(typeof onResult === 'function')
            onResult(result);
    },3000)
}

function addClient(x,y{
    console.log("[Consumer] triggering add");
    try{
        add(x,y,function(err,result){
            console.log("[Consumer] result = ", result);
        });
    }catch(e){
        console.log("Sorry something went wrong!");
    }
}

function addClient2(x,y{
    console.log("[Consumer] triggering add");

        add(x,y,function(err,result){
            if(err) {
                console.log("Sorry something went wrong!");
                return;
            }
            console.log("[Consumer] result = ", result);
        });
}

module.exports.addSyncClient = addSyncClient;
module.exports.addClient = addClient2;
