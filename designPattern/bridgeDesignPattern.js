// Implementor Interface: Color
class Color {
    applyColor(shapeType) {
      throw new Error('applyColor() must be implemented by subclass.');
    }
  }
  
  // Concrete Implementors
  class RedColor extends Color {
    applyColor(shapeType) {
      console.log(`Applying red color to ${shapeType}`);
    }
  }
  
  class BlueColor extends Color {
    applyColor(shapeType) {
      console.log(`Applying blue color to ${shapeType}`);
    }
  }
  
  // Abstraction: Shape
  class Shape {
    colorImplementor = null;
  
    constructor(colorImplementor) {
      if (!(colorImplementor instanceof Color)) {
        throw new Error('A valid Color implementor must be provided.');
      }
      this.colorImplementor = colorImplementor;
    }
  
    draw() {
      throw new Error('draw() must be implemented by subclass.');
    }
  }
  
  // Refined Abstractions
  class Circle extends Shape {
    radius = 0;
  
    constructor(radius, colorImplementor) {
      super(colorImplementor);
      this.radius = radius;
    }
  
    draw() {
      console.log(`Drawing Circle of radius ${this.radius}`);
      this.colorImplementor.applyColor('Circle');
    }
  }
  
  class Square extends Shape {
    side = 0;
  
    constructor(side, colorImplementor) {
      super(colorImplementor);
      this.side = side;
    }
  
    draw() {
      console.log(`Drawing Square of side ${this.side}`);
      this.colorImplementor.applyColor('Square');
    }
  }
  
  // Client Code
  const red = new RedColor();
  const blue = new BlueColor();
  
  const redCircle = new Circle(5, red);
  redCircle.draw();
  // → Drawing Circle of radius 5
  // → Applying red color to Circle
  
  const blueSquare = new Square(10, blue);
  blueSquare.draw();
  // → Drawing Square of side 10
  // → Applying blue color to Square
  
  const blueCircle = new Circle(7, blue);
  blueCircle.draw();
  // → Drawing Circle of radius 7
  // → Applying blue color to Circle
  