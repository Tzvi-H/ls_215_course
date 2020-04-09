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
      if (!currentNum) {
        results.push(Number(value));
      } else {
        results.push(nextNumber(currentNum, value));
      }
    } else {
      let nums = value.split(/[-:.]/).map(char => Number(char));
      if (nums.length === 2) {
        while (true) {
          let value = nums[0];
          if (!currentNum) {
            results.push(value);
            value += 1;
          }
          do {
            results.push(nextNumber(currentNum, String(value)));
            currentNum = results[results.length - 1];
            value = String(Number(value) + 1);
            break;
          } while (!String(currentNum).endsWith(value));
        }
      } else {
        return kkjl;
      }
    }  
  })
  return results;
}

function nextNumber(currentNum, value) {
  while (!String(currentNum).endsWith(value)) {
    currentNum += 1;
  }
  return currentNum;
}

console.log(extractNumbers("1, 3, 7, 2, 4, 1"));  // [1, 3, 7, 12, 14, 21]
console.log(extractNumbers("1-3, 1-2")); // [1, 2, 3, 11, 12]
// console.log(extractNumbers("1:5:2")); // [1, 2, 3, 4, 5, 6, ... 12]
// console.log(extractNumbers("104-2")); // [104, 105, ... 112]
// console.log(extractNumbers("104-02")); // [104, 105, ... 202]
// console.log(extractNumbers("545, 64:11")); // [545, 564, 565, .. 611]

