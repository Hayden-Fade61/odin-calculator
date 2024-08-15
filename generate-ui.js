const SYMBOLS = [
  ['(',')','%','AC'],
  [ '7', '8', '9', '\u00f7'], 
  [ '4', '5', '6', '\u00d7'], 
  [ '1', '2', '3', '\u002d'], 
  ['0', '.', '\u003d', '\u002b']
];
const SIZE = SYMBOLS.length;

document.addEventListener("DOMContentLoaded", () => {createCalc()}) // This event fires when page is done loading

function createCalc(){
  const ui = document.querySelector("#ui");
  SYMBOLS.forEach((row) => {
    const rowContainer = document.createElement("div");
    rowContainer.classList.toggle("button-row");
    createButtons(row, rowContainer);
    ui.appendChild(rowContainer);
  })
}

function createButtons(rowSymbols, container){
  rowSymbols.forEach((symbol) => {
    const button = document.createElement("button");
    button.classList.toggle("button");
    button.id = symbol;
    button.textContent = symbol;
    button.addEventListener("click", () => {
      console.log(button.textContent);
    });
    container.appendChild(button);
  });
}
