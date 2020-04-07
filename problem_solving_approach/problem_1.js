/*
  input  = string representing phone number
  output = 10 digit string

Problem
  - given a phone number
  - if valid, return a clean version of the phone number
  - if invalid, return a string of 10 0's

  - spaces, dash, dot, and parentheses should be ignored
  - if less then 10 digits => invalid
  - if 10 digits => valid
  - if 11 digits
    - if first digit is 1 => ignore first digit and use the last 10
    - if first digit is NOT 1 => invalid
  - if more than 11 digits => invalid

  
Examples
  - '123-456-7890'        => '1234567890'
  - '123-456-789'         => '0000000000'
  - '(1)(012)(345)(6789)  => '1234567890'
Data Structure
  - string
Algorithm
  - set a constant to the invalid number return value
  - replace spaces, dash, dot, and parentheses with blanks
  - if number contains non digit characters
    - RETURN the invalid return value
  - if number is 10 or less digits or 12 or more digits  
    - RETURN the invalid return value
  - if the number has 10 digits
    - RETURN the number
  - if the number has 11 digit
    - if the first digit is 1
      - return the number starting from the 2nd digit
    - otherwise
      - RETURN the invalid return value  
Questions
*/

function cleanPhoneNumber(phoneNumber) {
  const INVALID_RETURN_VALUE = '0000000000';
  const IGNORED_CHARS = new RegExp(/[ -.()]/g)
  const VALID_DIGIT_COUNT = new RegExp(/^\d{10,11}$/);
  
  let cleanNumber = phoneNumber.replace(IGNORED_CHARS, '');

  if (VALID_DIGIT_COUNT.test(cleanNumber)) {
    if (cleanNumber.length === 10) {
      return cleanNumber;
    } else if (cleanNumber[0] === '1') {
      return cleanNumber.slice(1);
    }
  } 

  return INVALID_RETURN_VALUE;
}
// less than 10 digits
console.log(cleanPhoneNumber('123')); //                 => '0000000000'
console.log(cleanPhoneNumber('123456789a')); //          => '0000000000'
// 10 digits
console.log(cleanPhoneNumber('123-456-7890')); //        => '1234567890'
console.log(cleanPhoneNumber('(123)-456-7890')); //      => '1234567890'
console.log(cleanPhoneNumber('(123)-456-7890  ')); //    => '1234567890'
// 11 digits valid
console.log(cleanPhoneNumber('123-456-78901')); //       => '12345678901'
// 11 digits invalid
console.log(cleanPhoneNumber('023-456-78901')); //       => '0000000000'
// greater then 11 digits
console.log(cleanPhoneNumber('(12)(012)(345)(6789)'));// => '0000000000'
console.log(cleanPhoneNumber('12(012)(345)(6789)'));//   => '0000000000'
// contains invalid characters (letters)
console.log(cleanPhoneNumber('(123)-456-7890a')); //     => '0000000000'