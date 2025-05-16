// Receiver
class AirConditioner {
    isOn = false;
  
    turnOnAC() {
      if (!this.isOn) {
        this.isOn = true;
        console.log('Air Conditioner is now ON');
      }
    }
  
    turnOffAC() {
      if (this.isOn) {
        this.isOn = false;
        console.log('Air Conditioner is now OFF');
      }
    }
  }
  
  // Command Interface (abstract)
  class ICommand {
    execute() {
      throw new Error('execute() must be implemented');
    }
    undo() {
      throw new Error('undo() must be implemented');
    }
  }
  
  // Concrete Commands
  class TurnACOnCommand extends ICommand {
    ac = null;
    constructor(ac) {
      super();
      this.ac = ac;
    }
    execute() {
      this.ac.turnOnAC();
    }
    undo() {
      this.ac.turnOffAC();
    }
  }
  
  class TurnACOffCommand extends ICommand {
    ac = null;
    constructor(ac) {
      super();
      this.ac = ac;
    }
    execute() {
      this.ac.turnOffAC();
    }
    undo() {
      this.ac.turnOnAC();
    }
  }
  
  // Invoker
  class MyRemoteControl {
    commandHistory = [];
    command = null;
  
    setCommand(command) {
      this.command = command;
    }
  
    pressButton() {
      if (!this.command) return;
      this.command.execute();
      this.commandHistory.push(this.command);
    }
  
    undo() {
      const cmd = this.commandHistory.pop();
      if (cmd) {
        cmd.undo();
      }
    }
  }
  
  // Client code
  const ac = new AirConditioner();
  const turnOn = new TurnACOnCommand(ac);
  const turnOff = new TurnACOffCommand(ac);
  
  const remote = new MyRemoteControl();
  
  // Turn AC on
  remote.setCommand(turnOn);
  remote.pressButton();   // Air Conditioner is now ON
  
  // Turn AC off
  remote.setCommand(turnOff);
  remote.pressButton();   // Air Conditioner is now OFF
  
  // Undo last (turn AC back on)
  remote.undo();          // Air Conditioner is now ON
  
  // Undo previous (turn AC back off)
  remote.undo();          // Air Conditioner is now OFF
  