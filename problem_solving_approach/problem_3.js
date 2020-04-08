/*
Problem
  - Input/Output => string/boolean
  - Given a set of blocks and a word string
  - return a boolean indicating if you can spell the word using the blocks
  - blocks can only be used once
  - blocks can only be used for one of its letters
  - should be case insensitive
  - the 13 blocks are as follows
  B:O   X:K   D:Q   C:P   N:A
  G:T   R:E   F:S   J:W   H:U
  V:I   L:Y   Z:M
Examples
  - 'BATCH' => true
  - 'BUTCH' => false
  - 'jest'  => true
Data Structure
  - ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM' ];
Algorithm
  - given an array made up of 13 2-character strings
  - given an input word
  - convert word to uppercase
  - create an empty object
  - loop over every word character
    - find the index of the block element that contains the character 
    - if that index exists in the object 
      - return false
    - otherwise 
      - add the index as a key to the object with a value of true
  - return true (if reached the end)      
Questions
*/

const SPELLING_BLOCKS = ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM'];
function isBlockWord(word) {
  let blockIndeces = {};
  word = word.toUpperCase();
  
  for (let letter of word) {
    let blockIndex = SPELLING_BLOCKS.findIndex(block => block.indexOf(letter) >= 0);
    if (blockIndeces[blockIndex]) {
      return false;
    } else {
      blockIndeces[blockIndex] = true;
    }
  }

  return true;
}

console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('jest'));       // true
console.log(isBlockWord('BbATCH'));      // false
console.log(isBlockWord('BUTCH'));      // false
