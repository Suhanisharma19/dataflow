function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🔍 Searching Algorithms - Array</h2>
    <div class="search-options">
      <button class="btn-linear" onclick="renderLinearSearch()">🔎 Linear Search</button>
      <button class="btn-binary" onclick="renderBinarySearch()">📐 Binary Search</button>
    </div>
    <div id="search-section"></div>
  `;

  injectSearchButtonStyles();
}

function injectSearchButtonStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .search-options {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }

    .search-options button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: white;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .search-options button:hover {
      transform: scale(1.05);
    }

    .search-options button:active {
      transform: scale(0.95);
    }

    /* Specific colors and emojis for each searching button */
    .btn-linear {
      background-color: #ff5733; /* Orange for Linear Search */
    }
    .btn-linear:hover {
      background-color: #c44127;
    }

    .btn-binary {
      background-color: #33c4ff; /* Light Blue for Binary Search */
    }
    .btn-binary:hover {
      background-color: #2799c4;
    }
  `;
  document.head.appendChild(style);
}
  // ================= Linear Search ===================
  
  function renderLinearSearch() {
    const section = document.getElementById("search-section");
    section.innerHTML = `
      <h3>📘 Linear Search Visualization</h3>
      <p>Linear search checks each element one-by-one until the target is found or the array ends.</p>
  
      <div class="controls">
        <input id="linearArray" placeholder="Enter array e.g. 1,3,5,7" />
        <input id="linearTarget" placeholder="Enter target" type="number" />
        <button onclick="startLinear()">Start</button>
        <button onclick="generateRandomLinearArray()">Generate Random Array</button>
      </div>
  
      <div class="visual-chart" id="linearChart"></div>
      <div class="controls">
        <button onclick="playLinear()">▶ Play</button>
        <button onclick="pauseLinear()">⏸ Pause</button>
        <button onclick="stepLinear()">⏩ Step</button>
      </div>
  
      <div id="linearExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
  
      <h4>🧠 Algorithm (JavaScript)</h4>
      <pre class="code-block" id="linearCode">
        <span id="linearLine1">function linearSearch(arr, target) {</span>
        <span id="linearLine2">  for (let i = 0; i < arr.length; i++) {</span>
        <span id="linearLine3">    if (arr[i] === target) {</span>
        <span id="linearLine4">      return i;</span>
        <span id="linearLine5">    }</span>
        <span id="linearLine6">  }</span>
        <span id="linearLine7">  return -1;</span>
        <span id="linearLine8">}</span>
      </pre>
  
      <h4>📈 Time & Space Complexity</h4>
      <ul>
        <li><strong>Time:</strong> Best O(1), Average O(n), Worst O(n)</li>
        <li><strong>Space:</strong> O(1)</li>
      </ul>
    `;
  
    injectLinearSearchStyles();
  
    window.linearData = {
      arr: [],
      target: null,
      index: 0,
      interval: null,
    };
  }
  
  function injectLinearSearchStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .visual-chart {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
      }
  
      .array-container {
        display: flex;
        align-items: center;
        gap: 5px;
      }
  
      .array-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: 2px solid #ccc;
        background-color: #f9f9f9;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        transition: all 0.3s ease;
      }
  
      .array-box.current {
        border-color: orange;
      }
  
      .array-box.found {
        background-color: green;
        color: white;
      }
  
      .value {
        font-size: 18px;
        font-weight: bold;
      }
  
      .index {
        margin-top: 5px;
        font-size: 12px;
        color: #555;
      }
  
      .controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 10px 0;
      }
  
      .controls button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #0078d4;
        color: white;
        transition: background-color 0.3s ease;
      }
  
      .controls button:hover {
        background-color: #005a9e;
      }
    `;
    document.head.appendChild(style);
  }
  
  function generateRandomLinearArray() {
    const size = Math.floor(Math.random() * 8) + 5;
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)); 
    document.getElementById("linearArray").value = arr.join(",");
  }
  
  function startLinear() {
    const input = document.getElementById("linearArray").value;
    const target = parseInt(document.getElementById("linearTarget").value);
    const arr = input.split(",").map(Number);
  
    window.linearData = {
      arr,
      target,
      index: 0,
      interval: null,
    };
  
    updateLinearChart();
    updateLinearExplanation("Linear Search started. Array initialized.");
  }
  
  function updateLinearChart() {
    const chart = document.getElementById("linearChart");
    const { arr, index } = window.linearData;
  
    chart.innerHTML = `
      <div class="array-container">
        ${arr
          .map((val, i) => {
            let classes = "array-box";
            if (i === index) classes += " current";
            return `
              <div class="${classes}">
                <div class="value">${val}</div>
                <div class="index">${i}</div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }
  
  function updateLinearExplanation(message) {
    const explanation = document.getElementById("linearExplanation");
    explanation.textContent = message;
  }
  
  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-block span").forEach((span) =>
      span.classList.remove("highlight")
    );
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }
  
  function clearCodeHighlights() {
    document.querySelectorAll(".code-block span").forEach((span) =>
      span.classList.remove("highlight")
    );
  }
  
  function stepLinear() {
    const { arr, target, index } = window.linearData;
  
    clearCodeHighlights();
  
    if (index >= arr.length) {
      highlightCodeLine("linearLine7");
      updateLinearExplanation("Target not found.");
      pauseLinear();
      return;
    }
  
    highlightCodeLine("linearLine2");
    highlightCodeLine("linearLine3");
  
    if (arr[index] === target) {
      document.querySelectorAll(".array-box")[index].classList.add("found");
      highlightCodeLine("linearLine4");
      updateLinearExplanation(`Target ${target} found at index ${index}.`);
      pauseLinear();
      return;
    }
  
    window.linearData.index++;
    updateLinearChart();
  }
  
  function playLinear() {
    pauseLinear();
    window.linearData.interval = setInterval(stepLinear, 1000);
  }
  
  function pauseLinear() {
    clearInterval(window.linearData.interval);
  }
  
  // ================= Binary Search ===================
  
  function renderBinarySearch() {
    const section = document.getElementById("search-section");
    section.innerHTML = `
      <h3>📗 Binary Search Visualization</h3>
      <p>Binary Search works by repeatedly dividing the sorted array into halves to find the target.</p>
  
      <div class="controls">
        <input id="binaryArray" placeholder="Enter sorted array e.g. 1,3,5,7" />
        <input id="binaryTarget" placeholder="Enter target" type="number" />
        <button onclick="startBinary()">Start</button>
        <button onclick="generateRandomBinaryArray()">Generate Random Array</button>
      </div>
  
      <div class="visual-chart" id="binaryChart"></div>
      <div class="controls">
        <button onclick="playBinary()">▶ Play</button>
        <button onclick="pauseBinary()">⏸ Pause</button>
        <button onclick="stepBinary()">⏩ Step</button>
      </div>
  
      <div id="binaryExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
  
      <h4>🧠 Algorithm (JavaScript)</h4>
      <pre class="code-block" id="binaryCode">
        <span id="binaryLine1">function binarySearch(arr, target) {</span>
        <span id="binaryLine2">  let low = 0, high = arr.length - 1;</span>
        <span id="binaryLine3">  while (low <= high) {</span>
        <span id="binaryLine4">    let mid = Math.floor((low + high) / 2);</span>
        <span id="binaryLine5">    if (arr[mid] === target) {</span>
        <span id="binaryLine6">      return mid;</span>
        <span id="binaryLine7">    } else if (arr[mid] < target) {</span>
        <span id="binaryLine8">      low = mid + 1;</span>
        <span id="binaryLine9">    } else {</span>
        <span id="binaryLine10">      high = mid - 1;</span>
        <span id="binaryLine11">    }</span>
        <span id="binaryLine12">  }</span>
        <span id="binaryLine13">  return -1;</span>
        <span id="binaryLine14">}</span>
      </pre>
  
      <h4>📈 Time & Space Complexity</h4>
      <ul>
        <li><strong>Time:</strong> Best O(1), Average O(log n), Worst O(log n)</li>
        <li><strong>Space:</strong> O(1)</li>
      </ul>
    `;
  
    injectBinarySearchStyles();
  
    window.binaryData = {
      arr: [],
      target: null,
      low: 0,
      high: 0,
      mid: 0,
      interval: null,
    };
  }
  
 
  function generateRandomBinaryArray() {
    const size = Math.floor(Math.random() * 8) + 5; 
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b); // Random sorted array
    document.getElementById("binaryArray").value = arr.join(",");
  }
  
  function startBinary() {
    const input = document.getElementById("binaryArray").value;
    const target = parseInt(document.getElementById("binaryTarget").value);
    const arr = input.split(",").map(Number).sort((a, b) => a - b);
  
    window.binaryData = {
      arr,
      target,
      low: 0,
      high: arr.length - 1,
      mid: 0,
      interval: null,
    };
  
    updateBinaryChart();
    updateBinaryExplanation("Binary Search started. Array initialized.");
  }
  
  function updateBinaryChart() {
    const chart = document.getElementById("binaryChart");
    const { arr, low, high, mid } = window.binaryData;
  
    chart.innerHTML = `
      <div class="array-container">
        ${arr
          .map((val, i) => {
            let classes = "array-box";
            if (i === low) classes += " low";
            if (i === high) classes += " high";
            if (i === mid) classes += " mid";
  
            return `
              <div class="${classes}">
                <div class="value">${val}</div>
                <div class="index">${i}</div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }
  
  function injectBinarySearchStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .visual-chart {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
      }
  
      .array-container {
        display: flex;
        align-items: center;
        gap: 5px;
      }
  
      .array-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: 2px solid #ccc;
        background-color: #f9f9f9;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        transition: all 0.3s ease;
      }
  
      .array-box.low {
        border-color: blue;
      }
  
      .array-box.high {
        border-color: purple;
      }
  
      .array-box.mid {
        border-color: orange;
      }
  
      .array-box.found {
        background-color: green;
        color: white;
      }
  
      .value {
        font-size: 18px;
        font-weight: bold;
      }
  
      .index {
        margin-top: 5px;
        font-size: 12px;
        color: #555;
      }
    `;
    document.head.appendChild(style);
  }
  
  function updateBinaryExplanation(message) {
    const explanation = document.getElementById("binaryExplanation");
    explanation.textContent = message;
  }
  
  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-block span").forEach((span) =>
      span.classList.remove("highlight")
    );
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }
  
  function clearCodeHighlights() {
    document.querySelectorAll(".code-block span").forEach((span) =>
      span.classList.remove("highlight")
    );
  }
  
  function stepBinary() {
    const data = window.binaryData;
  
    if (data.low > data.high) {
      updateBinaryExplanation("Target not found.");
      pauseBinary();
      return;
    }
  
    data.mid = Math.floor((data.low + data.high) / 2);
    updateBinaryChart();
  
    clearCodeHighlights();
    highlightCodeLine("binaryLine3"); 
    highlightCodeLine("binaryLine4"); 
  
    if (data.arr[data.mid] === data.target) {
      document.querySelectorAll(".box")[data.mid].classList.add("found");
      highlightCodeLine("binaryLine5"); 
      highlightCodeLine("binaryLine6"); 
      updateBinaryExplanation(`Target ${data.target} found at index ${data.mid}.`);
      pauseBinary();
      return;
    } else if (data.arr[data.mid] < data.target) {
      data.low = data.mid + 1;
      highlightCodeLine("binaryLine7"); 
      highlightCodeLine("binaryLine8"); 
      updateBinaryExplanation(
        `Target is greater than ${data.arr[data.mid]}. Moving low pointer to ${data.low}.`
      );
    } else {
      data.high = data.mid - 1;
      highlightCodeLine("binaryLine9"); 
      highlightCodeLine("binaryLine10"); 
      updateBinaryExplanation(
        `Target is less than ${data.arr[data.mid]}. Moving high pointer to ${data.high}.`
      );
    }
  }
  
  function playBinary() {
    pauseBinary();
    window.binaryData.interval = setInterval(stepBinary, 1000);
  }
  
  function pauseBinary() {
    clearInterval(window.binaryData.interval);
  }