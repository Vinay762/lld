// ============================================
// Mediator Interface
// ============================================
class ChatMediator {
    sendMessage(message, fromUser) {
      throw new Error('sendMessage() must be implemented by subclass.');
    }
    registerUser(user) {
      throw new Error('registerUser() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // ConcreteMediator: ChatRoom
  // ============================================
  class ChatRoom extends ChatMediator {
    users = {}; // declare before use
  
    constructor() {
      super();
      this.users = {};
    }
  
    registerUser(user) {
      this.users[user.name] = user;
      user.mediator = this;
    }
  
    sendMessage(message, fromUser) {
      for (const userName in this.users) {
        if (userName !== fromUser.name) {
          this.users[userName].receive(message, fromUser);
        }
      }
    }
  }
  
  // ============================================
  // Colleague Base Class
  // ============================================
  class User {
    name = '';
    mediator = null; // declare before use
  
    constructor(name) {
      this.name = name;
    }
  
    send(message) {
      console.log(`${this.name} (sending): ${message}`);
      this.mediator.sendMessage(message, this);
    }
  
    receive(message, fromUser) {
      console.log(`${this.name} (received from ${fromUser.name}): ${message}`);
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  const chatRoom = new ChatRoom();
  
  const alice = new User('Alice');
  const bob   = new User('Bob');
  const carol = new User('Carol');
  
  // register users with the mediator
  chatRoom.registerUser(alice);
  chatRoom.registerUser(bob);
  chatRoom.registerUser(carol);
  
  // Users communicate via the mediator
  alice.send('Hello everyone!');
  bob.send('Hey Alice!');
  carol.send('Hi all, Carol here.');
  


//   Mediator Pattern
// Intent:
// Define an object (the mediator) that encapsulates how a set of colleague objects interact. This promotes loose coupling by preventing colleagues from referring to each other explicitly, and lets you vary their interaction independently.

// Key Participants:

// Mediator (interface)
// Declares methods for registering colleagues and coordinating the interactions.

// ConcreteMediator
// Implements the Mediator interface and keeps track of its colleagues, routing requests between them.

// Colleague (abstract/base class)
// Knows its mediator and uses it to communicate with other colleagues.

// ConcreteColleagues
// Implement behavior, sending requests via the mediator instead of directly to each other.

// When to Use:

// To avoid a spaghetti network of direct references among many objects.

// When you want to centralize control logic for how objects talk to each other.

// When you need to vary interaction behavior independently of the colleagues.

