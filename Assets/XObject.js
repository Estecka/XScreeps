global.logObject = function(object){
    if (object == null)
        return console.log(object);
    let log = "";
    Object.keys(object).forEach(
        key => log += key+" : "+object[key]+"\n"
    );
    console.log(log);
};