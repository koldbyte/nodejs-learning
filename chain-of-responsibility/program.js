var f1 = function(next){
    console.log('Running F1');
    setTimeout(function(){
        console.log("f1 is completed ");
        runAsync(next);
    },3000)

}

var f2 = function(next){
    console.log('Running F2');
    setTimeout(function(){
        console.log("f2 is completed");
        runAsync(next);
    },3000)

}

var f3 = function(next){
    console.log('Running F3');
    setTimeout(function(){
        console.log("f3 is completed");
        runAsync(next);
    },3000)

}

var f4 = function(next){
    console.log('Running F4');
    setTimeout(function(){
        console.log("f4 is completed");
        runAsync(next);
    },3000)

}
var sequence = [f1,f2,f3,f4];

var runAsync = function(index){
    if(index < sequence.length)
        sequence[index](index+1);
}

runAsync(0);
