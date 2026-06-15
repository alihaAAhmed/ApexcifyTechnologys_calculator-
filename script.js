// Calculator Class
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operator]');
    const equalsButton = document.querySelector('[data-action="equals"]');
    const clearButton = document.querySelector('[data-action="clear"]');
    const deleteButton = document.querySelector('[data-action="delete"]');
    const previousOperandElement = document.getElementById('previousOperand');
    const currentOperandElement = document.getElementById('currentOperand');

    // Initialize Calculator
    const calculator = new Calculator(previousOperandElement, currentOperandElement);

    // Number Buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    // Operation Buttons
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            let operator = button.innerText;
            if (operator === '÷') operator = '/';
            if (operator === '×') operator = '*';
            calculator.chooseOperation(operator);
            calculator.updateDisplay();
        });
    });

    // Equals Button - FIXED
    equalsButton.addEventListener('click', function(e) {
        e.preventDefault();
        calculator.compute();
    });

    // Clear Button
    clearButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });

    // Delete Button
    deleteButton.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });

    // Keyboard Support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        // Numbers
        if (/[0-9]/.test(key)) {
            calculator.appendNumber(key);
            calculator.updateDisplay();
        }
        
        // Decimal
        if (key === '.') {
            calculator.appendNumber('.');
            calculator.updateDisplay();
        }
        
        // Operators
        if (key === '+') {
            event.preventDefault();
            calculator.chooseOperation('+');
            calculator.updateDisplay();
        }
        if (key === '-') {
            event.preventDefault();
            calculator.chooseOperation('-');
            calculator.updateDisplay();
        }
        if (key === '*') {
            event.preventDefault();
            calculator.chooseOperation('*');
            calculator.updateDisplay();
        }
        if (key === '/') {
            event.preventDefault();
            calculator.chooseOperation('/');
            calculator.updateDisplay();
        }
        if (key === '%') {
            event.preventDefault();
            calculator.chooseOperation('%');
            calculator.updateDisplay();
        }
        
        // Equals
        if (key === 'Enter') {
            event.preventDefault();
            calculator.compute();
        }
        
        // Delete
        if (key === 'Backspace') {
            event.preventDefault();
            calculator.delete();
            calculator.updateDisplay();
        }
        
        // Clear
        if (key === 'Escape') {
            event.preventDefault();
            calculator.clear();
            calculator.updateDisplay();
        }
    });
});