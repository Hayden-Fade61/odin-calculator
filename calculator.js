const add = function (a, b) {
  console.log(a+b);
  return a + b;
};

const subtract = function (a, b) {
  console.log(a-b);
  return a - b;
};

const multiply = function (a, b) {
  console.log(a*b);
  return a* b;
};

const divide  = function (a, b) {
  console.log(a/b);
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

function parseInput(){

}

const calculate = function(expression){
  // Parse string into a numeric calculation
  /* Use order of operations to find what to parse first
      PEMDAS/BODMAS with ! being equivalent to an exponent */
  // Let's go with the simplest case and build up: 1+1
  // Interpret 1+1 as add(calculate(1), calculate(1)) ...Nuuuu dynamic programming!
  // Hopefully this isnt too bad of a soln lol
  // const OPERATOR_ORDER = ['+', '-' ,'\u00f7', '\u00d7'] // PEMDAS backwards
  const TESTING_OPERATOR_ORDER = ['+', '-' ,'/', '*']
    // When we calculate() just a number, return that int
  let num = Number.parseFloat(expression);
  if(expression == num){
    return num;
  }
  // When we calculate() an expression, return lowest priority operation
  else{
    let evalOperator;
    let operatorPosition; 
    TESTING_OPERATOR_ORDER.every((operator) => {
      evalOperator = operator;
      operatorPosition = expression.indexOf(operator);
      return !(operatorPosition != -1);
    });
    let firstTerm = expression.slice(0, operatorPosition);
    let secondTerm = expression.slice(operatorPosition + 1, expression.length);
    // firstTerm = expression.replace(firstTerm, calculate(firstTerm));
    // secondTerm = expression.replace(secondTerm, calculate(secondTerm));
    console.log(expression);
    console.log(evalOperator);
    console.log(firstTerm);
    console.log(secondTerm);
    switch(evalOperator){
      case '-':
        return subtract(
          calculate(firstTerm), 
          calculate(secondTerm)
      );
      case '+':
        return add(
          calculate(firstTerm), 
          calculate(secondTerm)
      );
      case '/':
        return divide(
          calculate(firstTerm), 
          calculate(secondTerm)
      );
      case '*':
        return multiply(
          calculate(firstTerm), 
          calculate(secondTerm)
      );
      default:
        break;
    }
  }
}

module.exports  = {
  calculate
}