// ============================================
// Facade Design Pattern Example: Placing an Order
// ============================================

// Subsystem: Inventory Service
class InventoryService {
    inventory = {}; // productId → available quantity
  
    constructor() {
      this.inventory = {
        'p1': 5,
        'p2': 10,
        'p3': 0
      };
    }
  
    checkStock(productId, quantity) {
      const available = this.inventory[productId] ?? 0;
      return available >= quantity;
    }
  
    updateStock(productId, quantity) {
      if (this.checkStock(productId, quantity)) {
        this.inventory[productId] -= quantity;
        return true;
      }
      return false;
    }
  }
  
  // Subsystem: Payment Service
  class PaymentService {
    constructor() {}
  
    processPayment(amount, paymentDetails) {
      console.log(`Processing payment of $${amount} with card ending ${paymentDetails.cardNumber.slice(-4)}`);
      // Simulate payment success
      return true;
    }
  }
  
  // Subsystem: Shipping Service
  class ShippingService {
    constructor() {}
  
    scheduleShipping(orderId, address) {
      console.log(`Scheduling shipping for order ${orderId} to address: ${address}`);
      // Simulate shipping ID generation
      return `SHIP-${Math.floor(Math.random() * 10000)}`;
    }
  }
  
  // Subsystem: Notification Service
  class NotificationService {
    constructor() {}
  
    sendOrderConfirmation(orderId, customerEmail) {
      console.log(`Sending order confirmation for ${orderId} to ${customerEmail}`);
    }
  }
  
  // Facade: OrderFacade
  class OrderFacade {
    inventoryService = null;
    paymentService   = null;
    shippingService  = null;
    notificationService = null;
  
    constructor() {
      this.inventoryService    = new InventoryService();
      this.paymentService      = new PaymentService();
      this.shippingService     = new ShippingService();
      this.notificationService = new NotificationService();
    }
  
    placeOrder(order) {
      const { productId, quantity, paymentDetails, address, customerEmail, unitPrice } = order;
  
      console.log('--- Placing Order ---');
  
      // 1. Check stock
      if (!this.inventoryService.checkStock(productId, quantity)) {
        console.log('Order failed: Product out of stock');
        return null;
      }
  
      // 2. Process payment
      const totalAmount = unitPrice * quantity;
      const paymentSuccess = this.paymentService.processPayment(totalAmount, paymentDetails);
      if (!paymentSuccess) {
        console.log('Order failed: Payment was declined');
        return null;
      }
  
      // 3. Update inventory
      this.inventoryService.updateStock(productId, quantity);
  
      // 4. Create order ID
      const orderId = `ORDER-${Date.now()}`;
  
      // 5. Schedule shipping
      const shippingId = this.shippingService.scheduleShipping(orderId, address);
  
      // 6. Send confirmation
      this.notificationService.sendOrderConfirmation(orderId, customerEmail);
  
      console.log(`Order ${orderId} placed successfully with shipping ID ${shippingId}\n`);
      return orderId;
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  const facade = new OrderFacade();
  
  const orderDetails = {
    productId: 'p1',
    quantity: 2,
    unitPrice: 49.99,
    paymentDetails: { cardNumber: '1234-5678-9012-3456', expiry: '12/25', cvv: '123' },
    address: '123 Main St, Springfield',
    customerEmail: 'customer@example.com'
  };
  
  facade.placeOrder(orderDetails);
  
  // Trying to order out-of-stock product
  const failedOrderDetails = { ...orderDetails, productId: 'p3', quantity: 1 };
  facade.placeOrder(failedOrderDetails);
  