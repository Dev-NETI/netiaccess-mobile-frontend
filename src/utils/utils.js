const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '.');
};

const generateUniqueRegistrationNumber = () => {
    // Get the current date and time
    const now = new Date();

    // Get the current year, month, and day
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // Get the current hours, minutes, seconds, and milliseconds for more uniqueness
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    // Generate a random number between 10000 and 99999
    const randomNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    // Combine the date and time parts with the random number
    const uniqueRegistrationNum = `${year}${month}${day}-${hours}${minutes}${seconds}${milliseconds}-${randomNum}`;

    return uniqueRegistrationNum;
}

async function handleSetMethod(setMethod, newValue) {
    await setMethod(newValue)
}

const generateRandomNumbers = () => {
    let randomNumbersString = '';
    for (let i = 0; i < 6; i++) {
        randomNumbersString += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
    }
    return randomNumbersString;
};

export {
    formatDate,
    generateUniqueRegistrationNumber,
    handleSetMethod,
    generateRandomNumbers,
}