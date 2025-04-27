function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🔗 LinkedList-Based Stack Visualization</h2>
    <p>A <b>Stack</b> implemented using a <b>Linked List</b> follows the <b>LIFO (Last In, First Out)</b> principle. Each node contains a value and a pointer to the next node.</p>
    <ul>
      <li><b>Push:</b> Add an element to the top of the stack.</li>
      <li><b>Pop:</b> Remove an element from the top of the stack.</li>
      <li><b>Peek:</b> View the top element of the stack without removing it.</li>
      <li><b>Generate Random Stack:</b> Generate a random stack with random values.</li>
    </ul>
    <div id="stack-container" style="display: flex; flex-direction: column-reverse; align-items: center; margin: 20px 0; position: relative;"></div>
    <div style="margin-bottom: 20px;">
      <button id="pushButton" style="padding:10px 20px; background-color: #4caf50; color:white; border:none; cursor:pointer; font-size:16px;">Push</button>
      <button id="popButton" style="padding:10px 20px; background-color: #f44336; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Pop</button>
      <button id="peekButton" style="padding:10px 20px; background-color: #ff9800; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Peek</button>
      <button id="generateStackButton" style="padding:10px 20px; background-color: #2196f3; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Generate Random Stack</button>
    </div>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Stack Operations Output:</h3>
      <ul id="stack-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code>
        <div id="code-line-1" class="code-line">function push(value) {</div>
        <div id="code-line-2" class="code-line">  const newNode = new Node(value);</div>
        <div id="code-line-3" class="code-line">  newNode.next = this.top;</div>
        <div id="code-line-4" class="code-line">  this.top = newNode;</div>
        <div id="code-line-5" class="code-line">  this.size++;</div>
        <div id="code-line-6" class="code-line">}</div>
        <div id="code-line-7" class="code-line">function pop() {</div>
        <div id="code-line-8" class="code-line">  if (!this.top) return null;</div>
        <div id="code-line-9" class="code-line">  const poppedValue = this.top.value;</div>
        <div id="code-line-10" class="code-line">  this.top = this.top.next;</div>
        <div id="code-line-11" class="code-line">  this.size--;</div>
        <div id="code-line-12" class="code-line">  return poppedValue;</div>
        <div id="code-line-13" class="code-line">}</div>
        <div id="code-line-14" class="code-line">function peek() {</div>
        <div id="code-line-15" class="code-line">  return this.top ? this.top.value : null;</div>
        <div id="code-line-16" class="code-line">}</div>
        <div id="code-line-17" class="code-line">function generateRandomStack() {</div>
        <div id="code-line-18" class="code-line">  stack.top = null;</div>
        <div id="code-line-19" class="code-line">  stack.size = 0;</div>
        <div id="code-line-20" class="code-line">  const randomSize = Math.floor(Math.random() * 10) + 1;</div>
        <div id="code-line-21" class="code-line">  for (let i = 0; i < randomSize; i++) {</div>
        <div id="code-line-22" class="code-line">    stack.push(Math.floor(Math.random() * 100));</div>
        <div id="code-line-23" class="code-line">  }</div>
        <div id="code-line-24" class="code-line">  renderStack();</div>
        <div id="code-line-25" class="code-line">}</div>
      </code>
    </pre>
  `;

  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  class LinkedListStack {
    constructor() {
      this.top = null;
      this.size = 0;
    }

    push(value) {
      const newNode = new Node(value);
      newNode.next = this.top;
      this.top = newNode;
      this.size++;
    }

    pop() {
      if (!this.top) return null;
      const poppedValue = this.top.value;
      this.top = this.top.next;
      this.size--;
      return poppedValue;
    }

    peek() {
      return this.top ? this.top.value : null;
    }

    isEmpty() {
      return this.size === 0;
    }
  }

  const stack = new LinkedListStack();

  function renderStack() {
    const container = document.getElementById("stack-container");
    container.innerHTML = "";
    let current = stack.top;
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
        margin: 5px 0;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
        position: relative;
        transition: transform 0.3s ease, background-color 0.3s ease;
      `;
      nodeElement.setAttribute("id", `stack-node-${index}`);
      container.appendChild(nodeElement);
      if (current.next) {
        const arrow = document.createElement("div");
        arrow.innerHTML = "&#8593;"; 
        arrow.style.cssText = `
          font-size: 24px;
          color: #555;
          margin: 5px 0;
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

  async function push(value) {
    highlightCodeLine("code-line-1");
    await new Promise(resolve => setTimeout(resolve, 500));
    stack.push(value);
    highlightCodeLine("code-line-5");
    renderStack();
    const element = document.getElementById(`stack-node-0`);
    element.style.backgroundColor = "#ffeb3b"; 
    await new Promise(resolve => setTimeout(resolve, 500));
    element.style.backgroundColor = "#e8f5e9"; 
    document.getElementById("stack-output").innerHTML += `<li>Pushed: ${value}</li>`;
  }

  async function pop() {
    highlightCodeLine("code-line-7");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (stack.isEmpty()) {
      highlightCodeLine("code-line-8");
      alert("Stack is empty! Cannot pop.");
      return;
    }
    highlightCodeLine("code-line-9");
    const value = stack.pop();
    renderStack();
    document.getElementById("stack-output").innerHTML += `<li>Popped: ${value}</li>`;
    highlightCodeLine("code-line-12");
  }

  async function peek() {
    highlightCodeLine("code-line-14");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (stack.isEmpty()) {
      highlightCodeLine("code-line-15");
      alert("Stack is empty! Cannot peek.");
      return;
    }
    highlightCodeLine("code-line-15");
    const value = stack.peek();
    const element = document.getElementById(`stack-node-0`);
    element.style.backgroundColor = "#ff9800"; 
    await new Promise(resolve => setTimeout(resolve, 500));
    element.style.backgroundColor = "#e8f5e9"; 
    document.getElementById("stack-output").innerHTML += `<li>Peeked: ${value}</li>`;
  }

  function generateRandomStack() {
    highlightCodeLine("code-line-17");
    stack.top = null;
    stack.size = 0;
    highlightCodeLine("code-line-20");
    const randomSize = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < randomSize; i++) {
      highlightCodeLine("code-line-22");
      stack.push(Math.floor(Math.random() * 100));
    }
    highlightCodeLine("code-line-24");
    renderStack();
    document.getElementById("stack-output").innerHTML = `<li>Generated Random Stack: [${randomSize} elements]</li>`;
  }
  document.getElementById("pushButton").onclick = async () => {
    const value = Math.floor(Math.random() * 100);
    await push(value);
  };

  document.getElementById("popButton").onclick = async () => {
    await pop();
  };

  document.getElementById("peekButton").onclick = async () => {
    await peek();
  };

  document.getElementById("generateStackButton").onclick = () => {
    generateRandomStack();
  };
  renderStack();
}

initSection();