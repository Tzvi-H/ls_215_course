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
  - number
Algorithm
  - initialize a needsDoubling variable to true
  - intiialize a sum variable to 0
  - replace all non digit characters with blanks  
  - loop from back of string, for each index
    - intialize a num variable to the current element coerced into a number
    - if needsDoubling is true
      - double the number
        - if doubling results in greater then 9
          - subtract 9
    - add the num to the sum
  - return whether the last digit is 0       
Questions
*/

function luhnFormula(numberString) {
  
}

console.log(luhnFormula('1111')); // invalid
console.log(luhnFormula('8763')); // valid
console.log(luhnFormula('2323 2005 7766 3554')); // valid