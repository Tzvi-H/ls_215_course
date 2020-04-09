function shorthandNumbers(string) {
  return numStringToArray(string).reduce(function(nums, numString) {
    return nums.concat(generateNums(nums, numString))
  }, []);
}

function generateNums(array, numString) {
  let currentNum = array[array.length - 1];
  if (isRange(numString)) {
    return generateRange(currentNum, numString);
  } else {
    return generateNum(currentNum, numString);
  }
}

function numStringToArray(string) {
  return string.split(', ');
}

function isRange(numString) {
  return /-|:|\.{2}/.test(numString);
}

function nextNum(num, endingString) {
  while (!String(num).endsWith(endingString)) {
    num += 1;
  }
  return num;
}

function generateNum(currentNum, numString) {
  if (currentNum === undefined) {
    return Number(numString);
  } else {
    return nextNum(currentNum, numString);
  }
}

function generateRange(currentNum, rangeString) {
  let range = [];
  let rangeStrings = splitRange(rangeString);
  rangeStrings.slice(0, -1).forEach(function(_, idx, arr) {
    currentNum = currentNum || Number(rangeStrings[0]);
    let min = nextNum(currentNum, rangeStrings[idx]);
    if (min === Number(rangeStrings[idx]) && idx > 0) {
      min += 1;
    }
    let max = rangeStrings[idx + 1];
    while (true) {
      range.push(min);
      if (String(min).endsWith(max)) {
        break;
      }
      min = min + 1;
    }
  })
  return range;
}

function splitRange(rangeString) {
  return rangeString.split(/-|:|\.{2}/);
}


// console.log(shorthandNumbers('1, 3, 7, 2, 4, 1')); // 1, 3, 7, 12, 14, 21
console.log(shorthandNumbers('1-3, 1-2'));
console.log(shorthandNumbers('104-2'));
console.log(shorthandNumbers('104-02'));           // 104, 105, ... 202
console.log(shorthandNumbers('545, 64:11'));       // 545, 564, 565, .. 611
console.log(shorthandNumbers('1:5:2'));            // 1, 2, 3, 4, 5, 6, ... 12