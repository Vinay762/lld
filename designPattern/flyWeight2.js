// Flyweight Pattern: Word Processor Characters in JavaScript

class ILetter {
    display(row, column) {
      throw new Error('display() must be implemented by subclass.');
    }
  }
  
  class DocumentCharacter extends ILetter {
    character = '';
    fontType  = '';
    size      = 0;
  
    constructor(character, fontType, size) {
      super();
      this.character = character;
      this.fontType = fontType;
      this.size = size;
    }
  
    display(row, column) {
      console.log(
        `Character "${this.character}" in ${this.fontType} (${this.size}pt) at [${row}, ${column}]`
      );
    }
  }
  
  class LetterFactory {
    static characterCache = new Map();
  
    static createLetter(characterValue) {
      if (LetterFactory.characterCache.has(characterValue)) {
        return LetterFactory.characterCache.get(characterValue);
      }
  
      const charObj = new DocumentCharacter(characterValue, 'Arial', 10);
      LetterFactory.characterCache.set(characterValue, charObj);
      return charObj;
    }
  }
  
  // Client code
  const char1 = LetterFactory.createLetter('t');
  char1.display(0, 0);
  
  const char2 = LetterFactory.createLetter('t');
  char2.display(0, 6);
  