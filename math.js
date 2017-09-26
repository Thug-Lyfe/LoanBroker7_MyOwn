var arr1 = [1,2,3,4,5,6,7,8,9,10];
var arr2 = [1,2,3,4,5,7,6];
var arr3 = [1,2,3,4,5];
var arr4 = [1,2,3,4,5,6,7];
var arr5 = [11,12];
var res = 0;

var aweMath = function(arr1,arr2){

    var bool = true;
    var small = arr1;
    var big = arr2;
    var msg = "array 1 is a subset";
    if(arr1.length > arr2.length){
        var msg = "array 2 is a subset";
        small = arr2;
        big = arr1;
    }

    for (var index = 0; index <= small.length; index++) {
        var i = big.indexOf(small[index]) 
        if(i == -1){
        bool = false;            
        }    
        
    }
    if(bool && small.length == big.length) return "0 they are equally big";
    if(bool ) return "1 and "+ msg;
    return "-2 they are not related"
}

console.log(aweMath(arr4,arr2));
console.log(aweMath(arr4,arr1));
console.log(aweMath(arr5,arr1));
