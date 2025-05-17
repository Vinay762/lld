// Strategy Pattern Example: Vehicle Driving Strategies in a Single File

// ============================================
// Strategy Interface
// ============================================
class DriveStrategy {
    drive() {
      throw new Error('drive() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Strategies
  // ============================================
  class NormalDriveStrategy extends DriveStrategy {
    drive() {
      console.log('Driving normally on paved roads.');
    }
  }
  
  class SpecialDriveStrategy extends DriveStrategy {
    drive() {
      console.log('Driving with special capabilities (4WD, low gear, enhanced traction).');
    }
  }
  
  // ============================================
  // Context: Vehicle
  // ============================================
  class Vehicle {
    driveStrategy = null;  // declare before use
  
    /**
     * @param {DriveStrategy} driveStrategy
     */
    constructor(driveStrategy) {
      this.setDriveStrategy(driveStrategy);
    }
  
    setDriveStrategy(driveStrategy) {
      if (!driveStrategy || typeof driveStrategy.drive !== 'function') {
        throw new Error('A valid DriveStrategy must be provided.');
      }
      this.driveStrategy = driveStrategy;
    }
  
    drive() {
      this.driveStrategy.drive();
    }
  }
  
  // ============================================
  // Concrete Contexts: Different Vehicle Types
  // ============================================
  class OffRoadVehicle extends Vehicle {
    terrainType = 'rough'; // declare before use
  }
  
  class PassengerVehicle extends Vehicle {
    passengerCapacity = 5; // declare before use
  }
  
  // ============================================
  // Client Code: Using the Strategies
  // ============================================
  
  // 1. Declare and initialize strategies
  const normalDrive = new NormalDriveStrategy();
  const specialDrive = new SpecialDriveStrategy();
  
  // 2. Off-Road Vehicle using Normal Drive
  const offRoadVehicle = new OffRoadVehicle(normalDrive);
  offRoadVehicle.drive();  
  // → Driving normally on paved roads.
  
  // 3. Switch Off-Road Vehicle to Special Drive at runtime
  offRoadVehicle.setDriveStrategy(specialDrive);
  offRoadVehicle.drive();  
  // → Driving with special capabilities (4WD, low gear, enhanced traction).
  
  // 4. Passenger Vehicle using Normal Drive
  const passengerVehicle = new PassengerVehicle(normalDrive);
  passengerVehicle.drive();  
  // → Driving normally on paved roads.
  