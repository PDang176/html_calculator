const container = document.getElementById("buttons");
const buttons = container.querySelectorAll(".symbol");
const clearButton = container.querySelector(".clear");
const clearAllButton = container.querySelector(".clearAll");
const equalsButton = container.querySelector(".eq-btn");

const display = document.getElementById("display");
const prevDisplay = display.querySelector("#prev");
const currentDisplay = display.querySelector("#current");

const handleButtonClick = (event) => {
  const symbol = event.target.textContent;
  currentDisplay.textContent += symbol;
};

const handleClearClick = () => {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
};

const handleClearAllClick = () => {
  currentDisplay.textContent = "";
};

const handleEqualsClick = () => {
  try {
    const expression = currentDisplay.textContent;
    const result = eval(expression.replaceAll("x", "*"));
    prevDisplay.textContent = expression + "=";
    currentDisplay.textContent = result;
  } catch (error) {
    currentDisplay.textContent = "Error";
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

clearButton.addEventListener("click", handleClearClick);
clearAllButton.addEventListener("click", handleClearAllClick);
equalsButton.addEventListener("click", handleEqualsClick);
