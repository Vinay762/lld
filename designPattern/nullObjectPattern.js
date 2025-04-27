// ============================================
// Null Object Pattern Example in JavaScript
// ============================================

// ============================================
// "Interface": Vehicle (abstract base class)
// ============================================
class Vehicle {
    // Declare class‐level fields
    tankCapacity = 0;
    seatingCapacity = 0;
  
    constructor() {
      if (new.target === Vehicle) {
        throw new Error('Vehicle is abstract and cannot be instantiated directly.');
      }
    }
  
    getTankCapacity() {
      throw new Error('getTankCapacity() must be implemented by subclass.');
    }
  
    getSeatingCapacity() {
      throw new Error('getSeatingCapacity() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Product: Car
  // ============================================
  class Car extends Vehicle {
    // Override class‐level fields
    tankCapacity = 40;
    seatingCapacity = 5;
  
    constructor() {
      super();
    }
  
    getTankCapacity() {
      return this.tankCapacity;
    }
  
    getSeatingCapacity() {
      return this.seatingCapacity;
    }
  }
  
  // ============================================
  // Null Object: NullVehicle
  // ============================================
  class NullVehicle extends Vehicle {
    // Override class‐level fields
    tankCapacity = 0;
    seatingCapacity = 0;
  
    constructor() {
      super();
    }
  
    getTankCapacity() {
      return this.tankCapacity;
    }
  
    getSeatingCapacity() {
      return this.seatingCapacity;
    }
  }
  
  // ============================================
  // Factory: VehicleFactory
  // ============================================
  class VehicleFactory {
    /**
     * Return a Vehicle instance based on type.
     * If no real type matches, returns NullVehicle.
     * @param {string} typeOfVehicle
     * @returns {Vehicle}
     */
    static getVehicleObject(typeOfVehicle) {
      if (typeOfVehicle === 'Car') {
        return new Car();
      }
      return new NullVehicle();
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  function printVehicleDetails(vehicle) {
    console.log('Seating Capacity: ' + vehicle.getSeatingCapacity());
    console.log('Fuel Tank Capacity: ' + vehicle.getTankCapacity());
  }
  
  const vehicle1 = VehicleFactory.getVehicleObject('Car');
  printVehicleDetails(vehicle1);
  // Seating Capacity: 5
  // Fuel Tank Capacity: 40
  
  const vehicle2 = VehicleFactory.getVehicleObject('Bike');
  printVehicleDetails(vehicle2);
  // Seating Capacity: 0
  // Fuel Tank Capacity: 0
  