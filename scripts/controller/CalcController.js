class CalcController {
    constructor() {
        this._displayCalc = document.querySelector('#display');
        this.operation = [];
        this.lastNumber;
        this.lastOperator;
        this.initEvents();
    }

    // Getters e setters

    get displayCalc() {
        return this._displayCalc.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalc.innerHTML = value;
    }

    // Métodos

    initEvents() {

        let buttons = document.querySelectorAll('.row > button');

        buttons.forEach(btn => {

            btn.addEventListener('click', event => {
                this.execBtn(btn.id.replace('btn-', ''));
            });

        });

    }

    clearAll() {
        this.lastNumber = '';
        this.lastOperator = '';
        this.operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this.lastNumber = '';
        this.lastOperator = '';
        this.operation.pop();
        this.setLastNumberToDisplay();
    }

    execBtn(value) {
        switch (value) {
            case 'ce':
                this.clearEntry();
                break;
            case 'c':
                this.clearAll();
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'ponto':
                break;
            case 'audio':
                break;
            case 'igual':
                this.calc();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
        }

    }

    getLastOperation() {
        return this.operation[this.operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    setLastOperation(value) {
        this.operation[this.operation.length - 1] = value;
    }

    pushOperation(value) {
        this.operation.push(value);

        if (this.operation.length > 3) {
            this.calc();
        }
    }

    getResult() {
        return eval(this.operation.join(''));
    }

    getLastItem(isOperator = true) {

        let lastItem = '';

        for (let i = this.operation.length - 1; i >= 0; i--) {

            if (isOperator) {
                if (this.isOperator(this.operation[i])) {
                    lastItem = this.operation[i];
                    break;
                }
            } else {
                if (!this.isOperator(this.operation[i])) {
                    lastItem = this.operation[i];
                    break;
                }
            }

        }

        return lastItem;

    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) {
            lastNumber = 0;
        }

        this.displayCalc = lastNumber;
    }

    calc() {

        let last = '';

        if (this.operation.length < 3) {
            let first = this.operation[0];
            this.operation = [first, this.lastOperator, this.lastNumber]
            
        }

        if (this.operation.length > 3) {

            last = this.operation.pop();

            if(last === '%') {
                let result = this.getResult();
                result /= 100
                this.operation = [result]
                this.setLastNumberToDisplay();
            } else {
                let result = this.getResult();
                this.lastNumber = this.getResult();
                this.lastOperator = this.getLastItem();
                this.operation = [result, last];
                this.setLastNumberToDisplay();
            }

        } else if (this.operation.length == 3) {

            let result = this.getResult();
            this.lastOperator = this.getLastItem();
            this.lastNumber = this.getLastItem(false);
            this.operation = [result];
            this.setLastNumberToDisplay();

        }

    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay();

            }

        }
        console.log(this.operation)
    }

}
