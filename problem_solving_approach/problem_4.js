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
1. seperate all numbers
2. for each Number(number)
  2a. if array is empty 
    2aa. push the number to the array         
  2b. else 
    2ba. get the last number in the results
    2bb. generate the next largerNum with ending digit (SUBPROCESS)
    2bc. push the generatedNumber into the results array

SUBPROCESS
0. Given a currentNum and a digit (7, 2) (14, 1)
1. increment currentNum until it's last digit matches the digit 
2. return currentNum  
*/

function extractNumbers(stringNums) {
  let results = [];
  let numbers = stringNums.split(', ').map(char => Number(char)); // [1, 3, 7, 2, 4, 1]
  numbers.forEach((digit, index) => {
    if (index === 0) {
      results.push(digit);
    } else {
      let currentNum = results[index - 1];
      results.push(nextNumber(currentNum, digit));
    }
  })
  console.log(results);
}

function nextNumber(currentNum, digit) {
  while (currentNum % 10 !== digit) {
    currentNum += 1;
  }
  return currentNum;
}

extractNumbers("1, 3, 7, 2, 4, 1")  // [1, 3, 7, 12, 14, 21]
// extractNumbers("1-3, 1-2") // [1, 2, 3, 11, 12]
// extractNumbers("1:5:2") // [1, 2, 3, 4, 5, 6, ... 12]
// extractNumbers("104-2") // [104, 105, ... 112]
// extractNumbers("104-02") // [104, 105, ... 202]
// extractNumbers("545, 64:11") // [545, 564, 565, .. 611]