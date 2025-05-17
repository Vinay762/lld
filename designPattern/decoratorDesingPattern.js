// ============================================
// Component Interface: BasePizza
// ============================================
class BasePizza {
    // No fields here; methods define the contract
    getDescription() {
      throw new Error('getDescription() must be implemented by subclass.');
    }
  
    cost() {
      throw new Error('cost() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Components
  // ============================================
  class VegDelight extends BasePizza {
    constructor() {
      super();
    }
  
    getDescription() {
      return 'Veg Delight Pizza';
    }
  
    cost() {
      return 100;
    }
  }
  
  class Margherita extends BasePizza {
    constructor() {
      super();
    }
  
    getDescription() {
      return 'Margherita Pizza';
    }
  
    cost() {
      return 120;
    }
  }
  
  // ============================================
  // Decorator Interface
  // ============================================
  class ToppingDecorator extends BasePizza {
    pizza = null;  // declare before use
  
    /**
     * @param {BasePizza} pizza
     */
    constructor(pizza) {
      super();
      this.pizza = pizza;
    }
  
    getDescription() {
      // default: delegate to wrapped pizza
      return this.pizza.getDescription();
    }
  
    cost() {
      // default: delegate to wrapped pizza
      return this.pizza.cost();
    }
  }
  
  // ============================================
  // Concrete Decorators
  // ============================================
  class ExtraCheese extends ToppingDecorator {
    constructor(pizza) {
      super(pizza);
    }
  
    getDescription() {
      return `${this.pizza.getDescription()}, Extra Cheese`;
    }
  
    cost() {
      return this.pizza.cost() + 18;
    }
  }
  
  class Mushroom extends ToppingDecorator {
    constructor(pizza) {
      super(pizza);
    }
  
    getDescription() {
      return `${this.pizza.getDescription()}, Mushroom`;
    }
  
    cost() {
      return this.pizza.cost() + 15;
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  // 1) Plain VegDelight
  let pizza = null;            // declare before using
  pizza = new VegDelight();
  console.log(`${pizza.getDescription()} => $${pizza.cost()}`);
  // Output: Veg Delight Pizza => $100
  
  // 2) VegDelight with Extra Cheese
  pizza = new ExtraCheese(pizza);
  console.log(`${pizza.getDescription()} => $${pizza.cost()}`);
  // Output: Veg Delight Pizza, Extra Cheese => $118
  
  // 3) VegDelight with Extra Cheese + Mushroom
  pizza = new Mushroom(pizza);
  console.log(`${pizza.getDescription()} => $${pizza.cost()}`);
  // Output: Veg Delight Pizza, Extra Cheese, Mushroom => $133
  
  // 4) Margherita with Mushroom only
  let anotherPizza = null;     // declare before using
  anotherPizza = new Margherita();
  anotherPizza = new Mushroom(anotherPizza);
  console.log(`${anotherPizza.getDescription()} => $${anotherPizza.cost()}`);
  // Output: Margherita Pizza, Mushroom => $135
  