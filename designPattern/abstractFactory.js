// ============================================
// Component Interface: Car
// ============================================
class Car {
    model = '';  // declare before use
    price = 0;
  
    constructor(model, price) {
      if (new.target === Car) {
        throw new Error('Car is an interface and cannot be instantiated directly.');
      }
      this.model = model;
      this.price = price;
    }
  
    getDetails() {
      throw new Error('getDetails() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Products
  // ============================================
  class LuxuryCar extends Car {
    constructor(model, price) {
      super(model, price);
    }
  
    getDetails() {
      return `Luxury Car → Model: ${this.model}, Price: $${this.price}`;
    }
  }
  
  class SportCar extends Car {
    constructor(model, price) {
      super(model, price);
    }
  
    getDetails() {
      return `Sport Car → Model: ${this.model}, Price: $${this.price}`;
    }
  }
  
  class NormalCar extends Car {
    constructor(model, price) {
      super(model, price);
    }
  
    getDetails() {
      return `Normal Car → Model: ${this.model}, Price: $${this.price}`;
    }
  }
  
  // ============================================
  // Abstract Factory Interface: CarFactory
  // ============================================
  class CarFactory {
    createCar(model, price) {
      throw new Error('createCar() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Factories
  // ============================================
  class LuxuryCarFactory extends CarFactory {
    createCar(model, price) {
      return new LuxuryCar(model, price);
    }
  }
  
  class SportCarFactory extends CarFactory {
    createCar(model, price) {
      return new SportCar(model, price);
    }
  }
  
  class NormalCarFactory extends CarFactory {
    createCar(model, price) {
      return new NormalCar(model, price);
    }
  }
  
  // ============================================
  // Factory Producer: Chooses Factory by Price
  // ============================================
  class CarFactoryProducer {
    static getFactory(price) {
      if (price > 100_000) {
        return new LuxuryCarFactory();
      }
      if (price > 50_000) {
        return new SportCarFactory();
      }
      return new NormalCarFactory();
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  const car1 = CarFactoryProducer
    .getFactory(120_000)
    .createCar('Mercedes S-Class', 120_000);
  console.log(car1.getDetails());
  // → Luxury Car → Model: Mercedes S-Class, Price: $120000
  
  const car2 = CarFactoryProducer
    .getFactory(80_000)
    .createCar('Porsche 911', 80_000);
  console.log(car2.getDetails());
  // → Sport Car → Model: Porsche 911, Price: $80000
  
  const car3 = CarFactoryProducer
    .getFactory(30_000)
    .createCar('Toyota Corolla', 30_000);
  console.log(car3.getDetails());
  // → Normal Car → Model: Toyota Corolla, Price: $30000
  