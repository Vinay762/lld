// ============================================
// Proxy Design Pattern Example in JavaScript
// ============================================

// ============================================
// Subject Interface
// ============================================
class Image {
    display() {
      throw new Error('display() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // RealSubject: RealImage
  // ============================================
  class RealImage extends Image {
    filename = '';
    loaded = false;
  
    constructor(filename) {
      super();
      this.filename = filename;
    }
  
    loadFromDisk() {
      console.log(`Loading image from disk: ${this.filename}`);
      this.loaded = true;
    }
  
    display() {
      if (!this.loaded) {
        this.loadFromDisk();
      }
      console.log(`Displaying image: ${this.filename}`);
    }
  }
  
  // ============================================
  // Proxy: ProxyImage
  // ============================================
  class ProxyImage extends Image {
    filename = '';
    realImage = null;
  
    constructor(filename) {
      super();
      this.filename = filename;
    }
  
    display() {
      // Lazy initialization: only create and load RealImage when needed
      if (!this.realImage) {
        this.realImage = new RealImage(this.filename);
      }
      this.realImage.display();
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  // The client deals with Image interface but may use the proxy
  const image1 = new ProxyImage('photo1.jpg');
  image1.display();
  // → Loading image from disk: photo1.jpg
  // → Displaying image: photo1.jpg
  
  // Second call uses cached RealImage; no load from disk
  image1.display();
  // → Displaying image: photo1.jpg
  
  // Another proxy for a different image
  const image2 = new ProxyImage('diagram.png');
  image2.display();
  // → Loading image from disk: diagram.png
  // → Displaying image: diagram.png
  



