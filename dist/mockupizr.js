'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MockupizrHelper = (function () {
    function MockupizrHelper() {
        _classCallCheck(this, MockupizrHelper);
    }

    _createClass(MockupizrHelper, [{
        key: 'ucfirst',
        value: function ucfirst(text) {
            return text[0].toUpperCase() + text.slice(1);
        }
    }]);

    return MockupizrHelper;
})();

var MockupizrTasks = (function () {
    function MockupizrTasks(instance) {
        _classCallCheck(this, MockupizrTasks);

        this.parent = instance;
    }

    _createClass(MockupizrTasks, [{
        key: 'addClass',
        value: function addClass(target, value) {
            value = value.replace(/'/gim, '');
            target.classList.add(value);
        }
    }, {
        key: 'removeClass',
        value: function removeClass(target, value) {
            value = value.replace(/'/gim, '');
            target.classList.remove(value);
        }
    }]);

    return MockupizrTasks;
})();

var MockupizrValidator = (function () {
    function MockupizrValidator() {
        _classCallCheck(this, MockupizrValidator);
    }

    _createClass(MockupizrValidator, null, [{
        key: 'isInSingleQuotes',
        value: function isInSingleQuotes(text) {
            return text[0] === '\'' && text[text.length - 1] === '\'';
        }
    }, {
        key: 'elementExist',
        value: function elementExist(selector) {
            selector = selector.replace(/'/gim, '');
            return document.querySelectorAll(selector).length > 0;
        }
    }]);

    return MockupizrValidator;
})();

/*

    Currently understands:

    data-m="add class 'x' to '#popup'"
    data-m="remove class 'x' from '#popup'"

 */

var Mockupizr = (function () {
    function Mockupizr() {
        _classCallCheck(this, Mockupizr);

        this.tasks = new MockupizrTasks(this);
        this.helper = new MockupizrHelper();
        this.find();
        this.iterate();
    }

    _createClass(Mockupizr, [{
        key: 'find',
        value: function find() {
            this.elements = document.querySelectorAll('*[data-m]');
        }
    }, {
        key: 'iterate',
        value: function iterate() {
            for (var i = 0; i < this.elements.length; i++) {
                this.parse(this.elements[i]);
            }
        }
    }, {
        key: 'parse',
        value: function parse(element) {
            var command = element.dataset.m;
            command = command.split(' ');
            this.understand(command, element);
        }
    }, {
        key: 'understand',
        value: function understand(command, element) {
            var action = command[0];
            var property = command[1];
            var value = command[2];
            var target = command[4];

            if (command.length != 5) {
                throw new Error('Wrong command length: ' + command.length);
            }

            if (action !== 'add' && action !== 'remove') {
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

            this['do']({
                emmiter: element,
                action: action,
                target: target,
                value: value,
                property: property
            });
        }
    }, {
        key: 'do',
        value: function _do(data) {
            var _this = this;

            var selector = data.target.replace(/'/gim, '');
            var elements = document.querySelectorAll(selector);

            data.emmiter.addEventListener('click', function (e) {
                e.preventDefault();

                for (var i = 0; i < elements.length; i++) {
                    var methodName = data.action + _this.helper.ucfirst(data.property);
                    console.log(methodName);
                    _this.tasks[methodName](elements[i], data.value);
                }
            }, false);
        }
    }]);

    return Mockupizr;
})();

// Run
new Mockupizr();
//# sourceMappingURL=mockupizr.js.map