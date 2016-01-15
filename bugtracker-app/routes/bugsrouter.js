var express = require('express'),
    router = express.Router();

var list = [
    {id:1, name: 'Authentication error', isClosed: false},
    {id:2, name: 'Random Error', isClosed: false},
    {id:3, name : 'Please fix this bug', isClosed: false}
]

router.get('/',function(req,res,next){
    res.render('bugs/index',{bugs: list})
});

router.get('/new',function(req,res,next){
    res.render('bugs/new');
})

router.post('/new', function(req,res/next){
    var newId = list.reduce(function(result, bug){
        return result = bug.id ? ;
    });
});


module.exports = router;
