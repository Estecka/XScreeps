Object.defineProperty(Array.prototype, "remove", {
    configurable: true,
    enumerable: false,
    value: function(value){
        this.splice(this.indexOf(value), 1)
    }
})

_.findBy = function(array, predicate){
    let smallest = NaN;
    let value =  undefined;
    for(let i in array){
        let r = predicate(array[i]);
        if (r === true)
            return array[i];
        // console.log(r+' '+!isNaN(r));
        if (r!==false && !(smallest<r)){
            // console.log(boop)
            smallest = r;
            value = array[i];
        }
    }
    return value;
}