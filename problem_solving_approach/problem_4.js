/*
  - 
Problem
  - Given a string of digits where the digits only represent the significant part of the numbers,
  - return an array of the full numbers. 
  - numbers always increase in order
  - '1,5,1,5,1' => (1,5,11,15,21)
  - numbers can be written with ranges (-, :, ..)
  - '1:3' => (1,2,3)
Input/Output
  - string / array
Examples
Data Structure
Algorithm
Questions
*/

/*
0. create a result array
1. split all numberStrings
2. map into array of numbers
3. for each number and index
  3a. if index is 0
    3aa. push the number to the results         
  3b. else 
    3ba. get the last number in the results
    3bb. generate the next largerNum with ending digit of number (SUBPROCESS)
    3bc. push the generatedNumber into the results array
4. return results

SUBPROCESS
0. Given a currentNum and a digit
1. increment currentNum until it's last digit matches the digit 
2. return currentNum  
*/

function extractNumbers(stringNums) {
  let results = [];
  let numbers = stringNums.split(', ');
  numbers.forEach((value, index) => {
    let currentNum = results[results.length - 1];
    if (!/-|:|\.{2}/.test(value)) {
      let digit = Number(value);
      if (!currentNum) {
        results.push(digit);
      } else {
        results.push(nextNumber(currentNum, digit));
      }
    } else {
      let nums = value.split(/[-:.]/).map(char => Number(char));
      //let range = 

    }  
  })
  return results;
}

function nextNumber(currentNum, digit) {
  while (currentNum % 10 !== digit) {
    currentNum += 1;
  }
  return currentNum;
}

console.log(extractNumbers("1, 3, 7, 2, 4, 1"));  // [1, 3, 7, 12, 14, 21]
// console.log(extractNumbers("1-3, 1-2")); // [1, 2, 3, 11, 12]
// console.log(extractNumbers("1:5:2")); // [1, 2, 3, 4, 5, 6, ... 12]
// console.log(extractNumbers("104-2")); // [104, 105, ... 112]
// console.log(extractNumbers("104-02")); // [104, 105, ... 202]
// console.log(extractNumbers("545, 64:11")); // [545, 564, 565, .. 611]
