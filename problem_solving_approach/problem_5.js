/*
Rail Cipher
Problem
  - Input => string message and number of rails
  - Output => string of encoded message 

  - Given a string message and a number representing the number of rails
    encode the message with the require number of rails

  - Starting with the first letter at the first position of the first rail,
    each subsequent letter is written on the next rail
  - Each time you move to the next rail, you should move forward 2 positions
  - move up and down the rails, for example, if there are 3 rails and you just 
    wrote the 3rd letter on the last (3rd) rail, the next letter should be written on the 2nd rail, then the 1st, etc.
  - Every 2nd position should contain a period, unless it already contains a letter
  - Return a string from a combination of all the letters from each rail in the order it's written on the rail
Examples
  - "WE ARE DISCOVERED FLEE AT ONCE"
  => W . . . E . . . C . . . R . . . L . . . T . . . E
     . E . R . D . S . O . E . E . F . E . A . O . C
     . . A . . . I . . . V . . . D . . . E . . . N     
Data Structure
  - Nested array (Array of rails)
Algorithm  
  - Given a message (string) and a railCount (number)
  1. remove all spaces from the message
  2. intialize a nested array with an inner empty array for each rail
  3. initialize position to 0
  4. initialize railNumber to 0
  5. intialize a direction variable to 'up'
  6. loop over the message, for each character
     6a. rails[railNumber][position] = character
     6b. increment position by 2
     6c. if direction === 'up
          6ca. increment railNumber by 1
        else (direction is 'down')
          6cb. decrement railNumber by 1
     6e. if (railNumber === railCount - 1)
          6ea. direction = 'down'
         else if (railNumber === 0) 
          6eb. direction = 'up 
  7. loop over the rails, for each rail
    7a. loop over the rail, for each 2nd railPosition
      7ab. if the railPosition contains a letter
            7aba. continue
           else
            7abb. fill the railPosition with a period
  8. loop over the rails, for each rail
    8a. filter the rail to contains only the characters
    8b. combine the characters into a word
  9. combine the words  
*/

function encode(message, railCount) {
  message = message.replace(/[^a-z]/ig, '');
  let rails = createRails(railCount);
  let position = 0;
  let railNumber = 0;
  let direction = 'up';

  for (char of message) {
    rails[railNumber][position] = char;
    position += 2;
    if (direction === 'up') {
      railNumber += 1;
    } else {
      railNumber -= 1;
    }
    if (railNumber === railCount - 1) {
      direction = 'down';
    } else if (railNumber === 0) {
      direction = 'up';
    }
  }

  rails.forEach(rail => {
    for (let i = 0; i < rail.length; i += 2) {
      if (!rail[i]) {
        rail[i] = '.';
      }
    }
    for (let i = 1; i < rail.length; i += 2) {
      if (!rail[i]) {
        rail[i] = ' ';
      }
    }  
  })
  rails.forEach(rail => {
    // console.log(rail.join(''));
  })
  let encodedMessage = rails
                        .map(rail => {
                          return rail.filter(char => /[A-Z]/i.test(char));
                        })
                        .map(rail => rail.join(''))
                        .join('')
  return encodedMessage;
}

function createRails(railCount) {
  let rails = [];
  for (let count = 0; count < railCount; count += 1) {
    rails.push([]);
  }
  return rails;
}

// console.log(encode("WE ARE DISCOVERED FLEE AT ONCE", 3) === 'WECRLTEERDSOEEFEAOCAIVDEN');

/*
- Given a message (string) and a railCount (number)
  1. intialize a nested array with an inner empty array for each rail
  3. initialize position to 0
  4. initialize railNumber to 0
  5. intialize a direction variable to 'up'
  6. loop over the message, for each character
     6a. rails[railNumber][position] = '?'
     6b. increment position by 2
     6c. if direction === 'up
          6ca. increment railNumber by 1
        else (direction is 'down')
          6cb. decrement railNumber by 1
     6e. if (railNumber === railCount - 1)
          6ea. direction = 'down'
         else if (railNumber === 0) 
          6eb. direction = 'up 
  7. loop over the rails, for each rail
    7a. loop over the rail, for each 2nd railPosition
      7ab. if the railPosition contains a '?'
            7aba. continue
           else
            7abb. fill the railPosition with a period
  8. loop over the rails, for each rail
    8a. filter the rail to contains only the characters
    8b. combine the characters into a word
  9. combine the words  
  */
function decode(message, railCount) {
  let rails = createRails(railCount);
  let position = 0;
  let railNumber = 0;
  let direction = 'up';

  for (char of message) {
    rails[railNumber][position] = '?';
    position += 2;
    if (direction === 'up') {
      railNumber += 1;
    } else {
      railNumber -= 1;
    }
    if (railNumber === railCount - 1) {
      direction = 'down';
    } else if (railNumber === 0) {
      direction = 'up';
    }
  }

  rails.forEach(rail => {
    for (let i = 0; i < rail.length; i += 2) {
      if (!rail[i]) {
        rail[i] = '.';
      }
    }
    for (let i = 1; i < rail.length; i += 2) {
      if (!rail[i]) {
        rail[i] = ' ';
      }
    }  
  })

  let chars = message.split('');

  rails.forEach(rail => {
    rail.forEach((char, idx) => {
      if (char === '?') {
        rail[idx] = chars.shift();
      }
    })
  })

  displayRails(rails);
  displayMessage(rails);
}

function createRails(railCount) {
  let rails = [];
  for (let count = 0; count < railCount; count += 1) {
    rails.push([]);
  }
  return rails;
}

function displayRails(rails) {
  rails.forEach(rail => {
    console.log(rail.join(''));
  })
}

function displayMessage(rails) {
  let position = 0;
  let railNumber = 0;
  let direction = 'up';
  let message = '';

  while (position < rails[0].length) {
    message += rails[railNumber][position];
    position += 2;
    if (direction === 'up') {
      railNumber += 1;
    } else {
      railNumber -= 1;
    }
    if (railNumber === rails.length - 1) {
      direction = 'down';
    } else if (railNumber === 0) {
      direction = 'up';
    }
  }
  console.log(message);
}
  
decode('WECRLTEERDSOEEFEAOCAIVDEN', 3);
   
                                         
