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
          inputDisplay.textContent += button.textContent;
        });
        break;
    }
  });
}

/* Input parsing for calculator handled here */

function parseInput(expression){
  if (expression == "") return "";
  // Format and check input
  expression = expression.replaceAll(/\s/g, "");
  expression = expression.replaceAll('\u00f7', '/');
  expression = expression.replaceAll('\u00d7', '*');
  let inputValid = checkInput(expression);
  if (inputValid != "Valid") return inputValid;
  // Reverse final string for left to right rule
  let parsedExpression = expression.split(/([+-/*%])/g);
  parsedExpression = formatDecimals(parsedExpression);
  if (parsedExpression = "Syntax Error") return parsedExpression;
  parsedExpression = formatNegatives(parsedExpression);
  if (parsedExpression = "Syntax Error") return parsedExpression;
  return operate(parsedExpression);
}

function checkInput(expression) {
try {
const ILLEGAL_CHARACTERS = /[^\d\(\)+\-*/.%]/;
const IMPROPER_OPERATOR_USE = /([/*]{2,})|(^[/*%])|([+\-*/.%]$)|([+-][*/])/;
if(!/\d/.test(expression)) throw "Syntax Error";
if (ILLEGAL_CHARACTERS.test(expression)) throw "Syntax Error";
if (IMPROPER_OPERATOR_USE.test(expression)) throw "Syntax Error";
if (!validParentheses(expression)) throw "Syntax Error";
return "Valid";
}
catch (error) {
  return error;
}
}

function validParentheses(expression){
let stack = [];
for(let i = 0; i < expression.length; i++){
  if (expression[i] == '(') {
    stack.unshift('(');
  }
  else if (expression[i] == ')' && stack.shift() == undefined){
    return false;
  }
}
return stack.length == 0;
}

function formatDecimals(expression){
  for(let i=0; i<expression.length; i++){
    if(expression[i] == '.'){
      let whole = "";
      let fraction = "";
      let isNotArrayStart = i - 1 >= 0;
      let partsCount = 1;
      let newNumPosition = i;
      if (isNotArrayStart && !isNaN(expression[i-1])){
        whole = expression[i-1];
        partsCount++;
        newNumPosition = i-1;
      }
      if (i+1 <= expression.length && !isNaN(expression[i+1])){
        fraction =  expression[i+1];
        partsCount++;
        console.log(fraction);
      }
      let newNum = whole + '.' + fraction;
      console.log(newNumPosition);
      if (newNum != '.') expression.splice(newNumPosition, partsCount, newNum);
      else return "Syntax Error";
      console.log(expression);
      i = newNumPosition;
    }
  }
  return expression;
} 
 // Implement me!
function formatNegatives(expression){
  for(let i=0; i<expression.length; i++){
    if(expression[i] == '-'){
      if (i - 1 >= 0 && isNaN(expression[i-1])){
        whole = expression[i-1];
      }
      if (i + 1 <= expression.length && !isNaN(expression[i+1])){
        fraction =  expression[i+1];
      }
      let newNum = whole + '.' + fraction;
      expression.splice(i-1, 3, newNum);
    }
  }
}

function operate(expression){
  console.log(expression);
}

const evaluate = function(expression){
  /* Parse string into a numeric calculation
  * Use order of operations to find what to parse first PEMDAS/BODMAS 
  */
  if (expression.includes("Math Error")) return "Math Error";
  const OPERATOR_ORDER = ['%', '+', '-' ,'/', '*'];
    // When we evaluate a number, return that int
  let num = Number.parseFloat(expression);
  if(expression == num){
    return num;
  }
  // When we evaluate an expression, return lowest priority operation
  else{
    let evalOperator;
    let operatorPosition; 
    OPERATOR_ORDER.every((operator) => {
      evalOperator = operator;
      operatorPosition = expression.lastIndexOf(operator);
      return !(operatorPosition != -1);
    });
    let firstTerm = expression.slice(0, operatorPosition);
    let secondTerm = expression.slice(operatorPosition + 1, expression.length);
    let identity = evalOperator == '-' ? "0" : "1";
    switch(evalOperator){
      case '-':
        return subtract(
          evaluate(firstTerm), 
          evaluate(secondTerm)
      );
      case '+':
        return add(
          evaluate(firstTerm), 
          evaluate(secondTerm)
      );
      case '/':
        return divide(
          evaluate(firstTerm), 
          evaluate(secondTerm)
      );
      case '*':
        return multiply(
          evaluate(firstTerm), 
          evaluate(secondTerm)
      );
      case '%':
        return modulo(
          evaluate(firstTerm), 
          evaluate(secondTerm)
      );
      default:
        break;
    }
  }
}

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a* b;
};

const divide  = function (a, b) {
  if (a < 0 || b == 0) return "Math Error";
  return a / b;
}

const power = function (a, b) {
  return Math.pow(a, b);
};

const modulo = function (a, b){
  return a % b;
}

const factorial = function (n) {
  if (n === 0) return 1;
  let product = 1;
  for (let i = n; i > 0; i--) {
    product *= i;
  }
  return product;
};
