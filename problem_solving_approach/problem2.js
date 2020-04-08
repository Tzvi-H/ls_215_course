/*
Problem
  input/output - string of digits / boolean
  - Given a number string, return a boolean indicating if it passes the Luhn formula
  - Ignore all non-numeric characters

  Luhn formula
  - starting from rightmost digit
    - double every 2nd digit
     - if doubling results in a number greater than 9, subtract 9
  - add all the digits together
  - if last digit is 0, then it is valid   
Examples
  - "1111" => 2121 => 6 => invalid
  - "8763" => 7733 => 20 => valid
  - "2323 2005 7766 3554" => valid
Data Structure
  - string
Algorithm
  - initialize a needsDoubling variable to false
  - initialize a sum variable to an empty string
  - replace all non digit characters with blanks  
  - loop from back of string, for each index
    - intialize a num variable to the current element coerced into a number
    - if needsDoubling is true
      - double the number
        - if doubling results in greater then 9
          - subtract 9
    - add the num to the front of sum string
  - add all the digits in the sum string
  - return whether the last digit is 0       
Questions
*/

function double(num) {
  num = num * 2;
  return num >= 10 ? num - 9 : num;
}

function sumString(string) {
  return string.split('')
               .reduce((sum, char) => Number(char) + sum, 0);
}

function luhnFormula(numberString) {
  let needsDoubling = false;
  let cleanNumberString = numberString.replace(/\D/g, '');
  let doubledNumberString = '';

  for (let index = cleanNumberString.length - 1; index >= 0; index -= 1) {
    let num = Number(cleanNumberString[index]);
    if (needsDoubling) num = double(num);
    doubledNumberString = num + doubledNumberString;
    needsDoubling = !needsDoubling;
  }

  let finalSum = sumString(doubledNumberString);
  return finalSum % 10 === 0;
}

console.log(luhnFormula('1111')); // invalid
console.log(luhnFormula('8763')); // valid
console.log(luhnFormula('2323 2005 7766 3554')); // valid