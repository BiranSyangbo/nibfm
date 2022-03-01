const generatePassword = (passwordLength) => {
  try {
    const numberChars = "123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const specialChar = "!@#$%^&*?";
    const allChars = numberChars + upperChars + lowerChars + specialChar;
    let randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray[3] = specialChar;
    randPasswordArray = randPasswordArray.fill(allChars, 4);
    return shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  } catch (err) {
    throw err;
  }
}

const shuffleArray = (array) => {
  try {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  generatePassword
}