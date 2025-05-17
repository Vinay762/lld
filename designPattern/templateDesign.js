// ============================================
// Template Method Pattern: Payment Flows in JavaScript
// ============================================

// --------------------------------------------
// Abstract Class: PaymentFlow
// --------------------------------------------
class PaymentFlow {
    paymentDetails = {}; // declare before use
    fee            = 0;
  
    /**
     * @param {{ amount: number, from: string, to: string }} paymentDetails
     */
    constructor(paymentDetails) {
      if (new.target === PaymentFlow) {
        throw new Error('Cannot instantiate abstract class PaymentFlow');
      }
      this.paymentDetails = paymentDetails;
    }
  
    // The "template method" defining the skeleton of the algorithm
    sendMoney() {
      this.validateRequest();
      this.debitAmount();
      this.calculateFees();
      this.creditAmount();
    }
  
    // Steps to be implemented by subclasses
    validateRequest() {
      throw new Error('validateRequest() must be implemented by subclass');
    }
    debitAmount() {
      throw new Error('debitAmount() must be implemented by subclass');
    }
    calculateFees() {
      throw new Error('calculateFees() must be implemented by subclass');
    }
    creditAmount() {
      throw new Error('creditAmount() must be implemented by subclass');
    }
  }
  
  // --------------------------------------------
  // Concrete Class: PayToFriendFlow
  // --------------------------------------------
  class PayToFriendFlow extends PaymentFlow {
    constructor(paymentDetails) {
      super(paymentDetails);
    }
  
    validateRequest() {
      console.log('Validating friend-to-friend payment request');
      // e.g. ensure "to" is in friends list
    }
  
    debitAmount() {
      console.log(
        `Debiting ${this.paymentDetails.amount} from ${this.paymentDetails.from}`
      );
      // e.g. call wallet.debit(...)
    }
  
    calculateFees() {
      // friend transfers have no fees
      this.fee = 0;
      console.log(`Calculating fees: ${this.fee} (no fee for friends)`);
    }
  
    creditAmount() {
      const net = this.paymentDetails.amount - this.fee;
      console.log(
        `Crediting ${net} to ${this.paymentDetails.to}`
      );
      // e.g. call wallet.credit(...)
    }
  }
  
  // --------------------------------------------
  // Concrete Class: PayToMerchantFlow
  // --------------------------------------------
  class PayToMerchantFlow extends PaymentFlow {
    constructor(paymentDetails) {
      super(paymentDetails);
    }
  
    validateRequest() {
      console.log('Validating merchant payment request');
      // e.g. check merchant account and KYC
    }
  
    debitAmount() {
      console.log(
        `Debiting ${this.paymentDetails.amount} from ${this.paymentDetails.from}`
      );
    }
  
    calculateFees() {
      // merchants are charged 2% fee
      this.fee = this.paymentDetails.amount * 0.02;
      console.log(`Calculating fees: ${this.fee.toFixed(2)} (2% merchant fee)`);
    }
  
    creditAmount() {
      const net = this.paymentDetails.amount - this.fee;
      console.log(
        `Crediting ${net.toFixed(2)} to merchant ${this.paymentDetails.to}`
      );
    }
  }
  
  // --------------------------------------------
  // Client Code
  // --------------------------------------------
  const friendPayment = {
    amount: 100,
    from: 'Alice',
    to: 'Bob'
  };
  const merchantPayment = {
    amount: 250,
    from: 'Carol',
    to: 'AcmeCorp'
  };
  
  console.log('--- Friend Payment Flow ---');
  const friendFlow = new PayToFriendFlow(friendPayment);
  friendFlow.sendMoney();
  
  console.log('\n--- Merchant Payment Flow ---');
  const merchantFlow = new PayToMerchantFlow(merchantPayment);
  merchantFlow.sendMoney();
  