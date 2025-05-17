// ============================================
// Composite Design Pattern Example in JavaScript
// ============================================

// ============================================
// Component Interface: FileSystem
// ============================================
class FileSystem {
    ls() {
      throw new Error('ls() must be implemented by subclass.');
    }
  }
  
  // ============================================
  // Leaf: File
  // ============================================
  class File extends FileSystem {
    fileName = ''; // declare before use
  
    constructor(name) {
      super();
      this.fileName = name;
    }
  
    ls() {
      console.log(`file name ${this.fileName}`);
    }
  }
  
  // ============================================
  // Composite: Directory
  // ============================================
  class Directory extends FileSystem {
    directoryName    = '';  // declare before use
    fileSystemList   = [];  // declare before use
  
    constructor(name) {
      super();
      this.directoryName = name;
      this.fileSystemList = [];
    }
  
    add(fileSystemObj) {
      this.fileSystemList.push(fileSystemObj);
    }
  
    ls() {
      console.log(`Directory name ${this.directoryName}`);
      for (const fsObj of this.fileSystemList) {
        fsObj.ls();
      }
    }
  }
  
  // ============================================
  // Client Code
  // ============================================
  
  const movieDirectory = new Directory('Movie');
  
  movieDirectory.add(new File('Border'));
  
  const comedyMovieDirectory = new Directory('ComedyMovie');
  comedyMovieDirectory.add(new File('Hulchul'));
  
  movieDirectory.add(comedyMovieDirectory);
  
  // Print the entire structure
  movieDirectory.ls();
  