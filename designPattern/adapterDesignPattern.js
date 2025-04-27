class WeightMachineAdapter {
    getWeightInKg() {
      throw new Error('getWeightInKg() must be implemented by subclass.');
    }
  }
  
  class WeightMachine {
    getWeightInPound() {
      throw new Error('getWeightInPound() must be implemented by subclass.');
    }
  }
  
  class WeightMachineForBabies extends WeightMachine {
    constructor() {
      super();
    }
  
    getWeightInPound() {
      return 28;
    }
  }
  
  class WeightMachineAdapterImpl extends WeightMachineAdapter {
    weightMachine = null;
  
    constructor(weightMachine) {
      super();
      this.weightMachine = weightMachine;
    }
  
    getWeightInKg() {
      const weightInPound = this.weightMachine.getWeightInPound();
      return weightInPound * 0.45;
    }
  }
  
  const machine = new WeightMachineForBabies();
  const adapter = new WeightMachineAdapterImpl(machine);
  console.log(adapter.getWeightInKg());
  