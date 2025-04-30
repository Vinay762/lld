// ============================================
// Product: House
// ============================================
class House {
    constructor() {
      this.foundation = null;
      this.structure  = null;
      this.roof       = null;
      this.interior   = null;
    }
  }
  
  // ============================================
  // Builder Interface: HouseBuilder
  // ============================================
  class HouseBuilder {
    reset() {
      this.house = new House();
    }
    buildFoundation() { throw new Error('Not implemented'); }
    buildStructure()  { throw new Error('Not implemented'); }
    buildRoof()       { throw new Error('Not implemented'); }
    furnishInterior(){ throw new Error('Not implemented'); }
    getHouse() {
      const result = this.house;
    //   this.reset();             // Ready for next build
      return result;
    }
  }
  
  // ============================================
  // Concrete Builder: Igloo
  // ============================================
  class IglooHouseBuilder extends HouseBuilder {
    constructor() {
      super();
      this.reset();
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
      this.reset();
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
      this.reset();
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
    setBuilder(builder) {
      if (!(builder instanceof HouseBuilder)) {
        throw new Error('Builder must be a HouseBuilder');
      }
      this.builder = builder;
    }
  
    // Minimal house: just foundation + structure
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
  
  // 1. Build an Igloo
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
  
  // 3. Build a luxury Stone house
  const stoneBuilder = new StoneHouseBuilder();
  director.setBuilder(stoneBuilder);
  director.constructFullFeaturedHouse();
  const stoneHouse = stoneBuilder.getHouse();
  console.log('Full Stone House:', stoneHouse);
  