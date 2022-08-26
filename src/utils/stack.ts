class Stack {
  stack: any[];

  constructor() {
    this.stack = [];
  }

  push(item: any) {
    this.stack.push(item);
  }

  pop() {
    this.stack.pop();
  }

  peek() {
    return !this.isEmpty() ? this.stack[this.size - 1] : undefined;
  }

  isEmpty() {
    return this.size === 0;
  }

  get size() {
    return this.stack.length;
  }

  get stackItems() {
    return this.stack;
  }
}

export default Stack;
