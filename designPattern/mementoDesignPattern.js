// ============================================
// Memento Pattern Example in JavaScript
// ============================================

// --------------------------------------------
// Memento: ConfigurationMemento
// --------------------------------------------
class ConfigurationMemento {
    height = 0;
    width = 0;
  
    /**
     * @param {number} height 
     * @param {number} width 
     */
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  
    getHeight() {
      return this.height;
    }
  
    getWidth() {
      return this.width;
    }
  }
  
  // --------------------------------------------
  // Originator: ConfigurationOriginator
  // --------------------------------------------
  class ConfigurationOriginator {
    height = 0;
    width = 0;
  
    /**
     * @param {number} height 
     * @param {number} width 
     */
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  
    setHeight(height) {
      this.height = height;
    }
  
    setWidth(width) {
      this.width = width;
    }
  
    createMemento() {
      return new ConfigurationMemento(this.height, this.width);
    }
  
    restoreMemento(memento) {
      this.height = memento.getHeight();
      this.width = memento.getWidth();
    }
  }
  
  // --------------------------------------------
  // Caretaker: ConfigurationCaretaker
  // --------------------------------------------
  class ConfigurationCaretaker {
    history = [];
  
    /**
     * @param {ConfigurationMemento} memento
     */
    addMemento(memento) {
      this.history.push(memento);
    }
  
    /**
     * @returns {ConfigurationMemento|null}
     */
    undo() {
      if (this.history.length === 0) {
        return null;
      }
      // pop the last snapshot and return it
      return this.history.pop();
    }
  }
  
  // --------------------------------------------
  // Client Code
  // --------------------------------------------
  const caretaker = new ConfigurationCaretaker();
  const originator = new ConfigurationOriginator(5, 10);
  
  // Save initial state
  const snapshot1 = originator.createMemento();
  caretaker.addMemento(snapshot1);
  
  // Change state
  originator.setHeight(7);
  originator.setWidth(12);
  
  // Save new state
  const snapshot2 = originator.createMemento();
  caretaker.addMemento(snapshot2);
  
  // Change state again
  originator.setHeight(9);
  originator.setWidth(14);
  
  console.log(`Current State → height: ${originator.height}, width: ${originator.width}`);
  
  // Undo to last saved state
  const restored = caretaker.undo();
  if (restored) {
    originator.restoreMemento(restored);
  }
  
  console.log(`After undo → height: ${originator.height}, width: ${originator.width}`);
  // → After undo → height: 7, width: 12
  