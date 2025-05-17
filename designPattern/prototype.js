class Student {
    name = '';
    rollNo = 0;
  
    constructor(name, rollNo) {
      this.name = name;
      this.rollNo = rollNo;
    }
  
    clone() {
      return new Student(this.name, this.rollNo);
    }
  
    toString() {
      return `Student [name=${this.name}, rollNo=${this.rollNo}]`;
    }
  }
  
  // Usage
  const original = new Student('Alice', 101);
  const copy     = original.clone();
  
  console.log(original.toString()); // Student [name=Alice, rollNo=101]
  console.log(copy.toString());     // Student [name=Alice, rollNo=101]
  
  // Modify the clone to show independence
  copy.name   = 'Bob';
  copy.rollNo = 102;
  
  console.log(original.toString()); // Student [name=Alice, rollNo=101]
  console.log(copy.toString());     // Student [name=Bob, rollNo=102]
  