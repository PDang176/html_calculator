import {
  shunting_yard,
  evaluate_rpn,
  operators,
} from "./helpers/shunting_yard.js";

const container = document.getElementById("buttons");
const buttons = container.querySelectorAll(".symbol");
const clearButton = container.querySelector(".clear");
const clearAllButton = container.querySelector(".clearAll");
const equalsButton = container.querySelector(".eq-btn");
const answerButton = container.querySelector(".answer");
const plusMinusButton = container.querySelector(".plusMinus");

const display = document.getElementById("display");
const prevDisplay = display.querySelector("#prev");
const currentDisplay = display.querySelector("#current");

let clearFirst = false;
let ans;

const formatNumber = (num) => {
  let formatted = num.toFixed(3);

  formatted = formatted.replace(/\.?0+$/, "");

  return formatted;
};

const handleClearFirst = () => {
  if (clearFirst) {
    prevDisplay.textContent =
      ans !== undefined ? `Ans = ${formatNumber(ans)}` : "";
    currentDisplay.textContent = "";
    clearFirst = false;
  }
};

const handleButtonClick = (event) => {
  let symbol = event.target.textContent;

  handleClearFirst();

  if (symbol in operators) {
    if (currentDisplay.textContent.length === 0) {
      currentDisplay.textContent += ans;
    }
    if (currentDisplay.textContent.slice(-1) in operators) {
      currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    }
  }

  if (symbol === ".") {
    if (
      currentDisplay.textContent.length === 0 ||
      currentDisplay.textContent.slice(-1) in operators
    ) {
      currentDisplay.textContent += "0";
    }

    if (currentDisplay.textContent.slice(-1) === ".") {
      return;
    }

    let regex = /(\d+(\.\d+)?)\s*$/;
    let match = currentDisplay.textContent.match(regex);
    if (match && match[1].includes(".")) {
      return;
    }
  }

  currentDisplay.textContent += symbol;
  equalsButton.disabled = false;
};

const handleAnswerClick = () => {
  if (ans === undefined) {
    return;
  }
  handleClearFirst();
  if (
    currentDisplay.textContent.length === 0 ||
    currentDisplay.textContent.slice(-1) in operators
  ) {
    currentDisplay.textContent += ans;
    equalsButton.disabled = false;
  }
};

const handlePlusMinusClick = () => {
  let regex = /(?<=^|[+\-*/(])(-?\d+(?:\.\d+)?)$/;
  let match = currentDisplay.textContent.match(regex);
  if (match) {
    let number = match[0];
    let toggledNumber = number.startsWith("-") ? number.slice(1) : `-${number}`;
    currentDisplay.textContent = currentDisplay.textContent.replace(
      regex,
      toggledNumber,
    );
  }
};

const handleClearClick = () => {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);

  handleClearFirst();

  if (currentDisplay.textContent.length === 0) {
    equalsButton.disabled = true;
  }
};

const handleClearAllClick = () => {
  handleClearFirst();

  currentDisplay.textContent = "";
  equalsButton.disabled = true;
};

const handleEqualsClick = () => {
  try {
    let expression = currentDisplay.textContent;
    prevDisplay.textContent = expression + "=";

    let regex =
      /(?<=^|[\+\-\*\/\(\^])-\d+(?:\.\d+)?|\d+(?:\.\d+)?|[\+\-\*\/\(\)\^]/g;
    let tokens = expression.match(regex);

    let rpn = shunting_yard(tokens);
    let result = evaluate_rpn(rpn);

    currentDisplay.textContent = result;
    ans = result;
  } catch (error) {
    currentDisplay.textContent = "Error";
    console.log(error);
  } finally {
    equalsButton.disabled = true;
    clearFirst = true;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

clearButton.addEventListener("click", handleClearClick);
clearAllButton.addEventListener("click", handleClearAllClick);
equalsButton.addEventListener("click", handleEqualsClick);
answerButton.addEventListener("click", handleAnswerClick);
plusMinusButton.addEventListener("click", handlePlusMinusClick);
