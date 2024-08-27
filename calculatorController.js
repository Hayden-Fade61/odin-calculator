const calculator = require("calculator.js");

/* Input parsing for calculator handled here */

function parseInput(expression){
  // Clean off whitespace
  // Throw error 2 if any illegal characters
  // Reverse final string for calculation 
  const ILLEGAL_CHARACTERS = /[^\d\(\)+\-*/.%]/
  const IMPROPER_OPERATOR_REGEX = /[/+*-]{2,}/
  try {
    if (expression == "") throw "ERROR: No input";
    expression = expression.replaceAll(" ", "");
    expression = expression.replaceAll('\u00f7', '/');
    expression = expression.replaceAll('\u00d7', '*');
    if (ILLEGAL_CHARACTERS.test(expression)) throw "Syntax Error"
    if (IMPROPER_OPERATOR_REGEX.test(expression)) throw "Syntax Error"
    return evaluate(expression.split(/(?=[+-/*]) | (?<=[+-/*])/g).reverse().join('')); // Lookarounds are goated
  } 
  catch (error) {
    return error;
  }
}
