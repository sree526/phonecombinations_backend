var express = require('express');
var router = express.Router();
const arr = [ "0", "1", "abc", "def", "ghi",
    "jkl", "mno", "pqrs", "tuv", "wxyz" ];
let combinations = [];
let prevPhoneNumber = '';
router.post('/:page', function(req, res){
    let page = req.params.page;
    let phonenumber = req.body.phonenumber;
    if(prevPhoneNumber === '' || prevPhoneNumber !== phonenumber){
        combinations = [];
        prevPhoneNumber = phonenumber;
        let phonenumberArr = phonenumber.split('');
        findCombinations(phonenumberArr);
    }
    res.status(201).json({combinations: combinations.slice(page*10, (page*10)+10), totalCombinations: combinations.length});
});

function findCombinations(phonenumberArr){
    let prev = 0;
    for(let i=phonenumberArr.length-1;i>= 0;i--){
        let chars =  arr[phonenumberArr[i]].split('');
        if(combinations.length === 0) {
            let newStr =phonenumberArr.join('').substring(0,i);
            for(let j=0;j< chars.length;j++) {
                combinations.push(newStr + chars[j]);
            }
        } else {
            let currLength = combinations.length;
            for(let k = prev;k<currLength;k++){
                for (let m = 0; m < chars.length; m++) {
                    let uniqueStr = combinations[k].substr(0, i) + chars[m] + combinations[k].substr(i + 1, combinations[k].length-1);
                    if (combinations.indexOf(uniqueStr) === -1) {
                        combinations.push(uniqueStr);
                    }
                }
            }
            if(chars.length !== 1) {
                prev = currLength;
            }
        }
    }
}



module.exports = router;
