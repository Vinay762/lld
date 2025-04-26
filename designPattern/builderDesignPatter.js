// ============================================
// Product: House
// ============================================
class House {
    // Explicitly declare and initialize every part
    foundation = '';
    structure  = '';
    roof       = '';
    interior   = '';
  
    constructor() {
      // All fields start as empty strings
    }
  }
  
  // ============================================
  // Builder Interface: HouseBuilder
  // ============================================
  class HouseBuilder {
    // Declare the house under construction
    house = null;
  
    constructor() {
      this.reset();
    }
  
    // Start a fresh product
    reset() {
      this.house = new House();
    }
  
    buildFoundation() {
      throw new Error('buildFoundation() not implemented.');
    }
  
    buildStructure() {
      throw new Error('buildStructure() not implemented.');
    }
  
    buildRoof() {
      throw new Error('buildRoof() not implemented.');
    }
  
    furnishInterior() {
      throw new Error('furnishInterior() not implemented.');
    }
  
    // Return the finished product and prepare for next
    getHouse() {
      const finishedHouse = this.house;
      this.reset();
      return finishedHouse;
    }
  }
  
  // ============================================
  // Concrete Builder: Igloo
  // ============================================
  class IglooHouseBuilder extends HouseBuilder {
    constructor() {
      super(); // calls reset() via base constructor
    }
    buildFoundation() {
      this.house.foundation = 'Ice blocks foundation';
    }
    buildStructure() {
      this.house.structure = 'Ice dome structure';
    }
    buildRoof() {
      this.house.roof = 'Ice dome roof';
    }
    furnishInterior() {
      this.house.interior = 'Fur and seal skin rugs';
    }
  }
  
  // ============================================
  // Concrete Builder: Wooden
  // ============================================
  class WoodenHouseBuilder extends HouseBuilder {
    constructor() {
      super();
    }
    buildFoundation() {
      this.house.foundation = 'Wooden piles';
    }
    buildStructure() {
      this.house.structure = 'Wooden frame structure';
    }
    buildRoof() {
      this.house.roof = 'Wooden shingles roof';
    }
    furnishInterior() {
      this.house.interior = 'Wooden cabinets and hardwood floor';
    }
  }
  
  // ============================================
  // Concrete Builder: Stone
  // ============================================
  class StoneHouseBuilder extends HouseBuilder {
    constructor() {
      super();
    }
    buildFoundation() {
      this.house.foundation = 'Reinforced concrete foundation';
    }
    buildStructure() {
      this.house.structure = 'Stone brick walls';
    }
    buildRoof() {
      this.house.roof = 'Slate stone roof';
    }
    furnishInterior() {
      this.house.interior = 'Stone fireplace and granite countertops';
    }
  }
  
  // ============================================
  // Director: Orchestrates building steps
  // ============================================
  class HouseDirector {
    // builder is declared but not initialized until setBuilder()
    builder = null;
  
    setBuilder(builder) {
      if (!(builder instanceof HouseBuilder)) {
        throw new Error('Builder must extend HouseBuilder');
      }
      this.builder = builder;
    }
  
    // Minimal house: foundation + structure
    constructMinimalHouse() {
      this.builder.buildFoundation();
      this.builder.buildStructure();
    }
  
    // Full-featured house
    constructFullFeaturedHouse() {
      this.builder.buildFoundation();
      this.builder.buildStructure();
      this.builder.buildRoof();
      this.builder.furnishInterior();
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  const director = new HouseDirector();
  
  // 1. Build a minimal Igloo
  const iglooBuilder = new IglooHouseBuilder();
  director.setBuilder(iglooBuilder);
  director.constructMinimalHouse();
  const igloo = iglooBuilder.getHouse();
  console.log('Minimal Igloo:', igloo);
  
  // 2. Build a fully featured Wooden house
  const woodBuilder = new WoodenHouseBuilder();
  director.setBuilder(woodBuilder);
  director.constructFullFeaturedHouse();
  const woodenHouse = woodBuilder.getHouse();
  console.log('Full Wooden House:', woodenHouse);
  
  // 3. Build a fully featured Stone house
  const stoneBuilder = new StoneHouseBuilder();
  director.setBuilder(stoneBuilder);
  director.constructFullFeaturedHouse();
  const stoneHouse = stoneBuilder.getHouse();
  console.log('Full Stone House:', stoneHouse);
  