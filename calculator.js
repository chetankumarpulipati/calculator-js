document.addEventListener("DOMContentLoaded", function() {
let result = 0;
let currentInput = "0";
let previousOperator;
const display = document.querySelector(".screen");

function handleButtonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  updateDisplay();
}

function handleNumber(value) {
  if (currentInput === "0") {
    currentInput = value;
  } else {
    currentInput += value;
  }
}

function handleOperation(value) {
  if (currentInput === "0") {
    return;
  }

  const inputValue = parseInt(currentInput);
  if (result === 0) {
    result = inputValue;
  } else {
    performOperation(inputValue);
  }

  previousOperator = value;

  currentInput = "0";
}

function performOperation(inputValue) {
  if (previousOperator === "+") {
    result += inputValue;
  } else if (previousOperator === "-") {
    result -= inputValue;
  } else if (previousOperator === "×") {
    result *= inputValue;
  } else {
    result /= inputValue;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      currentInput = "0";
      result = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      performOperation(parseInt(currentInput));
      previousOperator = null;
      currentInput = "" + result;
      result = 0;
      break;
    case "←":
      if (currentInput.length === 1) {
        currentInput = "0";
      } else {
        currentInput = currentInput.substring(0, currentInput.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleOperation(value);
      break;
  }
}

function updateDisplay() {
  display.innerText = currentInput;
}

function initializeCalculator() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      handleButtonClick(event.target.innerText);
    });
}

initializeCalculator();
});