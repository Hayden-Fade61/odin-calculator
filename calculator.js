const DIVIDE = '\u00f7';
const MULTIPLY = '\u00d7';
const SYMBOLS = [
  ['(',')','%','AC'],
  [ '7', '8', '9', DIVIDE], 
  [ '4', '5', '6', MULTIPLY], 
  [ '1', '2', '3', '-'], 
  ['0', '.', '=', '+']
];
const SIZE = SYMBOLS.length;
const OPERATORS = /[-+*\/%]/;
let previous;
let answer; 

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
  buttons.forEach((button) => {
    switch (button.textContent){
      // Clear display
      case ('AC'):
        button.addEventListener("click", () => {
          displays = document.querySelectorAll(".display");
          displays.forEach((display) => {
            display.textContent = "";
          });
        });
        // Figure out how to make a mutation observer make this a CE button
        break;
      // Equals
      case ('='):
        button.addEventListener("click", () => {
          input = document.querySelector("#current-input");
          previous = answer;
          answer = calculate(input.textContent); 
          display(answer);
        });
        break;
      // Every other button
        default:
        button.addEventListener("click", () => {
          display(button.textContent);
        });
        break;
    }
  });
}

function display(text){
  const inputDisplay = document.querySelector("#current-input");
  const prevDisplay = document.querySelector("#previous-input");
  inputDisplay.textContent += text;
}

function calculate(expression){
  if (expression == "") return "";
  // Format and check input
  expression = replaceSymbols(expression);
  let inputValid = checkInput(expression);
  if (inputValid != "Valid") return inputValid;
  expression = parseExpression(expression);
  return evaluate(expression); // Implement this
}

/* Input parsing for calculator handled here */
function parseExpression(expression){
  console.log(`Parser for ${expression}`);
  // Parsing
  if (expression[0] == '(') {
    expression = stripOuterBrackets(expression);
  }
  let parsedExpression = [];
  let readNum = readNumber(expression, 0); // First number
  let i;
  if (isNaN(readNum[0])){
    i = 0;
    parsedExpression.push(0);
  }
  else{
    parsedExpression.push(readNum[0]);
    i = readNum[1];
  }
  for (i; i < expression.length; i++){
    // If operator after string start, read the number before the operator
    if (OPERATORS.test((expression[i]))){
      parsedExpression.push(expression[i]);
      // Parse inner expression if ( is next
      if (expression[i+1] == '(') continue;
      // Otherwise, attempt to read  a number
      else{
        readNum = readNumber(expression, i+1);
        parsedExpression.push(readNum[0]);
        i = readNum[1];
      }
    }
    // If we encounter an opening bracket, parse expression within brackets
    else if (expression[i] == '('){
      let j = i+1;
      let count = 1;
      for (j; j<expression.length; j++){
        if (expression[j] == '(') count++;
        else if (expression[j] == ')') count--;
        if (count == 0) break;
      }
      let innerExpression = parseExpression(expression.slice(i+1, j));
      parsedExpression.push(innerExpression);
      i = j;
    }
  }
  return parsedExpression;
}

function stripOuterBrackets(expr){
  exprArr = [...expr];
  let j;
  console.log(exprArr);
  console.log(j);
  while(expr[0] == '(' && expr[exprArr.length - 1] == ')'){
    exprArr.splice(0, 1);
    exprArr.splice(exprArr.length - 1, 1);
    console.log(exprArr);
  }
  return exprArr.join('');
}

function readNumber(string, startIndex){
  let result = []
  let end = /[\-+]/.test(string[startIndex]) ? startIndex+1: startIndex;
  const NUM_SYMBOLS = /[.\d]/; 
  while(end < string.length && NUM_SYMBOLS.test(string[end])) end++;
  result.push(Number.parseFloat(string.slice(startIndex, end)));
  result.push(end - 1); // Last char in this number
  return result;
}

function replaceSymbols(expression){
  expression = expression.replaceAll(/\s/g, "");
  expression = expression.replaceAll('\u00f7', '/');
  expression = expression.replaceAll('\u00d7', '*');
  return expression;
}

function checkInput(expression) {
try {
const ILLEGAL_CHARACTERS = /[^\d\(\)+\-*/.%]/;
const IMPROPER_OPERATOR_USE = /([%/*]{2,})|(^[/*%])|([+\-*/.%]$)|([+-][*/])/;
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
function evaluate(expr){
  const OPERATOR_ORDER = ['*', '/', '%', '+', '-'];
  let i;
  let result;
  console.log(expr);
  OPERATOR_ORDER.forEach((operator) => {
    // Collapse array into final result
    for (i = 0; i < expr.length; i++){
      if (expr[i] == operator){
        if (Array.isArray(expr[i-1])){
          expr[i-1] = evaluate(expr[i-1]);
          if (expr[i-1] == "Math Error") return "Math Error";
        }
        if (Array.isArray(expr[i+1])){
          expr[i+1] = evaluate(expr[i+1]);
          if (expr[i+1] == "Math Error") return "Math Error";
        }
        result = operate(expr[i], expr[i-1], expr[i+1]);
        expr[--i] = result;
        expr.splice(i+1, 2);
      }
    }
  });
  return expr.length == 1 ? expr[0] : "Math Error";
}

function operate(operator, a, b){
  switch (operator){
    case ('*'):
      return multiply(a, b);
    case ('/'):
      return divide(a, b);
    case ('%'):
      return modulo(a, b);
    case ('+'):
      return add(a, b);
    case ('-'):
      return subtract(a, b);
    default:
      return "Math Error";
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
