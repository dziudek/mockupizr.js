class MockupizrTasks {
    constructor(instance) {
        this.parent = instance;
    }

    addClass(target, value) {
        value = value.replace(/'/gim, '');
        target.classList.add(value);
    }

    removeClass(target, value) {
        value = value.replace(/'/gim, '');
        target.classList.remove(value);
    }
}