class MockupizrValidator {
    constructor() {

    }

    static isInSingleQuotes(text) {
        return text[0] === "'" && text[text.length - 1] === "'";
    }

    static elementExist(selector) {
        selector = selector.replace(/'/gim, '');
        return document.querySelectorAll(selector).length > 0;
    }
}