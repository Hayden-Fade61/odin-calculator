/* Input parsing for calculator handled here */

function parseInput(expression){
  // Clean off whitespace
  // Throw error 2 if any illegal characters
  // Reverse final string for left to right rule
    if (expression == "") return "";
    expression = expression.replaceAll(/\s/g, "");
    expression = expression.replaceAll('\u00f7', '/');
    expression = expression.replaceAll('\u00d7', '*');
    let inputValid = checkInput(expression);
    if (inputValid != "Valid") return inputValid;
    return evaluate(expression.split(/(?=[+-/*%]) | (?<=[+-/*%])/g).reverse().join('')); // Lookarounds are goated
}

function checkInput(expression) {
 try {
  const ILLEGAL_CHARACTERS = /[^\d\(\)+\-*/.%]/
  const IMPROPER_OPERATOR_USE = /([/*]{2,})|(^[/*%])|([+\-*/.%]$)|([+-][*/])/ 
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
      return false
    }
  }
  return stack.length == 0;
}