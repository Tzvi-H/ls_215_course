function splitIntoNums(string) {
  return string.split(', ');
}

function includesRange(numString) {
  return /-|:|\.{2}/.test(numString);
}

function isEmpty(array) {
  return array.length === 0;
}

function lastElement(array) {
  return array[array.length - 1];
}

function nextValue(num, endingString) {
  while (!endsWith(num, endingString)) {
    num += 1;
  }
  return num;
}

function endsWith(num, endingString) {
  return String(num).endsWith(endingString);
}

function splitIntoRange(string) {
  return string.split(/-|:|\.{2}/);
}

function incrementNumStringByOne(numString) {
  let nextNum = Number(numString) + 1;
  return String(nextNum);
}

function convertShortHandNums(stringOfNums) {
  let results = [];
  let stringNums = splitIntoNums(stringOfNums);
  stringNums.forEach(numString => {
    if (includesRange(numString)) {
      let range = splitIntoRange(numString);
      for (let index = 0; index < range.length - 1; index += 1) {
        let lastNum = lastElement(results) || Number(range[index]);
        let start = nextValue(lastNum, range[index]);
        let end = nextValue(Number(start), range[index + 1]);        
        while (true) {
          let num = nextValue(lastNum, start);
          results.push(num);
          lastNum = lastElement(results);
          if (endsWith(lastNum, end)) {
            break;
          }
          start = incrementNumStringByOne(start);
        }
      }
    } else {
      let lastNum = lastElement(results) || Number(numString);
      let num = nextValue(lastNum, numString);
      results.push(num);
    }
  })
  return results;
}

console.log(convertShortHandNums('1, 3, 7, 2, 4, 1')); // --> 1, 3, 7, 12, 14, 21
console.log(convertShortHandNums('1-3, 1-2'));      // --> 1, 2, 3, 11, 12
console.log(convertShortHandNums('104-2'));         // --> 104, 105, ... 112
console.log(convertShortHandNums('104-02'));        // --> 104, 105, ... 202
console.log(convertShortHandNums('545, 64:11'));    // --> 545, 564, 565, .. 611
console.log(convertShortHandNums('1:5:2'));         // --> 1, 2, 3, 4, 5, 6, ... 12
