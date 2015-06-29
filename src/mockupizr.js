/*

    Currently understands:

    data-m="add class 'x' to '#popup'"
    data-m="remove class 'x' from '#popup'"
    data-m="toggle class 'x' for '#popup'"
    data-m="add class 'x' to '#popup' on click"
    data-m="add class 'x' to '#popup' on click,mouseover"

 */

class Mockupizr {
    constructor() {
        this.helper = new MockupizrHelper();
        this.find();
        this.iterate();
    }


    find() {
        this.elements = document.querySelectorAll('*[data-m]');
    }

    iterate() {
        for(let i = 0; i < this.elements.length; i++) {
            this.parse(this.elements[i]);
        }
    }

    parse(element) {
        let command = element.dataset.m;
        command = command.split(" ");
        this.understand(command, element);
    }

    understand(command, element) {
        let action = command[0];
        let property = command[1];
        let value = command[2];
        let target = command[4];
        let events = '';

        if(command.length > 5) {
            events = command[6];
        }

        if (command.length < 5) {
            throw new Error('Wrong command length: ' + command.length);
        }

        if (action !== 'add' && action !== 'remove' && action !== 'toggle') {
            throw new Error('Wrong initial part of command');
        }

        if (property !== 'class') {
            throw new Error('Wrong property: ' + property);
        }

        if (!MockupizrValidator.isInSingleQuotes(value)) {
            throw new Error('Property value should be placed in single quotes: ' + value);
        }

        if (!MockupizrValidator.isInSingleQuotes(target)) {
            throw new Error('Target selector should be placed in single quotes: ' + target);
        }

        if (!MockupizrValidator.elementExist(target)) {
            throw new Error('There is no elements for the ' + target + ' selector');
        }

        this.doIt({
            emmiter: element,
            action: action,
            target: target,
            value: value,
            property: property,
            events: events
        });
    }

    doIt(data) {
        let selector = data.target.replace(/'/gim, '');
        let elements = document.querySelectorAll(selector);

        if(data.events === '') {
            data.events = 'click';
        }

        data.events = data.events.split(',');

        for(let i = 0; i < data.events.length; i++) {
            data.emmiter.addEventListener(data.events[i], (e) => {
                e.preventDefault();

                for(let j = 0; j < elements.length; j++) {
                    let methodName = data.action + this.helper.ucfirst(data.property);
                    MockupizrTasks[methodName](elements[j], data.value);
                }
            }, false);
        }

    }
}
// Run
new Mockupizr();
