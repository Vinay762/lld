// ============================================
// Chain of Responsibility Pattern in JavaScript
// ============================================

class LogProcessor {
    // Log level constants
    static INFO = 1;
    static DEBUG = 2;
    static ERROR = 3;
  
    // Declare class-level field
    nextLoggerProcessor = null;
  
    constructor(nextLoggerProcessor) {
      this.nextLoggerProcessor = nextLoggerProcessor;
    }
  
    log(logLevel, message) {
      if (this.nextLoggerProcessor) {
        this.nextLoggerProcessor.log(logLevel, message);
      }
    }
  }
  
  class DebugLogProcessor extends LogProcessor {
    constructor(nextLoggerProcessor) {
      super(nextLoggerProcessor);
    }
  
    log(logLevel, message) {
      if (logLevel === LogProcessor.DEBUG) {
        console.log(`DEBUG: ${message}`);
      } else {
        super.log(logLevel, message);
      }
    }
  }
  
  class ErrorLogProcessor extends LogProcessor {
    constructor(nextLoggerProcessor) {
      super(nextLoggerProcessor);
    }
  
    log(logLevel, message) {
      if (logLevel === LogProcessor.ERROR) {
        console.log(`ERROR: ${message}`);
      } else {
        super.log(logLevel, message);
      }
    }
  }
  
  class InfoLogProcessor extends LogProcessor {
    constructor(nextLoggerProcessor) {
      super(nextLoggerProcessor);
    }
  
    log(logLevel, message) {
      if (logLevel === LogProcessor.INFO) {
        console.log(`INFO: ${message}`);
      } else {
        super.log(logLevel, message);
      }
    }
  }
  
  // ============================================
  // Client Code: build the chain and send logs
  // ============================================
  
  const loggerChain = new InfoLogProcessor(
    new DebugLogProcessor(
      new ErrorLogProcessor(null)
    )
  );
  
  loggerChain.log(LogProcessor.ERROR, "exception happens");
  loggerChain.log(LogProcessor.DEBUG, "need to debug this");
  loggerChain.log(LogProcessor.INFO,  "just for info");
  