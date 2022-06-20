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

/* Display */
const updateDisplay = (text) => {
  document.querySelector('#display').innerHTML = text;
};

let currentNumber = '0';
const updateCurrentNumber = (digit) => {
  if (currentNumber === '0') {
    currentNumber = '';
  }
  currentNumber += digit;
  updateDisplay(currentNumber);
};

const resetCurrentNumber = () => {
  currentNumber = '0';
  updateDisplay(currentNumber);
};

/* Digits */
const handleDigit = (event) => {
  updateCurrentNumber(event.target.dataset.digit);
};

document.querySelectorAll(".digit").forEach((element) => {
  element.addEventListener('click', handleDigit);
});

/* Operations */
let leftSideNumber;
let operation;

const calculateResult = () => {
  const rightSideNumber = Number(currentNumber);
  const result = operation(leftSideNumber, rightSideNumber);
  updateDisplay(`${result}`);
}

const handleOperation = (event) => {
  console.log(event.target);
  const symbol = event.target.dataset.operation;
  if(symbol === '=') {
    calculateResult();
    leftSideNumber = null;
    rightSideNumber = null;
    operation = null;
    currentNumber = '0';
    return;
  }
  operation = selectOperation(symbol);
  leftSideNumber = Number(currentNumber);
  resetCurrentNumber();
};

document.querySelectorAll(".operation").forEach((element) => {
  element.addEventListener('click', handleOperation);
});

/* All-Clear */
document.querySelector("#all-clear").addEventListener('click',(event) => {
  resetCurrentNumber();
});
