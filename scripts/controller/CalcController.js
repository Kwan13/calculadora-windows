class CalcController {
    constructor() {
        this._displayCalc = document.querySelector('#display');
        this.operator = [];
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

    }

    clearEntry() {

    }

    execBtn(value) {
        console.log(value)
        switch (value) {
            case 'ce':
                this.clearAll();
                break;
            case 'c':
                this.clearEntry();
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
        return this.operator[this.operator.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    setLastOperation(value) {
        this.operator[this.operator.length - 1] = value;
    }

    pushOperation(value) {
        this.operator.push(value);

        if(this.operator.length > 3) {
            this.calc();
        }
    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else {

                this.pushOperation(value);

            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

            }

        }
        console.log(this.operator)
    }

}
