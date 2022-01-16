'use strict';
const patterns = require ('../patterns');
const XRegExp = require ('xregexp');

let matchPattern = (str , cb) => {

    let getResult = patterns.find(item => {
        if(XRegExp.test(str, XRegExp(item.pattern, "i"))) {
            return item ;
          }
    });

    let getExist = patterns.find(item => {
        if(XRegExp.test(str, XRegExp(item.pattern, "i"))) {
            return true ;
          }
    });

    if(getExist) {
        var item = getResult;
        return cb({
            intent : getResult.intent,
            entities : createEntities(str, item.pattern)
        });
    }
    else{
        return cb({
            intent : "default"
        });
    }    
}

let createEntities = (str, pattern) => {
    return XRegExp.exec(str, XRegExp(pattern, "i"));
}
    

module.exports = matchPattern;
