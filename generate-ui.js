const SYMBOLS = [
  ['(',')','%','AC'],
  [ '7', '8', '9', '\u00f7'], 
  [ '4', '5', '6', '\u00d7'], 
  [ '1', '2', '3', '\u002d'], 
  ['0', '.', '\u003d', '\u002b']
];
const SIZE = SYMBOLS.length;

document.addEventListener("DOMContentLoaded", () => {createCalculator()}) // This event fires when page is done loading

function createCalculator(){
  const ui = document.querySelector("#ui");
  SYMBOLS.forEach((row) => {
    const rowContainer = document.createElement("div");
    rowContainer.classList.toggle("button-row");
    createButtons(row, rowContainer);
    ui.appendChild(rowContainer);
  })
  addEvents();
}

function createButtons(rowSymbols, container){
  rowSymbols.forEach((symbol) => {
    const button = document.createElement("button");
    button.classList.toggle("button");
    button.id = symbol;
    button.textContent = symbol;
    container.appendChild(button);
  });
}

function addEvents(){
  const buttons = document.querySelectorAll(".button");
  const inputDisplay = document.querySelector("#current-input"); // Arrow functions use parent scope
  const prevDisplay = document.querySelector("#previous-input");
  buttons.forEach((button) => {
    switch (button.textContent){
      // Clear display
      case ('AC'):
        button.addEventListener("click", () => {
          inputDisplay.textContent = "";
          prevDisplay.textContent = "";
        });
        break;
      // Equals
      case ('\u003d'):
        button.addEventListener("click", () => {
          prevDisplay.textContent = inputDisplay.textContent;
          inputDisplay.textContent = parseInput(inputDisplay.textContent);
        });
        break;
      // Every other button
        default:
        button.addEventListener("click", () => {
          inputDisplay.textContent += button.textContent + " ";
        });
        break;
    }
  });
}
