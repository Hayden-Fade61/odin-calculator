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

const calculate = function(expression){
  // Parse string into a numeric calculation
  /* Use order of operations to find what to parse first
      PEMDAS/BODMAS with ! being equivalent to an exponent */
  // Let's go with the simplest case and build up: 1+1
  // Interpret 1+1 as add(calculate(1), calculate(1)) ...Nuuuu dynamic programming!
  // When we calculate() just a number, return that int
  // When we calculate() an expression, return lowest priority operation
  // Hopefully this isnt too bad of a soln lol
  let num = Number.parseFloat(expression);
  if(expression == num){
    return num;
  }
  else{
    console.log(expression);
  }
}