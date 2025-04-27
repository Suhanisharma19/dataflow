function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🔗 LinkedList-Based Queue Visualization</h2>
    <p>A <b>Queue</b> implemented using a <b>Linked List</b> follows the <b>FIFO (First In, First Out)</b> principle. Each node contains a value and a pointer to the next node.</p>
    <ul>
      <li><b>Enqueue:</b> Add an element to the rear of the queue.</li>
      <li><b>Dequeue:</b> Remove an element from the front of the queue.</li>
      <li><b>Peek:</b> View the front element of the queue without removing it.</li>
    </ul>
    <div id="queue-container" style="display: flex; justify-content: center; align-items: center; margin: 20px 0; position: relative;"></div>
    <div style="margin-bottom: 20px;">
      <button id="enqueueButton" style="padding:10px 20px; background-color: #4caf50; color:white; border:none; cursor:pointer; font-size:16px;">Enqueue</button>
      <button id="dequeueButton" style="padding:10px 20px; background-color: #f44336; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Dequeue</button>
      <button id="peekButton" style="padding:10px 20px; background-color: #ff9800; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Peek</button>
    </div>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Queue Operations Output:</h3>
      <ul id="queue-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code>
        <div id="code-line-1" class="code-line">function enqueue(value) {</div>
        <div id="code-line-2" class="code-line">  const newNode = new Node(value);</div>
        <div id="code-line-3" class="code-line">  if (!this.tail) {</div>
        <div id="code-line-4" class="code-line">    this.head = this.tail = newNode;</div>
        <div id="code-line-5" class="code-line">  } else {</div>
        <div id="code-line-6" class="code-line">    this.tail.next = newNode;</div>
        <div id="code-line-7" class="code-line">    this.tail = newNode;</div>
        <div id="code-line-8" class="code-line">  }</div>
        <div id="code-line-9" class="code-line">  this.size++;</div>
        <div id="code-line-10" class="code-line">}</div>
        <div id="code-line-11" class="code-line">function dequeue() {</div>
        <div id="code-line-12" class="code-line">  if (!this.head) return null;</div>
        <div id="code-line-13" class="code-line">  const dequeuedValue = this.head.value;</div>
        <div id="code-line-14" class="code-line">  this.head = this.head.next;</div>
        <div id="code-line-15" class="code-line">  if (!this.head) this.tail = null;</div>
        <div id="code-line-16" class="code-line">  this.size--;</div>
        <div id="code-line-17" class="code-line">  return dequeuedValue;</div>
        <div id="code-line-18" class="code-line">}</div>
        <div id="code-line-19" class="code-line">function peek() {</div>
        <div id="code-line-20" class="code-line">  return this.head ? this.head.value : null;</div>
        <div id="code-line-21" class="code-line">}</div>
      </code>
    </pre>
  `;

  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  class LinkedListQueue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    enqueue(value) {
      const newNode = new Node(value);
      if (!this.tail) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.size++;
    }

    dequeue() {
      if (!this.head) return null;
      const dequeuedValue = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return dequeuedValue;
    }

    peek() {
      return this.head ? this.head.value : null;
    }

    isEmpty() {
      return this.size === 0;
    }
  }

  const queue = new LinkedListQueue();

  function renderQueue() {
    const container = document.getElementById("queue-container");
    container.innerHTML = "";
    let current = queue.head;
    let index = 0;

    while (current) {
      const nodeElement = document.createElement("div");
      nodeElement.innerHTML = `
        <div style="font-size: 18px; font-weight: bold;">${current.value}</div>
        <div style="font-size: 12px; color: #555;">Index: ${index}</div>
      `;
      nodeElement.style.cssText = `
        width: 70px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #4caf50;
        background-color: #e8f5e9;
        margin: 0 10px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
        position: relative;
        transition: transform 0.3s ease, background-color 0.3s ease;
      `;
      nodeElement.setAttribute("id", `queue-node-${index}`);
      container.appendChild(nodeElement);
      if (current === queue.head) {
        const headIndicator = document.createElement("div");
        headIndicator.textContent = "Head";
        headIndicator.style.cssText = `
          position: absolute;
          top: -20px;
          font-size: 12px;
          color: #ff5722;
        `;
        nodeElement.appendChild(headIndicator);
      }
      if (current === queue.tail) {
        const tailIndicator = document.createElement("div");
        tailIndicator.textContent = "Tail";
        tailIndicator.style.cssText = `
          position: absolute;
          bottom: -20px;
          font-size: 12px;
          color: #2196f3;
        `;
        nodeElement.appendChild(tailIndicator);
      }
      if (current.next) {
        const arrow = document.createElement("div");
        arrow.innerHTML = "&#8594;"; 
        arrow.style.cssText = `
          font-size: 24px;
          color: #555;
          margin: 0 5px;
        `;
        container.appendChild(arrow);
      }

      current = current.next;
      index++;
    }
  }

  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }

  async function enqueue(value) {
    highlightCodeLine("code-line-1");
    await new Promise(resolve => setTimeout(resolve, 500));
    queue.enqueue(value);
    highlightCodeLine("code-line-9");
    renderQueue();
    const element = document.getElementById(`queue-node-${queue.size - 1}`);
    element.style.backgroundColor = "#ffeb3b"; 
    await new Promise(resolve => setTimeout(resolve, 500));
    element.style.backgroundColor = "#e8f5e9"; 
    document.getElementById("queue-output").innerHTML += `<li>Enqueued: ${value}</li>`;
  }

  async function dequeue() {
    highlightCodeLine("code-line-11");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (queue.isEmpty()) {
      alert("Queue is empty! Cannot dequeue.");
      return;
    }
    highlightCodeLine("code-line-13");
    const value = queue.dequeue();
    renderQueue();
    document.getElementById("queue-output").innerHTML += `<li>Dequeued: ${value}</li>`;
    highlightCodeLine("code-line-17");
  }

  async function peek() {
    highlightCodeLine("code-line-19");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (queue.isEmpty()) {
      alert("Queue is empty! Cannot peek.");
      return;
    }
    highlightCodeLine("code-line-20");
    const value = queue.peek();
    const element = document.getElementById(`queue-node-0`);
    element.style.backgroundColor = "#ff9800"; 
    await new Promise(resolve => setTimeout(resolve, 500));
    element.style.backgroundColor = "#e8f5e9"; 
    document.getElementById("queue-output").innerHTML += `<li>Peeked: ${value}</li>`;
  }
  document.getElementById("enqueueButton").onclick = async () => {
    const value = Math.floor(Math.random() * 100);
    await enqueue(value);
  };

  document.getElementById("dequeueButton").onclick = async () => {
    await dequeue();
  };

  document.getElementById("peekButton").onclick = async () => {
    await peek();
  };
  renderQueue();
}

initSection();