/**
 * Taken from here: https://stackoverflow.com/questions/5842654/how-to-get-an-objects-methods
 */
function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m);
        }
    }
    return res;
}