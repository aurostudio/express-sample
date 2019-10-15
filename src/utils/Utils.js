import jwt from 'jsonwebtoken';
import _ from 'lodash';
import validator from 'validator';

const environments = [
    "development",
    "testing",
    "staging",
    "production"
];
const defaultEnvironment = environments[0];

const postalCodeRegExp = /([A-Z][0-9][A-Z]-?[0-9][A-Z][0-9])/i;
const emailRegExp = /([^+@]+)(\+.*)?(@.+\..+)/;
const emailDomainRegExp = /([^+@]+)(\+.*)?@(.+\..+)/;

const { PRISMA_APP_SECRET } = process.env;

function getUserId(context) {
    const Authorization = context.request.get('Authorization');

    if (!_.isNull(Authorization) && Authorization !== 'null') {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, PRISMA_APP_SECRET);

        return userId;
    }

    throw new Error('Not authenticated');
}

function generateColorCodePair() {
    return `${getRandomColor()}, ${getRandomColor()}`;
}

function generateSingleColorCode() {
    return getRandomColor();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function getTimestamp() {
    const today = new Date(new Date());
    const secondTimestamp = today / 1000;

    return Math.round(secondTimestamp);
}

function shuffleArray(randomArray) {
    let randomLength = randomArray.length;
    let temp = '';
    let index = '';

    while (randomLength > 0) {
        index = Math.floor(Math.random() * randomLength);
        randomLength--;
        temp = randomArray[randomLength];
        randomArray[randomLength] = randomArray[index];
        randomArray[index] = temp;
    }

    return randomArray;
}

function generateCode(codesLength) {
    const removeInvalidNumber = ((codes) => {
        let special = false;

        if (parseInt(codes[0], 10) + 1 === parseInt(codes[1], 10)) {
            let i = codes.length;
            while (i--) {
                if (i === 0) {

                } else if (parseInt(codes[i], 10) - 1 === parseInt(codes[i - 1], 10)) {
                    special = true;
                } else {
                    special = false;
                    break;
                }
            }
        } else if (parseInt(codes[1], 10) + 1 === parseInt(codes[0], 10)) {
            let i = codes.length;
            while (i--) {
                if (i === 0) {

                } else if (parseInt(codes[i], 10) + 1 === parseInt(codes[i - 1], 10)) {
                    special = true;
                } else {
                    special = false;
                    break;
                }
            }
        } else {
            _.each(codes.split('', (index, value) => {
                if (index <= (codes.length - 3)) {
                    special = (value === codes[index + 1]);
                }
            }));
        }

        return special;
    });

    let number = 0;
    let isSpecialNumber = false;
    do {
        for (let i = 0; i <= codesLength - 1; i++) {
            number = number + Math.floor(Math.random() * 10).toString();
        }

        isSpecialNumber = (codesLength <= 10) && removeInvalidNumber(number);
    }
    while (isSpecialNumber);

    return number;
}

function parseEnvironment(value) {
    if (value == null || typeof value != "string" || value.length == 0) {
        return defaultEnvironment;
    }

    var environment = value.trim().toLowerCase();
    if (environment.length == 0) {
        return defaultEnvironment;
    }

    for (var i = 0; i < environments.length; i++) {
        if (environment == environments[i]) {
            return environments[i];
        }
    }
    return defaultEnvironment;
}

function parseBoolean(value) {
    if (typeof value == 'boolean') { return value; }

    if (typeof value == 'undefined' || value == null) { return null; }

    if (typeof value != 'string') { return null; }

    let temp = value.trim().toLowerCase();

    if (temp.length == 0) { return null; }

    if (temp.length == 1) {
        if (temp.charAt(0) == 't' || temp.charAt(0) == 'y') { return true; }
        else if (temp.charAt(0) == 'f' || temp.charAt(0) == 'n') { return false; }
        return null;
    } else {
        if (temp == 'true' || temp == 'yes') { return true; }
        else if (temp == 'false' || temp == 'no') { return false; }
        return null;
    }
}
function parseInteger(value) {
    if (typeof value == 'number') {
        return Math.floor(value);
    } else if (typeof value == 'string') {
        if (validator.isInt(value)) {
            return parseInt(value);
        }
    }
    return NaN;
}

function parseFloatingPointNumber(value) {
    if (typeof value == 'number') {
        return value;
    } else if (typeof value == 'string') {
        if (validator.isFloat(value)) {
            return parseFloat(value);
        }
    }
    return NaN;
}

function parseDate(value) {
    if (value === null) { return null; }
    if (typeof value == 'number') {
        if (isNaN(value)) { return null; }

        const formattedValue = Math.floor(value);
        return new Date(formattedValue);
    } else if (typeof value == 'string') {
        const trimmedValue = value.trim();
        if (trimmedValue.length == 0) { return null; }

        let timestamp = null;
        timestamp = (validator.isInt(trimmedValue)) ? parseInt(trimmedValue) : Date.parse(trimmedValue);

        return (!isNaN(timestamp)) ? new Date(timestamp) : null;
    } else if (typeof value == 'object') {
        return (value instanceof Date) ? value : null;
    }
    return null;
}

function parsePostalCode(value) {
    if (value === null || typeof value != 'string') {
        return null;
    }

    var formattedValue = value.trim().toUpperCase();
    var postalCodeData = formattedValue.match(postalCodeRegExp);

    if (postalCodeData) {
        var postalCode = postalCodeData[1].replace('-', '');
        return (postalCode.length != 6) ? null : postalCode;
    }
    return null;
}

function parseEmail(value) {
    if (value == null || typeof value != 'string' || value.length == 0) {
        return null;
    }

    var trimmedEmail = value.trim().toLowerCase();
    if (trimmedEmail.length == 0) { return null; }

    var data = trimmedEmail.match(emailRegExp);
    if (data == null || typeof data == 'undefined' || data.length < 4) { return null; }

    return data[1] + data[3];
}

function parseEmailDomain(value) {
    if (value == null || typeof value != 'string' || value.length == 0) {
        return null;
    }

    var trimmedEmail = value.trim().toLowerCase();
    if (trimmedEmail.length == 0) { return null; }

    var data = trimmedEmail.match(emailDomainRegExp);
    if (data == null || typeof data == 'undefined' || data.length < 4) { return null; }

    return data[3];
}

function getFileExtension(fileName) {
    if (typeof fileName != 'string' || fileName == null || fileName.length == 0) { return null; }

    var fileExtension = fileName.replace(/^.*\./, '').trim();

    return fileExtension.length == 0 ? null : fileExtension;
}

function getDateString(date) {
    if (typeof date != 'object' || date == null || !(date instanceof Date)) {
        date = new Date();
    }
    return '${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}_${date.getHours() < 10 ? "0" : ""}${date.getHours()}-${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}-${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()}';
}

function parseTaxYear(value) {
    const taxYear = parseInteger(value);

    if (isNaN(taxYear)) { return NaN; }

    const currentYear = new Date().getFullYear();
    return (taxYear < currentYear - 2 || taxYear >= currentYear) ? NaN : taxYear;
}

function addLeadingZeroes(value, expectedLength) {
    const number = parseInteger(value);

    if (isNaN(number) || number < 0) {
        return null;
    }

    let formattedNumber = number.toString();

    var expectedLength = parseInteger(expectedLength);

    if (isNaN(expectedLength) || expectedLength < 0) {
        return formattedNumber;
    }

    const numberOfZeroes = expectedLength - formattedNumber.length;

    for (var i = 0; i < numberOfZeroes; i++) {
        formattedNumber = '0' + formattedNumber;
    }
    return formattedNumber;
}

export {
    addLeadingZeroes,
    getUserId,
    getFileExtension,
    getDateString,
    getTimestamp,
    generateSingleColorCode,
    generateColorCodePair,
    generateCode,
    shuffleArray,
    parseEnvironment,
    parseBoolean,
    parseInteger,
    parseFloatingPointNumber,
    parseDate,
    parsePostalCode,
    parseEmail,
    parseEmailDomain,
    parseTaxYear,
};
