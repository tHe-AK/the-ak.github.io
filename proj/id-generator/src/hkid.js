const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateAndShowUniqueId() {
    const id = generateUniqueId();
    const ele = document.getElementsByClassName('unique-id');
    ele[0].innerHTML = id;
}

const calculateCheckDigit = (charPart, numPart) => {
    // Maximum alphabet should be 2
    if (charPart.length > 3) {
        return false;
    }

    // 6 number for a valid HKID
    if (numPart.length !== 6) {
        return false;
    }

    // Calculate checksum for character part
    const strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let checkSum = 0;
    if (charPart.length === 2) {
        checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
        checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
    } else {
        checkSum += 9 * 36;
        checkSum += 8 * (10 + strValidChars.indexOf(charPart));
    }

    // Calculate checksum for numeric part
    for (let i = 0, j = 7; i < numPart.length; i++, j--) {
        checkSum += j * numPart.charAt(i);
    }

    // Verify the check digit
    const remaining = checkSum % 11;
    const verify = remaining === 0 ? 0 : (11 - remaining === 10 ? 'A' : 11 - remaining);

    return verify;
};

function generateUniqueId() {
    // Generate a random number between 1 - 10
    const hkidMode = getRandomInt(1, 10);

    // Generate A - Z from ASCII code 65 - 90
    let randomAlphabet = String.fromCharCode(getRandomInt(65, 90));
    if (hkidMode === 10) {
        randomAlphabet += String.fromCharCode(getRandomInt(65, 90));
    }

    // Generate 6 Number
    let randomNumber = '';
    for (let i = 0; i < 6; i++) {
        randomNumber += String(getRandomInt(0, 9));
    }

    // Calculate check digit
    const checkdigit = calculateCheckDigit(randomAlphabet, randomNumber);

    // Debug Message
    // console.log("HKID Mode: " + hkidMode);
    console.log(`Generating HKID...\n\nAlphabet: \t\t${randomAlphabet}\nNumber: \t\t${randomNumber}\nResult: \t\t${checkdigit}`);

    return randomAlphabet + randomNumber + checkdigit;
}

function onLoad() {
    console.log('test');
    generateAndShowUniqueId();
}