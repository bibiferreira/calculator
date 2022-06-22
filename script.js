/* Operations Definitions */
const sum = (a,b) => {
  return a + b;
};

const subtract = (a,b) => {
  return a - b;
};

const multiply = (a,b) => {
  return a * b;
};

const divide = (a,b) => {
  return a / b;
};

const selectOperation = (operation) => {
  switch (operation) {
    case '+':
      return sum;
    case '-':
      return subtract;
    case '*':
      return multiply;
    case '/':
      return divide;
  }
}

/* Class Keyboard */
class Keyboard {
  constructor(identifier) {
    this._element = document.querySelector(identifier);
    this._digits = this._element.querySelectorAll('.digit');
    this._operations = this._element.querySelectorAll('.operation');
    this._allClear = this._element.querySelector('#all-clear');
    this._invert = this._element.querySelector('#invert');
    this._percent = this._element.querySelector('#percent');
  }

  get digits() {
    return this._digits;
  }

  get operations() {
    return this._operations;
  }

  get allClear() {
    return this._allClear;
  }

  get invert() {
    return this._invert;
  }

  get percent() {
    return this._percent;
  }
}

/* Class Display */
class Display {
  constructor(identifier) {
    this._element = document.querySelector(identifier);
  }

  update(text) {
    this._element.innerHTML = text;
  }
}

/* Class Calculator */
class Calculator {
  constructor(keyboard, display) {
    this._currentNumber = '0';
    this._leftSideNumber = null;
    this._rightSideNumber = null;
    this._operation = null;

    this._keyboard = keyboard;
    this._keyboard.digits.forEach((element) => {
      element.addEventListener('click', (event) => {
        this.updateCurrentNumber(event.target.dataset.digit);
      });
    });

    this._keyboard.operations.forEach((element) => {
      element.addEventListener('click', (event) => {
        this.handleOperation(event.target.dataset.operation);
      });
    });

    this._keyboard.allClear.addEventListener('click', (event) => {
      this.resetCurrentNumber();
      this.reset();
    });

    this._keyboard.invert.addEventListener('click', (event) => {
      const number = Number(this._currentNumber) * -1;
      this._currentNumber = `${number}`;
      this._display.update(this._currentNumber);
    });

    this._keyboard.percent.addEventListener('click', (event) => {
      const number = Number(this._currentNumber) / 100;
      this._currentNumber = `${number}`;
      this._display.update(this._currentNumber);
    });

    this._display = display;
  }

  handleOperation(symbol) {
    if(symbol === '=') {
      this._rightSideNumber = Number(this._currentNumber);
      let result = this.calculateResult();
      this._currentNumber = `${result}`;
      this._display.update(this._currentNumber);
      this.reset();
      return;
    }
    this._operation = selectOperation(symbol);
    this._leftSideNumber = Number(this._currentNumber);
    this.resetCurrentNumber();
  }

  updateCurrentNumber(digit) {
    if (this._currentNumber === '0') {
      this._currentNumber = '';
    }

    if (digit === '.' && this._currentNumber.includes('.')) {
      return;
    }

    this._currentNumber += digit;
    this._display.update(this._currentNumber);
  }

  resetCurrentNumber() {
    this._currentNumber = '0';
    this._display.update(this._currentNumber);
  }

  calculateResult() {
    return this._operation(this._leftSideNumber, this._rightSideNumber)
  }

  reset() {
    this._leftSideNumber = null;
    this._rightSideNumber = null;
    this._operation = null;
  }
}

const keyboard = new Keyboard('#keyboard');
const display = new Display('#display');
const calculator = new Calculator(keyboard, display);
