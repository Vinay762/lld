// ============================================
// Flyweight Pattern: Robot Factory in JavaScript
// ============================================

// Represents a lightweight graphic element (intrinsic state)
class Sprites {
    // sprite data would go here
  }
  
  // “Interface” for robots
  class IRobot {
    display(x, y) {
      throw new Error('display() must be implemented by subclass.');
    }
  }
  
  // Concrete Flyweights
  class HumanoidRobot extends IRobot {
    type = ''; 
    body = null;
  
    constructor(type, body) {
      super();
      this.type = type;
      this.body = body;
    }
  
    display(x, y) {
      console.log(`Displaying ${this.type} at (${x}, ${y}) with sprites:`, this.body);
    }
  }
  
  class RoboticDog extends IRobot {
    type = '';
    body = null;
  
    constructor(type, body) {
      super();
      this.type = type;
      this.body = body;
    }
  
    display(x, y) {
      console.log(`Displaying ${this.type} at (${x}, ${y}) with sprites:`, this.body);
    }
  }
  
  // Factory (flyweight factory) that reuses robot instances
  class RoboticFactory {
    static roboticObjectCache = new Map();
  
    static createRobot(robotType) {
      if (RoboticFactory.roboticObjectCache.has(robotType)) {
        return RoboticFactory.roboticObjectCache.get(robotType);
      }
  
      let robot = null;
      if (robotType === 'HUMANOID') {
        const humanoidSprite = new Sprites();
        robot = new HumanoidRobot(robotType, humanoidSprite);
      } else if (robotType === 'ROBOTICDOG') {
        const dogSprite = new Sprites();
        robot = new RoboticDog(robotType, dogSprite);
      } else {
        return null;
      }
  
      RoboticFactory.roboticObjectCache.set(robotType, robot);
      return robot;
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  const humanoid1 = RoboticFactory.createRobot('HUMANOID');
  humanoid1.display(1, 2);
  
  const humanoid2 = RoboticFactory.createRobot('HUMANOID');
  humanoid2.display(10, 30);
  
  const roboDog1 = RoboticFactory.createRobot('ROBOTICDOG');
  roboDog1.display(2, 9);
  
  const roboDog2 = RoboticFactory.createRobot('ROBOTICDOG');
  roboDog2.display(11, 19);
  
  // Verify that the same flyweight instances are reused
  console.log('humanoid1 === humanoid2:', humanoid1 === humanoid2); // true
  console.log('roboDog1 === roboDog2:', roboDog1 === roboDog2);       // true
  