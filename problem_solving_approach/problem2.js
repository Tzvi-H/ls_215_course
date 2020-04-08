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
  - array
Algorithm
  - replace all non digit characters with blanks  
  - split the chars into an array
  - reverse the array
  - map the characters into numbers
  - reduce the array starting with a 0 accumulator, for each element and index
    - if index is odd
      - double the number
        - if doubling results in greater then 9
          - subtract 9
    - return the accumulator + num
  - return whether the last digit in the reduced value is 0       
Questions
*/

function double(num) {
  num = num * 2;
  return num >= 10 ? num - 9 : num;
}

function luhnFormula(string) {
  let sum = string.replace(/\D/g, '')
                  .split('')
                  .reverse()
                  .map(char => Number(char))
                  .reduce((sum, num, index) => {
                    if (index % 2 === 1) {
                      num = num * 2;
                      if (num >= 10) num -= 9;
                    }
                    return sum + num;
                  }, 0);

  return sum % 10 === 0;
}

console.log(luhnFormula('1111')); // invalid
console.log(luhnFormula('8763')); // valid
console.log(luhnFormula('2323 2005 7766 3554')); // valid