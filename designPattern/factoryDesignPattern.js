// ============================================
// "Interface": Shape
// ============================================
class Shape {
    draw() {
      throw new Error('draw() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Shapes
  // ============================================
  class Circle extends Shape {
    constructor() {
      super();
    }
  
    draw() {
      console.log('Drawing a Circle');
    }
  }
  
  class Square extends Shape {
    constructor() {
      super();
    }
  
    draw() {
      console.log('Drawing a Square');
    }
  }
  
  class Rectangle extends Shape {
    constructor() {
      super();
    }
  
    draw() {
      console.log('Drawing a Rectangle');
    }
  }
  
  // ============================================
  // ShapeFactory
  // ============================================
  class ShapeFactory {
    /**
     * Create and return a Shape instance based on `type`.
     * @param {string} type  One of: 'circle', 'square', 'rectangle'
     * @returns {Shape}
     */
    static createShape(type) {
      let shape = null; // class-local variable
  
      switch (type.toLowerCase()) {
        case 'circle':
          shape = new Circle();
          break;
        case 'square':
          shape = new Square();
          break;
        case 'rectangle':
          shape = new Rectangle();
          break;
        default:
          throw new Error(`Unknown shape type: ${type}`);
      }
  
      return shape;
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  // Directly call the static factory method—no extra declarations needed:
  const circle    = ShapeFactory.createShape('circle');
  circle.draw();     // → Drawing a Circle
  
  const square    = ShapeFactory.createShape('square');
  square.draw();     // → Drawing a Square
  
  const rectangle = ShapeFactory.createShape('rectangle');
  rectangle.draw();  // → Drawing a Rectangle
  