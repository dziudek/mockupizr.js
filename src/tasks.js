class MockupizrTasks {
    constructor() {
    }

    static addClass(target, value) {
        value = value.replace(/'/gim, '');
        target.classList.add(value);
    }

    static removeClass(target, value) {
        value = value.replace(/'/gim, '');
        target.classList.remove(value);
    }

    static toggleClass(target, value) {
        value = value.replace(/'/gim, '');
        target.classList.toggle(value);
    }
}
