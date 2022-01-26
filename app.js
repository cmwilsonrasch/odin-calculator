// There is a bug on the student example calculator.
// Sequence [i]0 + [i]00; when entering second 0 in [i]00 display goes to 0
// Entering another number without clearing produces a 0 in front on input numbers


class Calculator {
  constructor(display) {
    this.display = display;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  sign() {
    this.currentOperand = this.currentOperand - (this.currentOperand * 2);
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  compute() {
    let calculation;
    let result;
    if (this.operation === null) return;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    if (current === '0' || current === 0) {
      alert('Infinity is not real you should know. :P');
      this.clear();
    }
    switch(this.operation) {
      case '+':
        calculation = prev + current;
        result = +calculation.toFixed(4);
        break;
      case '-':
        calculation = prev - current;
        result = +calculation.toFixed(4);
        break;
      case '*':
        calculation = prev * current;
        result = +calculation.toFixed(4);
        break;
      case '/':
        calculation = prev / current;
        result = +calculation.toFixed(4);
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.updateDisplay()
    this.operation = null;
    this.previousOperand = '';
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  updateDisplay() {
    this.display.innerText = this.currentOperand;
  }
}

const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.operand');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const signBtn = document.querySelector('.sign');
const deleteBtn = document.querySelector('.delete');
const equalsBtn = document.querySelector('.equals');

const calculator = new Calculator(display);

numBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.value);
    calculator.updateDisplay();
  })
})

operatorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.value);
  })
})

clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

signBtn.addEventListener('click', () => {
  calculator.sign();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})



























