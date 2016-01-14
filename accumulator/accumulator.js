var accumulator = {
    num: 0,

    add: function (a) {
        this.num = this.num + a;
        return this;
    },

    subtract:function (a) {
        this.num =  this.num - a;
        return this;
    },

    multiply: function (a) {
        this.num =  this.num * a;
        return this;
    },

    divide: function (a) {
        this.num =  this.num / a;
        return this;
    },

    getResult: function (){
        return this.num;
    }
}



module.exports = accumulator;
