/**
 * Based on this code: https://stackoverflow.com/questions/4343746/is-there-a-data-structure-like-the-java-set-in-javascript
 * 
 * Changed the name of functions 'contains' and 'remove' to the names used in ECMAScript 6 ('has' and 'delete').
 * Also, tweaked the functionality of 'add' and 'delete' to behave similarly to ECMAScript 6 Set.
 */

function StringSet() {
    var setObj = {}, val = {};

    this.add = function(str) {
        setObj[str] = val;
		return str;
    };

    this.has = function(str) {
        return setObj[str] === val;
    };

    this.delete = function(str) {
		var hasValue = this.has(str);
        delete setObj[str];
		return hasValue;
    };

    this.values = function() {
        var values = [];
        for (var i in setObj) {
            if (setObj[i] === val) {
                values.push(i);
            }
        }
        return values;
    };
}