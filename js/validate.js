// Created by Novytskyi Viktor


document.addEventListener('DOMContentLoaded', function() {
    var validateMain = new VanilaValidate('#myform', {
        options: {
            comments: {
                required: true,
                requiredText: "Введите отзыв",
            },
            name_first: {
                required: true,
                requiredText: "Введите имя",
            }

        }
    });
    validateMain.init();
}, true);

(function (window, document) {
    window.VanilaValidate = function (formParent, optionsSet) {
        var self = this;
        this.counter = 0;

        this.elementForm = document.querySelector(formParent);
        this.elementDom = this.elementForm.querySelectorAll('[name]');
        this.itemsNodelist = Array.prototype.slice.call(this.elementDom);
        this.objectInputsItems = [];

        this.defaultOptions = {
            email: {
                required: false,
                requiredText: "Enter email",
                typeText: "Example email name@domain.com",
                type: /(.+)@(.+){2,}\.(.+){2,}/
            },
            fullName: {
                required: false,
                requiredText: "Enter Full name",
            },
            phone: {
                required: false,
                requiredText: "Введите телефон",
            },
            date: {
                required: false,
                requiredText: "Введите год рождения",
            }

        };
        this.changeOptions(optionsSet);
    };


    VanilaValidate.prototype = {
        init: function () {
            this.addEventSubmit(this.elementForm)
        },
        addEventSubmit: function (form) {
            var self = this;
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                self.currentRunFunctionFromObjectInputs(self.validateInput.bind(self));
                self.canSendForm();
            });
        },
        addEventKeyUp: function (itemObject) {
            var self = this;
            itemObject.el.addEventListener("keyup", function (event) {
                self.validateInput(itemObject)
            });
        },
        changeOptions: function (optionsSet) {
            var self = this;
            var objectOptions = optionsSet.options;
            for (var option in objectOptions) {
                for (var def in self.defaultOptions) {
                    if (option === def) {
                        self.defaultOptions[option] = objectOptions[option];
                    }
                }
                if (!self.defaultOptions.hasOwnProperty(option)) {
                    self.defaultOptions[option] = objectOptions[option];
                }
            }
            this.createObjectItems();
        },
        createErrors: function (item) {
            item.el.parentNode.appendChild(item.elemError)
        },
        currentRunFunctionFromObjectInputs: function (ctxFunction) {
            var self = this;
            this.objectInputsItems.forEach(function (item) {
                ctxFunction(item, self.objectInputsItems.length)
            })
        },
        hideErrors: function (item) {
            item.elemError.innerHTML = ''
        },
        showErrors: function (item, typeText) {
            item.elemError.innerHTML = typeText
        },
        createObjectItems: function () {
            var self = this;
            this.itemsNodelist.forEach(function (item) {
                for (var itemOption in self.defaultOptions) {
                    if (item.name === itemOption) {
                        self.objectInputsItems.push({
                            el: item,
                            elemError: self.createElementError(),
                            options: self.defaultOptions[itemOption],
                            canSend: false
                        })
                    }
                }
            });
            this.currentRunFunctionFromObjectInputs(this.createErrors);
            this.currentRunFunctionFromObjectInputs(this.addEventKeyUp.bind(this));
            // this.currentRunFunctionFromObjectInputs(this.validateInput.bind(this))
        },
        createElementError: function () {
            var elementError = document.createElement('span');
            elementError.className = 'error-text';
            return elementError
        },
        sendForm: function () {
            console.log('send form');
            var currentPopupSend = document.querySelector('.popup__add-review')
            currentPopupSend.classList.remove('popup_show');
            var currentPopupShow = document.querySelector('.popup__thanks');
            currentPopupShow.classList.add('popup_show');
        },
        canSendForm: function () {
            var self = this;
            this.objectInputsItems.forEach(function (item) {
                if (item.canSend) {
                    self.counter++;
                }
            });
            if (this.objectInputsItems.length === this.counter) {
                this.sendForm();
            }else{
                this.counter = 0
            }
        },
        validateInput: function (item) {
            if (item.el.value === '' && item.options.required) {
                this.showErrors(item, item.options.requiredText)
                item.canSend = false;
            } else if (item.el.value !== '') {
                this.hideErrors(item);
                item.canSend = true;
                if (item.options.type && !item['options']['type'].test(item.el.value)) {
                    this.showErrors(item, item.options.typeText)
                }
            }
        }
    }
})(window, window.document);
