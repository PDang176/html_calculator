import { shunting_yard, evaluate_rpn } from "./helpers/shunting_yard.js";

const container = document.getElementById("buttons");
const buttons = container.querySelectorAll(".symbol");
const clearButton = container.querySelector(".clear");
const clearAllButton = container.querySelector(".clearAll");
const equalsButton = container.querySelector(".eq-btn");

const display = document.getElementById("display");
const prevDisplay = display.querySelector("#prev");
const currentDisplay = display.querySelector("#current");

let clearFirst = false;

const handleButtonClick = (event) => {
  const symbol = event.target.textContent;

  if (clearFirst) {
    currentDisplay.textContent = "";
    clearFirst = false;
  }

  currentDisplay.textContent += symbol;

  equalsButton.disabled = false;
};

const handleClearClick = () => {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);

  if (currentDisplay.textContent.length === 0) {
    equalsButton.disabled = true;
  }
};

const handleClearAllClick = () => {
  currentDisplay.textContent = "";

  equalsButton.disabled = true;
};

const handleEqualsClick = () => {
  try {
    const expression = currentDisplay.textContent;
    prevDisplay.textContent = expression + "=";

    const regex = /([a-zA-Z_]\w*(?=\s*\()|\d+\.\d+|\d+|[\+\-\*\/\(\)\^])/g;
    const tokens = expression.match(regex);

    const rpn = shunting_yard(tokens);
    console.log(rpn);
    const result = evaluate_rpn(rpn);

    currentDisplay.textContent = result;
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
