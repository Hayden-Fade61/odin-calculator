/* Input parsing for calculator handled here */

function parseInput(expression){
  // Clean off whitespace
  // Throw error 2 if any illegal characters
  // Reverse final string for left to right rule
  const ILLEGAL_CHARACTERS = /[^\d\(\)+\-*/.%]/
  const IMPROPER_OPERATOR_REGEX = /[/*]{2,}/
  try {
    if (expression == "") throw "ERROR: No input";
    expression = expression.replaceAll(/\s/g, "");
    expression = expression.replaceAll('\u00f7', '/');
    expression = expression.replaceAll('\u00d7', '*');
    if (!validParentheses(expression)) throw "Syntax Error";
    if (ILLEGAL_CHARACTERS.test(expression)) throw "Syntax Error";
    if (IMPROPER_OPERATOR_REGEX.test(expression)) throw "Syntax Error";
    return evaluate(expression.split(/(?=[+-/*]) | (?<=[+-/*])/g).reverse().join('')); // Lookarounds are goated
  } 
  catch (error) {
    return error;
  }
}

function validParentheses(expression) {
  let stack = [];
  for(let i = 0; i < expression.length; i++){
    console.log(stack);
    console.log(expression[i]);
    if (expression[i] == '(') {
      stack.unshift('(');
    }
    else if (expression[i] == ')' && stack.shift() == undefined) {
      console.log("False");
      return false
    }
  }
  console.log(stack);
  return stack.length == 0;
}