export class Validation {
    constructor() {
    }

    static isString(value) {
        return typeof value === 'string' ? true : false;
    }

    static isStringNullOrEmpty(value) {
        const isNull = value == undefined ? true : false;
        const isEmpty = isNull ? true : (value.trim() == '' ? true : false);

        return isEmpty;
    }

    static isNumber(value, isString = false) {
        const notNumber = value == undefined || typeof value == 'string' || typeof value == 'object' ? true : false;
        const notNumberFromString = Validation.isString(value) && Validation.isStringNullOrEmpty(value);

        if(!isString) {
            return notNumber ? false : (!isNaN(value) && parseFloat(value) != NaN ? true : false);
        } else {
            return notNumberFromString ? false : (parseFloat(value) != NaN ? true : false);
        }
    }

    static isBoolean(value) {
        return value != undefined && typeof value == 'boolean';
    }

    static isLookup(value) {
        const isObject = value && typeof value == 'object';
        const hasIdAndName = isObject && (value.hasOwnProperty('id') && value.hasOwnProperty('name'));

        return hasIdAndName;
    }

    static isHTMLElement(element) {
        return element && (element.nodeName && element.nodeType) ? true : false;
    }
}