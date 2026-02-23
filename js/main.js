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
