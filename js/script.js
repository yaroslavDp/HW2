class Queue {
  constructor() {
    this.headIndex = 0; 
    this.tailIndex = 0;
    this.items = {};
    this.maxLength = 21;
  }

  enQueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  deQueue() {
    if (this.size() <= 0) {
      return null;
    }
    delete this.items[this.headIndex];

    this.headIndex++;

    if (this.isEmpty()) {
      this.headIndex = 0;
      this.tailIndex = 0;
    }
  }

  isEmpty() {
    return this.headIndex == this.tailIndex;
  }

  size() {
    return this.tailIndex - this.headIndex;
  }

  toString() {
    return `{${Object.values(this.items).join(", ")}}`;
  }
  getIndexes() {
    return {
      headIndex: this.headIndex,
      tailIndex: this.tailIndex,
    };
  }
}

const queue = new Queue();
const input = document.querySelector(".queue__input");
const addBtn = document.querySelector(".queue__add");
const removeBtn = document.querySelector(".queue__remove");
const result = document.querySelector(".queue__result");

addBtn.addEventListener("click", () => {
  if (Object.keys(queue.items).length == queue.maxLength) {
    result.innerText = "Overflow! Can`t accept anymore!";
    input.value = "";
    return null;
  } else {
    if (!input.value.trim().length) {
      result.innerText = "Fill in the input field!";
      return null;
    }
  }

  queue.enQueue(input.value.trim());
  const indexes = queue.getIndexes();
  localStorage.setItem("myQueue", JSON.stringify(queue.items));
  localStorage.setItem("myIndexes", JSON.stringify(indexes));
  result.innerText = queue.toString();
  input.value = "";
});

removeBtn.addEventListener("click", () => {
  queue.deQueue();
  const indexes = queue.getIndexes();
  localStorage.setItem("myQueue", JSON.stringify(queue.items));
  localStorage.setItem("myIndexes", JSON.stringify(indexes));
  result.innerText = queue.isEmpty() ? "No items yet!" : queue.toString();
});

const savedQueue = localStorage.getItem("myQueue");
const savedIndex = localStorage.getItem("myIndexes");
if (savedQueue && savedIndex) {
  queue.items = JSON.parse(savedQueue);
  let { headIndex, tailIndex } = JSON.parse(savedIndex);
  queue.headIndex = headIndex;
  queue.tailIndex = tailIndex;
  result.innerText = queue.isEmpty() ? "No items yet!" : queue.toString();
} else {
  result.innerText = "No items yet!";
}
