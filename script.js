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
  if (digit === '.' && currentNumber.includes('.')) {
    return;
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
  return operation(leftSideNumber, rightSideNumber);
}

const handleOperation = (event) => {
  console.log(event.target);
  const symbol = event.target.dataset.operation;
  if(symbol === '=') {
    let result = calculateResult();
    currentNumber = `${result}`;
    updateDisplay(currentNumber);
    leftSideNumber = null;
    rightSideNumber = null;
    operation = null;
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
document.querySelector("#all-clear").addEventListener('click', (event) => {
  resetCurrentNumber();
});

/* Invert */
document.querySelector("#invert").addEventListener('click', (event) => {
  const number = Number(currentNumber) * -1;
  currentNumber = `${number}`;
  updateDisplay(currentNumber);
});

/* Percent */
document.querySelector("#percent").addEventListener('click', (event) => {
  const number = Number(currentNumber) / 100;
  currentNumber = `${number}`;
  updateDisplay(currentNumber);
});
