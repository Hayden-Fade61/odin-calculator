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
  if (a <= 0 || b <= 0) return "Math Error";
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

const evaluate = function(expression){
  /* Parse string into a numeric calculation
  * Use order of operations to find what to parse first PEMDAS/BODMAS 
  */
  if (expression == "Math Error") return expression;
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
      operatorPosition = expression.indexOf(operator);
      return !(operatorPosition != -1);
    });
    let firstTerm = expression.slice(0, operatorPosition);
    let secondTerm = expression.slice(operatorPosition + 1, expression.length);
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
