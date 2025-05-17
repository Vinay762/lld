// ============================================
// Observer Interface
// ============================================
class Observer {
    update(productName, stockData) {
      throw new Error('update() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Observable Interface
  // ============================================
  class Observable {
    observers = [];  // declare before use
  
    add(observer) {
      if (!(observer instanceof Observer) || typeof observer.update !== 'function') {
        throw new Error('Observer must implement update().');
      }
      this.observers.push(observer);
    }
  
    remove(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(productName, stockData) {
      this.observers.forEach(obs => obs.update(productName, stockData));
    }
  
    setData(stockData) {
      throw new Error('setData() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Concrete Observable: ProductStockObservable
  // ============================================
  class ProductStockObservable extends Observable {
    productName = '';
    stockData    = { inStock: false, quantity: 0 };
  
    constructor(productName) {
      super();
      this.productName = productName;
    }
  
    setData(newStockData) {
      // Only notify when transitioning from out-of-stock to in-stock
      const wasOutOfStock = this.stockData.inStock === false;
      const isNowInStock = newStockData.inStock === true;
  
      this.stockData = newStockData;
  
      if (wasOutOfStock && isNowInStock) {
        this.notify(this.productName, this.stockData);
      }
    }
  }
  
  // ============================================
  // Concrete Observers
  // ============================================
  class EmailObserver extends Observer {
    email = '';
  
    constructor(email) {
      super();
      this.email = email;
    }
  
    update(productName, stockData) {
      console.log(
        `📧 Email to ${this.email}: "${productName}" is back in stock! Quantity: ${stockData.quantity}`
      );
      // Integrate with real email API in production
    }
  }
  
  class SMSObserver extends Observer {
    phoneNumber = '';
  
    constructor(phoneNumber) {
      super();
      this.phoneNumber = phoneNumber;
    }
  
    update(productName, stockData) {
      console.log(
        `📱 SMS to ${this.phoneNumber}: "${productName}" is back in stock! Quantity: ${stockData.quantity}`
      );
      // Integrate with real SMS gateway in production
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  // 1. Create a ProductStockObservable for "Echo Dot"
  const echoDotStock = new ProductStockObservable('Echo Dot');
  
  // 2. Create observers
  const emailObs = new EmailObserver('user@example.com');
  const smsObs   = new SMSObserver('+1234567890');
  
  // 3. Subscribe observers
  echoDotStock.add(emailObs);
  echoDotStock.add(smsObs);
  
  // 4. Set initial data (out of stock) — no notification
  echoDotStock.setData({ inStock: false, quantity: 0 });
  
  // 5. Later, product comes back into stock — triggers notifications
  echoDotStock.setData({ inStock: true, quantity: 150 });
  
  // 6. If needed, unsubscribe an observer
  // echoDotStock.remove(smsObs);
  
  // 7. Further stock updates (stays in stock) — no further notifications
  echoDotStock.setData({ inStock: true, quantity: 140 });
  