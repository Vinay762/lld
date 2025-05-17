// ============================================
// Iterator Interface
// ============================================
class Iterator {
    hasNext() {
      throw new Error('hasNext() must be implemented');
    }
    next() {
      throw new Error('next() must be implemented');
    }
  }
  
  // ============================================
  // Aggregate Interface
  // ============================================
  class Aggregate {
    createIterator() {
      throw new Error('createIterator() must be implemented');
    }
  }
  
  // ============================================
  // ConcreteAggregate: NameRepository
  // ============================================
  class NameRepository extends Aggregate {
    names = []; // declare before use
  
    constructor(names) {
      super();
      this.names = names;
    }
  
    createIterator() {
      return new NameIterator(this);
    }
  }
  
  // ============================================
  // ConcreteIterator: NameIterator
  // ============================================
  class NameIterator extends Iterator {
    repository = null;
    index      = 0;
  
    constructor(repository) {
      super();
      this.repository = repository;
    }
  
    hasNext() {
      return this.index < this.repository.names.length;
    }
  
    next() {
      const name = this.repository.names[this.index];
      this.index += 1;
      return name;
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  const repo = new NameRepository([
    'Alice',
    'Bob',
    'Charlie',
    'Diana'
  ]);
  
  const iterator = repo.createIterator();
  while (iterator.hasNext()) {
    const name = iterator.next();
    console.log(name);
  }
  // Output:
  // Alice
  // Bob
  // Charlie
  // Diana
  


//   Iterator Pattern
//   Intent:
//   Provide a way to sequentially access the elements of an aggregate (collection) without exposing its underlying representation.
  
//   Key Participants:
  
//   Iterator (interface)
//   Defines methods for traversing (hasNext(), next()).
  
//   ConcreteIterator
//   Implements the Iterator interface and keeps track of the current position in the traversal.
  
//   Aggregate (interface)
//   Defines a method to create an iterator (createIterator()).
  
//   ConcreteAggregate
//   Implements the Aggregate interface and returns an instance of the appropriate ConcreteIterator.
  
//   When to Use:
  
//   You need a uniform way to traverse different kinds of collections.
  
//   You want to hide the internal structure of a collection from clients.
  
//   You need multiple simultaneous traversals over the same collection.
