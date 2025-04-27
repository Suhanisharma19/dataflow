function initSection() {
    const content = document.getElementById("content-area");
    content.innerHTML = `
      <h2>🔗 Chaining in Hashing</h2>
      <p>Chaining is a collision resolution technique in hashing where each slot in the hash table contains a linked list. When a collision occurs, the new key is added to the linked list at the corresponding slot.</p>
      <h3>How Chaining Works:</h3>
      <ol>
        <li>Compute the hash value of the key using a hash function.</li>
        <li>If the slot at the computed hash index is empty, create a new linked list and insert the key.</li>
        <li>If the slot already contains a linked list, append the key to the list.</li>
      </ol>
      <h3>Key Characteristics:</h3>
      <ul>
        <li><strong>Collision Resolution:</strong> Handles collisions by maintaining a linked list at each slot.</li>
        <li><strong>Dynamic Size:</strong> The linked list can grow dynamically as more keys are added.</li>
        <li><strong>Performance:</strong> Performance depends on the length of the linked lists.</li>
      </ul>
      <div id="hash-table-container" style="margin-top: 20px; display: flex; justify-content: center; flex-wrap: wrap;"></div>
      <button id="startInsertion" style="padding: 10px 20px; background-color: #4caf50; color: white; border: none; cursor: pointer; font-size: 16px; margin-top: 20px;">Insert Keys</button>
      <button id="generateKeys" style="padding: 10px 20px; background-color: #2196f3; color: white; border: none; cursor: pointer; font-size: 16px; margin-left: 10px;">Generate Random Keys</button>
      <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <h3>Traversal Output:</h3>
        <ul id="traversal-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
      </div>
      <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
        <code>
          <div id="code-line-1" class="code-line">const hashTable = Array(size).fill(null).map(() => []);</div>
          <div id="code-line-2" class="code-line">function hash(key) {</div>
          <div id="code-line-3" class="code-line">  return key % size;</div>
          <div id="code-line-4" class="code-line">}</div>
          <div id="code-line-5" class="code-line">function insert(key) {</div>
          <div id="code-line-6" class="code-line">  const index = hash(key);</div>
          <div id="code-line-7" class="code-line">  hashTable[index].push(key);</div>
          <div id="code-line-8" class="code-line">}</div>
        </code>
      </pre>
    `;
    const style = document.createElement("style");
    style.textContent = `
      .code-line {
        font-family: monospace;
        padding: 5px;
        margin: 2px 0;
      }
      .code-line.highlight {
        background-color: yellow;
        font-weight: bold;
      }
      .hash-slot {
        width: 100px;
        min-height: 60px;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px;
        font-family: Arial, sans-serif;
        font-size: 16px;
        font-weight: bold;
        background-color: #f9f9f9;
        transition: background-color 0.3s ease;
      }
      .hash-slot.highlight {
        background-color: orange;
      }
      .linked-list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .linked-list-item {
        padding: 5px 10px;
        margin: 2px 0;
        background-color: #e8f5e9;
        border: 1px solid #c8e6c9;
        border-radius: 5px;
        font-size: 14px;
      }
      #traversal-output li {
        margin: 5px 0;
        padding: 10px;
        background-color: #e8f5e9;
        border: 1px solid #c8e6c9;
        border-radius: 5px;
        font-weight: bold;
      }
      #traversal-output li span {
        color: #388e3c;
      }
    `;
    document.head.appendChild(style);
  
    const size = 10; // Size of the hash table
    let hashTable = Array(size).fill(null).map(() => []); // Initialize the hash table
    let keys = [23, 45, 12, 33, 56, 78]; // Default keys to be inserted
    function renderHashTable() {
      const hashTableContainer = document.getElementById("hash-table-container");
      hashTableContainer.innerHTML = "";
      for (let i = 0; i < size; i++) {
        const slot = document.createElement("div");
        slot.className = "hash-slot";
        slot.id = `slot-${i}`;
        slot.innerHTML = `<div>${i}</div><div class="linked-list" id="list-${i}"></div>`;
        hashTableContainer.appendChild(slot);
      }
    }
  
    renderHashTable();
  
    function highlightCodeLine(lineId) {
      document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
      const line = document.getElementById(lineId);
      if (line) line.classList.add("highlight");
    }
  
    async function insertKeys() {
      const outputList = document.getElementById("traversal-output");
      outputList.innerHTML = ""; // Clear previous output
  
      for (const key of keys) {
        highlightCodeLine("code-line-6");
        const index = key % size;
        highlightCodeLine("code-line-7");
  
        hashTable[index].push(key);
        const list = document.getElementById(`list-${index}`);
        const listItem = document.createElement("div");
        listItem.className = "linked-list-item";
        listItem.textContent = key;
        list.appendChild(listItem);
        const slot = document.getElementById(`slot-${index}`);
        slot.classList.add("highlight");

        const outputItem = document.createElement("li");
        outputItem.innerHTML = `<span>Inserted Key:</span> ${key} at Index ${index}`;
        outputList.appendChild(outputItem);
  
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization
        slot.classList.remove("highlight");
      }
  
      highlightCodeLine("code-line-8");
    }
  
    function generateRandomKeys() {
      keys = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)); // Generate 6 random keys
      const outputList = document.getElementById("traversal-output");
      outputList.innerHTML = `<li>Generated Keys: ${keys.join(", ")}</li>`;
      hashTable = Array(size).fill(null).map(() => []); 
      renderHashTable(); 
    }
  
    document.getElementById("startInsertion").addEventListener("click", insertKeys);
    document.getElementById("generateKeys").addEventListener("click", generateRandomKeys);
  }
  
  initSection();