// ============================================
// Visitor Pattern: Hotel Room Example in JavaScript
// ============================================

// --------------------------------------------
// Element Interface
// --------------------------------------------
class RoomElement {
    accept(visitor) {
      throw new Error('accept() must be implemented by subclass');
    }
  }
  
  // --------------------------------------------
  // Concrete Elements
  // --------------------------------------------
  class SingleRoom extends RoomElement {
    roomPrice = 0;
  
    accept(visitor) {
      visitor.visitSingleRoom(this);
    }
  }
  
  class DoubleRoom extends RoomElement {
    roomPrice = 0;
  
    accept(visitor) {
      visitor.visitDoubleRoom(this);
    }
  }
  
  class DeluxeRoom extends RoomElement {
    roomPrice = 0;
  
    accept(visitor) {
      visitor.visitDeluxeRoom(this);
    }
  }
  
  // --------------------------------------------
  // Visitor Interface
  // --------------------------------------------
  class RoomVisitor {
    visitSingleRoom(singleRoom) {
      throw new Error('visitSingleRoom() must be implemented by subclass');
    }
    visitDoubleRoom(doubleRoom) {
      throw new Error('visitDoubleRoom() must be implemented by subclass');
    }
    visitDeluxeRoom(deluxeRoom) {
      throw new Error('visitDeluxeRoom() must be implemented by subclass');
    }
  }
  
  // --------------------------------------------
  // Concrete Visitors
  // --------------------------------------------
  class RoomPricingVisitor extends RoomVisitor {
    visitSingleRoom(singleRoom) {
      console.log('Pricing SingleRoom');
      singleRoom.roomPrice = 1000;
    }
    visitDoubleRoom(doubleRoom) {
      console.log('Pricing DoubleRoom');
      doubleRoom.roomPrice = 2000;
    }
    visitDeluxeRoom(deluxeRoom) {
      console.log('Pricing DeluxeRoom');
      deluxeRoom.roomPrice = 5000;
    }
  }
  
  class RoomMaintenanceVisitor extends RoomVisitor {
    visitSingleRoom(singleRoom) {
      console.log('Maintaining SingleRoom');
    }
    visitDoubleRoom(doubleRoom) {
      console.log('Maintaining DoubleRoom');
    }
    visitDeluxeRoom(deluxeRoom) {
      console.log('Maintaining DeluxeRoom');
    }
  }
  
  // --------------------------------------------
  // Client Code
  // --------------------------------------------
  const singleRoom  = new SingleRoom();
  const doubleRoom  = new DoubleRoom();
  const deluxeRoom  = new DeluxeRoom();
  
  // Perform pricing
  const pricingVisitor     = new RoomPricingVisitor();
  singleRoom.accept(pricingVisitor);
  doubleRoom.accept(pricingVisitor);
  deluxeRoom.accept(pricingVisitor);
  
  console.log('SingleRoom price:', singleRoom.roomPrice);
  console.log('DoubleRoom price:', doubleRoom.roomPrice);
  console.log('DeluxeRoom price:', deluxeRoom.roomPrice);
  
  // Perform maintenance
  const maintenanceVisitor = new RoomMaintenanceVisitor();
  singleRoom.accept(maintenanceVisitor);
  doubleRoom.accept(maintenanceVisitor);
  deluxeRoom.accept(maintenanceVisitor);
  