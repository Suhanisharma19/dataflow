function initSection() {
    const content = document.getElementById("content-area");
    content.innerHTML = `
      <h2>🔑 Open Addressing Hashing</h2>
      <p>Open Addressing is a collision resolution technique in hashing where all elements are stored in the hash table itself. When a collision occurs, the algorithm searches for the next available slot in the table using a probing technique.</p>
      <h3>How Open Addressing Works:</h3>
      <ol>
        <li>Compute the hash value of the key using a hash function.</li>
        <li>If the slot at the computed hash index is empty, insert the key there.</li>
        <li>If the slot is occupied, use a probing technique (e.g., linear probing, quadratic probing) to find the next available slot.</li>
        <li>Repeat the process until the key is inserted or the table is full.</li>
      </ol>
      <h3>Key Characteristics:</h3>
      <ul>
        <li><strong>Efficient Space Usage:</strong> All elements are stored in the hash table itself.</li>
        <li><strong>Probing Techniques:</strong> Linear probing, quadratic probing, or double hashing can be used to resolve collisions.</li>
        <li><strong>Performance:</strong> Performance degrades as the table becomes full due to clustering.</li>
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
          <div id="code-line-1" class="code-line">const hashTable = Array(size).fill(null);</div>
          <div id="code-line-2" class="code-line">function hash(key) {</div>
          <div id="code-line-3" class="code-line">  return key % size;</div>
          <div id="code-line-4" class="code-line">}</div>
          <div id="code-line-5" class="code-line">function insert(key) {</div>
          <div id="code-line-6" class="code-line">  let index = hash(key);</div>
          <div id="code-line-7" class="code-line">  while (hashTable[index] !== null) {</div>
          <div id="code-line-8" class="code-line">    index = (index + 1) % size;</div>
          <div id="code-line-9" class="code-line">  }</div>
          <div id="code-line-10" class="code-line">  hashTable[index] = key;</div>
          <div id="code-line-11" class="code-line">}</div>
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
        width: 60px;
        height: 60px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
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
  
    const size = 10; 
    let hashTable = Array(size).fill(null); 
    let keys = [23, 45, 12, 33, 56, 78]; 
    function renderHashTable() {
      const hashTableContainer = document.getElementById("hash-table-container");
      hashTableContainer.innerHTML = "";
      for (let i = 0; i < size; i++) {
        const slot = document.createElement("div");
        slot.className = "hash-slot";
        slot.id = `slot-${i}`;
        slot.textContent = i;
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
      outputList.innerHTML = ""; 
  
      for (const key of keys) {
        highlightCodeLine("code-line-6");
        let index = key % size;
        highlightCodeLine("code-line-7");
  
        while (hashTable[index] !== null) {
          highlightCodeLine("code-line-8");
          const slot = document.getElementById(`slot-${index}`);
          slot.classList.add("highlight");
          await new Promise(resolve => setTimeout(resolve, 500)); 
          slot.classList.remove("highlight");
  
          index = (index + 1) % size;
        }
  
        highlightCodeLine("code-line-10");
        hashTable[index] = key;
        const slot = document.getElementById(`slot-${index}`);
        slot.textContent = key;
        slot.classList.add("highlight");
  
        // Add to traversal output
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>Inserted Key:</span> ${key} at Index ${index}`;
        outputList.appendChild(listItem);
  
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        slot.classList.remove("highlight");
      }
  
      highlightCodeLine("code-line-11");
    }
  
    function generateRandomKeys() {
      keys = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)); 
      const outputList = document.getElementById("traversal-output");
      outputList.innerHTML = `<li>Generated Keys: ${keys.join(", ")}</li>`;
      hashTable = Array(size).fill(null); 
      renderHashTable(); 
    }
  
    document.getElementById("startInsertion").addEventListener("click", insertKeys);
    document.getElementById("generateKeys").addEventListener("click", generateRandomKeys);
  }
  
  initSection();