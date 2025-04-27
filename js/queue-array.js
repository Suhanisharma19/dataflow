function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>📋 Array-Based Queue Visualization</h2>
    <p>A <b>Queue</b> is a linear data structure that follows the <b>FIFO (First In, First Out)</b> principle. Elements are added at the rear (enqueue) and removed from the front (dequeue).</p>
    <ul>
      <li><b>Enqueue:</b> Add an element to the rear of the queue.</li>
      <li><b>Dequeue:</b> Remove an element from the front of the queue.</li>
      <li><b>Peek:</b> View the front element of the queue without removing it.</li>
    </ul>
    <div id="queue-container" style="display: flex; justify-content: center; align-items: flex-end; margin: 20px 0; position: relative;"></div>
    <div style="margin-bottom: 20px;">
      <button id="enqueueButton" style="padding:10px 20px; background-color: #4caf50; color:white; border:none; cursor:pointer; font-size:16px;">Enqueue</button>
      <button id="dequeueButton" style="padding:10px 20px; background-color: #f44336; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Dequeue</button>
      <button id="peekButton" style="padding:10px 20px; background-color: #ff9800; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Peek</button>
      <button id="generateQueue" style="padding:10px 20px; background-color: #2196f3; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Generate Random Queue</button>
    </div>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Queue Operations Output:</h3>
      <ul id="queue-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code>
        <div id="code-line-1" class="code-line">function enqueue(value) {</div>
        <div id="code-line-2" class="code-line">  if (queue.length >= maxQueueSize) {</div>
        <div id="code-line-3" class="code-line">    alert("Queue is full!");</div>
        <div id="code-line-4" class="code-line">    return;</div>
        <div id="code-line-5" class="code-line">  }</div>
        <div id="code-line-6" class="code-line">  queue.push(value);</div>
        <div id="code-line-7" class="code-line">  renderQueue();</div>
        <div id="code-line-8" class="code-line">}</div>
        <div id="code-line-9" class="code-line">function dequeue() {</div>
        <div id="code-line-10" class="code-line">  if (queue.length === 0) {</div>
        <div id="code-line-11" class="code-line">    alert("Queue is empty!");</div>
        <div id="code-line-12" class="code-line">    return;</div>
        <div id="code-line-13" class="code-line">  }</div>
        <div id="code-line-14" class="code-line">  queue.shift();</div>
        <div id="code-line-15" class="code-line">  renderQueue();</div>
        <div id="code-line-16" class="code-line">}</div>
        <div id="code-line-17" class="code-line">function peek() {</div>
        <div id="code-line-18" class="code-line">  if (queue.length === 0) {</div>
        <div id="code-line-19" class="code-line">    alert("Queue is empty!");</div>
        <div id="code-line-20" class="code-line">    return;</div>
        <div id="code-line-21" class="code-line">  }</div>
        <div id="code-line-22" class="code-line">  return queue[0];</div>
        <div id="code-line-23" class="code-line">}</div>
      </code>
    </pre>
  `;

  const queue = [];
  const maxQueueSize = 10;

  function renderQueue() {
    const container = document.getElementById("queue-container");
    container.innerHTML = "";
    queue.forEach((value, index) => {
      const queueElement = document.createElement("div");
      queueElement.innerHTML = `
        <div style="font-size: 18px; font-weight: bold;">${value}</div>
        <div style="font-size: 12px; color: #555;">Index: ${index}</div>
      `;
      queueElement.style.cssText = `
        width: 50px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #4caf50;
        background-color: #e8f5e9;
        margin: 0 5px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
        position: relative;
        transition: transform 0.3s ease, background-color 0.3s ease;
      `;
      queueElement.setAttribute("id", `queue-element-${index}`);
      container.appendChild(queueElement);
      if (index === 0) {
        const headIndicator = document.createElement("div");
        headIndicator.textContent = "Head";
        headIndicator.style.cssText = `
          position: absolute;
          top: -20px;
          font-size: 12px;
          color: #ff5722;
        `;
        queueElement.appendChild(headIndicator);
      }
      if (index === queue.length - 1) {
        const tailIndicator = document.createElement("div");
        tailIndicator.textContent = "Tail";
        tailIndicator.style.cssText = `
          position: absolute;
          bottom: -20px;
          font-size: 12px;
          color: #2196f3;
        `;
        queueElement.appendChild(tailIndicator);
      }
    });
  }

  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }

  async function enqueue(value) {
    highlightCodeLine("code-line-1");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (queue.length >= maxQueueSize) {
      highlightCodeLine("code-line-2");
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Queue is full! Cannot enqueue more elements.");
      highlightCodeLine("code-line-3");
      return;
    }
    highlightCodeLine("code-line-6");
    queue.push(value);
    renderQueue();
    const index = queue.length - 1;
    const element = document.getElementById(`queue-element-${index}`);
    element.style.backgroundColor = "#ffeb3b"; // Highlight the new element
    await new Promise(resolve => setTimeout(resolve, 500));
    element.style.backgroundColor = "#e8f5e9"; // Reset the color
    document.getElementById("queue-output").innerHTML += `<li>Enqueued: ${value}</li>`;
    highlightCodeLine("code-line-7");
  }

  async function dequeue() {
    highlightCodeLine("code-line-9");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (queue.length === 0) {
      highlightCodeLine("code-line-10");
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Queue is empty! Cannot dequeue.");
      highlightCodeLine("code-line-11");
      return;
    }
    highlightCodeLine("code-line-14");
    const value = queue.shift();
    renderQueue();
    document.getElementById("queue-output").innerHTML += `<li>Dequeued: ${value}</li>`;
    highlightCodeLine("code-line-15");
  }

  async function peek() {
    highlightCodeLine("code-line-17");
    await new Promise(resolve => setTimeout(resolve, 500));
    if (queue.length === 0) {
      highlightCodeLine("code-line-18");
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Queue is empty! Cannot peek.");
      highlightCodeLine("code-line-19");
      return;
    }
    highlightCodeLine("code-line-22");
    const value = queue[0];
    const element = document.getElementById(`queue-element-0`);
    element.style.backgroundColor = "#ff9800"; // Highlight the front element
    await new Promise(resolve => setTimeout(resolve, 500));
    element.style.backgroundColor = "#e8f5e9"; // Reset the color
    document.getElementById("queue-output").innerHTML += `<li>Peeked: ${value}</li>`;
  }

  function generateRandomQueue() {
    queue.length = 0; // Clear the queue
    const randomSize = Math.floor(Math.random() * maxQueueSize) + 1;
    for (let i = 0; i < randomSize; i++) {
      queue.push(Math.floor(Math.random() * 100));
    }
    renderQueue();
    document.getElementById("queue-output").innerHTML = `<li>Generated Random Queue: [${queue.join(", ")}]</li>`;
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

  document.getElementById("generateQueue").onclick = () => {
    generateRandomQueue();
  };
  renderQueue();
}

initSection();