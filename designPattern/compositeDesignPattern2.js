const Operation = Object.freeze({
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE'
  });
  
  class ArithmeticExpression {
    evaluate() {
      throw new Error('evaluate() must be implemented by subclass.');
    }
  }
  
  class NumberExpression extends ArithmeticExpression {
    value = 0;
  
    constructor(value) {
      super();
      this.value = value;
    }
  
    evaluate() {
      console.log(`Number value is :${this.value}`);
      return this.value;
    }
  }
  
  class Expression extends ArithmeticExpression {
    leftExpression = null;
    rightExpression = null;
    operation = null;
  
    constructor(leftExpression, rightExpression, operation) {
      super();
      this.leftExpression = leftExpression;
      this.rightExpression = rightExpression;
      this.operation = operation;
    }
  
    evaluate() {
      let value = 0;
      switch (this.operation) {
        case Operation.ADD:
          value = this.leftExpression.evaluate() + this.rightExpression.evaluate();
          break;
        case Operation.SUBTRACT:
          value = this.leftExpression.evaluate() - this.rightExpression.evaluate();
          break;
        case Operation.MULTIPLY:
          value = this.leftExpression.evaluate() * this.rightExpression.evaluate();
          break;
        case Operation.DIVIDE:
          value = this.leftExpression.evaluate() / this.rightExpression.evaluate();
          break;
        default:
          throw new Error(`Unknown operation: ${this.operation}`);
      }
      console.log(`Expression value is :${value}`);
      return value;
    }
  }
  
  // Client code
  
  const two = new NumberExpression(2);
  const one = new NumberExpression(1);
  const seven = new NumberExpression(7);
  
  const addExpression = new Expression(one, seven, Operation.ADD);
  const parentExpression = new Expression(two, addExpression, Operation.MULTIPLY);
  
  const result = parentExpression.evaluate();
  console.log(result);
  