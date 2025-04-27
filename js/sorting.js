// ================= Sorting Algorithms ===================

function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🔍 Sorting Algorithms - Array</h2>
    <div class="sort-options">
      <button class="btn-insertion" onclick="renderInsertionSort()">✏️ Insertion Sort</button>
      <button class="btn-bubble" onclick="renderBubbleSort()">🫧 Bubble Sort</button>
      <button class="btn-merge" onclick="renderMergeSort()">🔗 Merge Sort</button>
      <button class="btn-quick" onclick="renderQuickSort()">⚡ Quick Sort</button>
      <button class="btn-selection" onclick="renderSelectionSort()">🎯 Selection Sort</button>
      <button class="btn-radix" onclick="renderRadixSort()">🔢 Radix Sort</button>
      <button class="btn-cyclic" onclick="renderCyclicSort()">🔄 Cyclic Sort</button>
    </div>
    <div id="sort-section"></div>
  `;
  const style = document.createElement("style");
  style.textContent = `
    .sort-options {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }

    .sort-options button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: white;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .sort-options button:hover {
      transform: scale(1.05);
    }

    .sort-options button:active {
      transform: scale(0.95);
    }

    /* Specific colors for each sorting button */
    .btn-insertion {
      background-color: #0078d4;
    }
    .btn-insertion:hover {
      background-color: #005a9e;
    }

    .btn-bubble {
      background-color: #28a745;
    }
    .btn-bubble:hover {
      background-color: #1e7e34;
    }

    .btn-merge {
      background-color: #ffc107;
    }
    .btn-merge:hover {
      background-color: #e0a800;
    }

    .btn-quick {
      background-color: #dc3545;
    }
    .btn-quick:hover {
      background-color: #c82333;
    }

    .btn-selection {
      background-color: #17a2b8;
    }
    .btn-selection:hover {
      background-color: #117a8b;
    }

    .btn-radix {
      background-color: #6f42c1;
    }
    .btn-radix:hover {
      background-color: #5a32a3;
    }

    .btn-cyclic {
      background-color: #fd7e14;
    }
    .btn-cyclic:hover {
      background-color: #e8590c;
    }

    #sort-section {
      margin-top: 20px;
    }
  `;
  document.head.appendChild(style);
}
  // ================= Insertion Sort ===================
  function renderInsertionSort() {
    const section = document.getElementById("sort-section");
    section.innerHTML = `
      <h3>📘 Insertion Sort Visualization</h3>
      <p>Insertion Sort works by taking one element at a time and placing it at the correct position in the sorted part of the array.</p>
  
      <div class="controls">
        <input id="insertionArray" placeholder="Enter array e.g. 5,3,8,6,2" />
        <button onclick="startInsertion()">Start</button>
        <button onclick="generateRandomInsertionArray()">Generate Random Array</button>
      </div>
  
      <div class="visual-chart" id="insertionChart"></div>
      <div class="controls">
        <button onclick="playInsertion()">▶ Play</button>
        <button onclick="pauseInsertion()">⏸ Pause</button>
        <button onclick="stepInsertion()">⏩ Step</button>
      </div>
  
      <div id="insertionExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
  
      <h4>🧠 Algorithm (JavaScript)</h4>
      <pre class="code-block" id="insertionCode">
        <span id="insertionLine1">function insertionSort(arr) {</span>
        <span id="insertionLine2">  for (let i = 1; i < arr.length; i++) {</span>
        <span id="insertionLine3">    let key = arr[i];</span>
        <span id="insertionLine4">    let j = i - 1;</span>
        <span id="insertionLine5">    while (j >= 0 && arr[j] > key) {</span>
        <span id="insertionLine6">      arr[j + 1] = arr[j];</span>
        <span id="insertionLine7">      j = j - 1;</span>
        <span id="insertionLine8">    }</span>
        <span id="insertionLine9">    arr[j + 1] = key;</span>
        <span id="insertionLine10">  }</span>
        <span id="insertionLine11">}</span>
      </pre>
  
      <h4>📈 Time & Space Complexity</h4>
      <ul>
        <li><strong>Time:</strong> Best O(n), Average O(n²), Worst O(n²)</li>
        <li><strong>Space:</strong> O(1)</li>
      </ul>
    `;
  
    injectInsertionSortStyles();
  
    window.insertionData = {
      arr: [],
      index: 1,
      interval: null,
    };
  }
  
  function injectInsertionSortStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .visual-chart {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        margin: 20px 0;
      }
  
      .array-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100px;
        border: 2px solid #ccc;
        background-color: #f9f9f9;
        border-radius: 5px;
        transition: all 0.3s ease;
      }
  
      .array-box .value {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
  
      .array-box .index {
        font-size: 12px;
        color: #777;
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
        transition: background-color 0.3s ease;
      }
  
      .controls button:hover {
        background-color: #ddd;
      }
  
      .code-block {
        background-color:rgb(26, 25, 25);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        overflow-x: auto;
      }
  
      .code-block span {
        display: block;
        margin: 2px 0;
      }
  
      .code-block span.highlight {
        background-color: #ffeb3b;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }
  
  function generateRandomInsertionArray() {
    const size = Math.floor(Math.random() * 8) + 3; 
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)); 
    document.getElementById("insertionArray").value = arr.join(",");
  }
  
  function startInsertion() {
    const input = document.getElementById("insertionArray").value;
    const arr = input.split(",").map(Number);
    window.insertionData = {
      arr,
      index: 1,
      interval: null,
    };
    updateInsertionChart();
    updateInsertionExplanation("Insertion Sort started. Array initialized.");
  }
  
  function updateInsertionChart() {
    const chart = document.getElementById("insertionChart");
    const { arr, index } = window.insertionData;
    chart.innerHTML = arr
      .map((val, i) => {
        const color = i === index ? "orange" : "#ccc";
        return `
          <div class="array-box" style="border: 1px solid ${color};">
            <div class="value">${val}</div>
            <div class="index">Index: ${i}</div>
          </div>
        `;
      })
      .join("");
  }
  
  function updateInsertionExplanation(message) {
    const explanation = document.getElementById("insertionExplanation");
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
  
  function stepInsertion() {
    const { arr, index } = window.insertionData;
    clearCodeHighlights();
  
    if (index >= arr.length) {
      highlightCodeLine("insertionLine11");
      updateInsertionExplanation("Array is fully sorted!");
      pauseInsertion();
      return;
    }
  
    highlightCodeLine("insertionLine2");
    highlightCodeLine("insertionLine3");
    highlightCodeLine("insertionLine4");
  
    let key = arr[index];
    let j = index - 1;
  
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      highlightCodeLine("insertionLine5");
      highlightCodeLine("insertionLine6");
      updateInsertionChart();
    }
  
    arr[j + 1] = key;
    window.insertionData.index++;
    updateInsertionChart();
    updateInsertionExplanation(`Inserted ${key} at the correct position.`);
  }
  
  function playInsertion() {
    pauseInsertion();
    window.insertionData.interval = setInterval(stepInsertion, 1000);
  }
  
  function pauseInsertion() {
    clearInterval(window.insertionData.interval);
  }
  // ================= Bubble Sort ===================
  function renderBubbleSort() {
    const section = document.getElementById("sort-section");
    section.innerHTML = `
      <h3>📙 Bubble Sort Visualization</h3>
      <p>Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order.</p>
  
      <div class="controls">
        <input id="bubbleArray" placeholder="Enter array e.g. 5,3,8,6,2" />
        <button onclick="startBubbleSort()">Start</button>
        <button onclick="generateRandomBubbleArray()">Generate Random Array</button>
      </div>
  
      <div class="visual-chart" id="bubbleChart"></div>
      <div class="controls">
        <button onclick="playBubbleSort()">▶ Play</button>
        <button onclick="pauseBubbleSort()">⏸ Pause</button>
        <button onclick="stepBubbleSort()">⏩ Step</button>
      </div>
  
      <div id="bubbleExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
  
      <h4>🧠 Algorithm (JavaScript)</h4>
      <pre class="code-block" id="bubbleCode">
        <span id="bubbleLine1">function bubbleSort(arr) {</span>
        <span id="bubbleLine2">  for (let i = 0; i < arr.length - 1; i++) {</span>
        <span id="bubbleLine3">    for (let j = 0; j < arr.length - i - 1; j++) {</span>
        <span id="bubbleLine4">      if (arr[j] > arr[j + 1]) {</span>
        <span id="bubbleLine5">        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];</span>
        <span id="bubbleLine6">      }</span>
        <span id="bubbleLine7">    }</span>
        <span id="bubbleLine8">  }</span>
        <span id="bubbleLine9">}</span>
      </pre>
  
      <h4>📈 Time & Space Complexity</h4>
      <ul>
        <li><strong>Time:</strong> Best O(n), Average O(n²), Worst O(n²)</li>
        <li><strong>Space:</strong> O(1)</li>
      </ul>
    `;
  
    injectBubbleSortStyles();
  
    window.bubbleData = {
      arr: [],
      i: 0,
      j: 0,
      interval: null,
    };
  }
  
  function injectBubbleSortStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .visual-chart {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        margin: 20px 0;
      }
  
      .array-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100px;
        border: 2px solid #ccc;
        background-color: #f9f9f9;
        border-radius: 5px;
        transition: all 0.3s ease;
      }
  
      .array-box .value {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
  
      .array-box .index {
        font-size: 12px;
        color: #777;
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
        transition: background-color 0.3s ease;
      }
  
      .controls button:hover {
        background-color: #ddd;
      }
  
      .code-block {
        background-color:rgb(27, 26, 26);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        overflow-x: auto;
      }
  
      .code-block span {
        display: block;
        margin: 2px 0;
      }
  
      .code-block span.highlight {
        background-color: #ffeb3b;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }
  
  function generateRandomBubbleArray() {
    const size = Math.floor(Math.random() * 8) + 3; 
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)); 
    document.getElementById("bubbleArray").value = arr.join(",");
  }
  
  function startBubbleSort() {
    const input = document.getElementById("bubbleArray").value;
    const arr = input.split(",").map(Number);
    window.bubbleData = {
      arr,
      i: 0,
      j: 0,
      interval: null,
    };
    updateBubbleChart();
    updateBubbleExplanation("Bubble Sort started. Array initialized.");
  }
  
  function updateBubbleChart() {
    const chart = document.getElementById("bubbleChart");
    const { arr, j } = window.bubbleData;
    chart.innerHTML = arr
      .map((val, index) => {
        const color = index === j || index === j + 1 ? "orange" : "#ccc";
        return `
          <div class="array-box" style="border: 1px solid ${color};">
            <div class="value">${val}</div>
            <div class="index">Index: ${index}</div>
          </div>
        `;
      })
      .join("");
  }
  
  function updateBubbleExplanation(message) {
    const explanation = document.getElementById("bubbleExplanation");
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
  
  function stepBubbleSort() {
    const { arr, i, j } = window.bubbleData;
    clearCodeHighlights();
  
    if (i >= arr.length - 1) {
      highlightCodeLine("bubbleLine9");
      updateBubbleExplanation("Array is fully sorted!");
      pauseBubbleSort();
      return;
    }
  
    highlightCodeLine("bubbleLine2");
    highlightCodeLine("bubbleLine3");
  
    if (arr[j] > arr[j + 1]) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      highlightCodeLine("bubbleLine4");
      highlightCodeLine("bubbleLine5");
      updateBubbleExplanation(`Swapped ${arr[j]} and ${arr[j + 1]}.`);
    }
  
    window.bubbleData.j++;
    if (window.bubbleData.j >= arr.length - i - 1) {
      window.bubbleData.j = 0;
      window.bubbleData.i++;
      updateBubbleExplanation(`Completed pass ${i + 1}.`);
    }
  
    updateBubbleChart();
  }
  
  function playBubbleSort() {
    pauseBubbleSort();
    window.bubbleData.interval = setInterval(stepBubbleSort, 1000);
  }
  
  function pauseBubbleSort() {
    clearInterval(window.bubbleData.interval);
  }
  // ================= Merge Sort ===================

  function renderMergeSort() {
    const section = document.getElementById("sort-section");
    section.innerHTML = `
      <h3>📙 Merge Sort Visualization</h3>
      <p>Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts them, and then merges the sorted halves.</p>
  
      <div class="controls">
        <input id="mergeArray" placeholder="Enter array e.g. 3,1,4,1,5,9" />
        <button onclick="startMergeSort()">Start</button>
        <button onclick="generateRandomMergeArray()">Generate Random Array</button>
      </div>
  
      <div class="visual-chart" id="mergeChart"></div>
      <div class="controls">
        <button onclick="playMergeSort()">▶ Play</button>
        <button onclick="pauseMergeSort()">⏸ Pause</button>
        <button onclick="stepMergeSort()">⏩ Step</button>
      </div>
  
      <div id="mergeExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
  
      <h4>🧠 Algorithm (JavaScript)</h4>
      <pre class="code-block" id="mergeCode">
        <span id="mergeLine1">function mergeSort(arr) {</span>
        <span id="mergeLine2">  if (arr.length <= 1) return arr;</span>
        <span id="mergeLine3">  const mid = Math.floor(arr.length / 2);</span>
        <span id="mergeLine4">  const left = mergeSort(arr.slice(0, mid));</span>
        <span id="mergeLine5">  const right = mergeSort(arr.slice(mid));</span>
        <span id="mergeLine6">  return merge(left, right);</span>
        <span id="mergeLine7">}</span>
        <span id="mergeLine8">function merge(left, right) {</span>
        <span id="mergeLine9">  let result = [], i = 0, j = 0;</span>
        <span id="mergeLine10">  while (i < left.length && j < right.length) {</span>
        <span id="mergeLine11">    if (left[i] < right[j]) {</span>
        <span id="mergeLine12">      result.push(left[i]);</span>
        <span id="mergeLine13">      i++;</span>
        <span id="mergeLine14">    } else {</span>
        <span id="mergeLine15">      result.push(right[j]);</span>
        <span id="mergeLine16">      j++;</span>
        <span id="mergeLine17">    }</span>
        <span id="mergeLine18">  }</span>
        <span id="mergeLine19">  return result.concat(left.slice(i), right.slice(j));</span>
        <span id="mergeLine20">}</span>
      </pre>
  
      <h4>📈 Time & Space Complexity</h4>
      <ul>
        <li><strong>Time:</strong> Best O(n log n), Average O(n log n), Worst O(n log n)</li>
        <li><strong>Space:</strong> O(n)</li>
      </ul>
    `;
  
    injectMergeSortStyles();
  
    window.mergeData = {
      arr: [],
      steps: [],
      stepIndex: 0,
      interval: null,
    };
  }
  
  function injectMergeSortStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .visual-chart {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        margin: 20px 0;
      }
  
      .array-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100px;
        border: 2px solid #ccc;
        background-color: #f9f9f9;
        border-radius: 5px;
        transition: all 0.3s ease;
      }
  
      .array-box .value {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
  
      .array-box .index {
        font-size: 12px;
        color: #777;
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
        transition: background-color 0.3s ease;
      }
  
      .controls button:hover {
        background-color: #ddd;
      }
  
      .code-block {
        background-color:rgb(40, 38, 38);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        overflow-x: auto;
      }
  
      .code-block span {
        display: block;
        margin: 2px 0;
      }
  
      .code-block span.highlight {
        background-color: #ffeb3b;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }
  
  function generateRandomMergeArray() {
    const size = Math.floor(Math.random() * 8) + 3; 
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)); 
    document.getElementById("mergeArray").value = arr.join(",");
  }
  
  function startMergeSort() {
    const input = document.getElementById("mergeArray").value;
    const arr = input.split(",").map(Number);
    const steps = [];
    mergeSortWithSteps(arr, steps);
  
    window.mergeData = {
      arr,
      steps,
      stepIndex: 0,
      interval: null,
    };
  
    updateMergeChart(arr);
    updateMergeExplanation("Merge Sort started. Array initialized.");
  }
  
  function mergeSortWithSteps(arr, steps) {
    if (arr.length <= 1) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortWithSteps(arr.slice(0, mid), steps);
    const right = mergeSortWithSteps(arr.slice(mid), steps);
    const merged = merge(left, right);
  
    steps.push([...merged]); 
    return merged;
  }
  
  function merge(left, right) {
    let result = [],
      i = 0,
      j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    return result.concat(left.slice(i), right.slice(j));
  }
  
  function updateMergeChart(array) {
    const chart = document.getElementById("mergeChart");
    chart.innerHTML = array
      .map((val, index) => {
        return `
          <div class="array-box">
            <div class="value">${val}</div>
            <div class="index">Index: ${index}</div>
          </div>
        `;
      })
      .join("");
  }
  
  function updateMergeExplanation(message) {
    const explanation = document.getElementById("mergeExplanation");
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
  
  function stepMergeSort() {
    const { steps, stepIndex } = window.mergeData;
  
    clearCodeHighlights();
  
    if (stepIndex >= steps.length) {
      highlightCodeLine("mergeLine7");
      updateMergeExplanation("Array is fully sorted!");
      pauseMergeSort();
      return;
    }
  
    const currentStep = steps[stepIndex];
    window.mergeData.arr = currentStep;
    updateMergeChart(currentStep);
    updateMergeExplanation(`Merged step ${stepIndex + 1}.`);
    window.mergeData.stepIndex++;
  }
  
  function playMergeSort() {
    pauseMergeSort();
    window.mergeData.interval = setInterval(stepMergeSort, 1000);
  }
  
  function pauseMergeSort() {
    clearInterval(window.mergeData.interval);
  }

// ================= Quick Sort ===================

function renderQuickSort() {
  const section = document.getElementById("sort-section");
  section.innerHTML = `
    <h3>📙 Quick Sort Visualization</h3>
    <p>Quick Sort is a divide-and-conquer algorithm that picks a pivot element, partitions the array into two sub-arrays (elements less than the pivot and elements greater than the pivot), and recursively sorts them.</p>

    <div class="controls">
      <input id="quickArray" placeholder="Enter array e.g. 3,1,4,1,5,9" />
      <button onclick="startQuickSort()">Start</button>
      <button onclick="generateRandomQuickArray()">Generate Random Array</button>
    </div>

    <div class="visual-chart" id="quickChart"></div>
    <div class="controls">
      <button onclick="playQuickSort()">▶ Play</button>
      <button onclick="pauseQuickSort()">⏸ Pause</button>
      <button onclick="stepQuickSort()">⏩ Step</button>
    </div>

    <div id="quickExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>

    <h4>🧠 Algorithm (JavaScript)</h4>
    <pre class="code-block" id="quickCode">
      <span id="quickLine1">function quickSort(arr) {</span>
      <span id="quickLine2">  if (arr.length <= 1) return arr;</span>
      <span id="quickLine3">  let pivot = arr[arr.length - 1];</span>
      <span id="quickLine4">  let left = [], right = [];</span>
      <span id="quickLine5">  for (let i = 0; i < arr.length - 1; i++) {</span>
      <span id="quickLine6">    if (arr[i] < pivot) left.push(arr[i]);</span>
      <span id="quickLine7">    else right.push(arr[i]);</span>
      <span id="quickLine8">  }</span>
      <span id="quickLine9">  return [...quickSort(left), pivot, ...quickSort(right)];</span>
      <span id="quickLine10">}</span>
    </pre>

    <h4>📈 Time & Space Complexity</h4>
    <ul>
      <li><strong>Time:</strong> Best O(n log n), Average O(n log n), Worst O(n²)</li>
      <li><strong>Space:</strong> O(log n) (recursive stack space)</li>
    </ul>
  `;

  injectQuickSortStyles();

  window.quickData = {
    arr: [],
    steps: [],
    stepIndex: 0,
    interval: null,
    pivotIndex: -1,
  };
}

function injectQuickSortStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .visual-chart {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 10px;
      margin: 20px 0;
    }

    .array-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100px;
      border: 2px solid #ccc;
      background-color: #f9f9f9;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .array-box .value {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .array-box .index {
      font-size: 12px;
      color: #777;
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
      transition: background-color 0.3s ease;
    }

    .controls button:hover {
      background-color: #ddd;
    }

    .code-block {
      background-color:rgb(41, 39, 39);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      overflow-x: auto;
    }

    .code-block span {
      display: block;
      margin: 2px 0;
    }

    .code-block span.highlight {
      background-color: #ffeb3b;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
}

function generateRandomQuickArray() {
  const size = Math.floor(Math.random() * 8) + 3; 
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)); 
  document.getElementById("quickArray").value = arr.join(",");
}

function startQuickSort() {
  const input = document.getElementById("quickArray").value;
  const arr = input.split(",").map(Number).filter((x) => !isNaN(x));

  const steps = [];
  const sorted = quickSortWithSteps(arr, steps, 0); 

  window.quickData = {
    arr,
    steps,
    stepIndex: 0,
    interval: null,
    pivotIndex: -1,
    sorted, 
  };

  updateQuickChart(arr);
  updateQuickExplanation("Quick Sort started. Array initialized.");
}

function quickSortWithSteps(arr, steps = [], startIdx = 0) {
  if (arr.length <= 1) return arr;

  let pivot = arr[arr.length - 1];
  let left = [],
    right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  const merged = [...left, pivot, ...right];
  steps.push({ array: [...merged], pivotIndex: left.length + startIdx });

  const sortedLeft = quickSortWithSteps(left, steps, startIdx);
  const sortedRight = quickSortWithSteps(right, steps, startIdx + left.length + 1);

  return [...sortedLeft, pivot, ...sortedRight];
}

function updateQuickChart(array) {
  const chart = document.getElementById("quickChart");
  chart.innerHTML = array
    .map((val, i) => {
      const color = i === window.quickData.pivotIndex ? "blue" : "#ccc";
      return `
        <div class="array-box">
          <div class="value">${val}</div>
          <div class="index">Index: ${i}</div>
        </div>
      `;
    })
    .join("");
}

function updateQuickExplanation(message) {
  const explanation = document.getElementById("quickExplanation");
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

function stepQuickSort() {
  clearCodeHighlights();

  const { steps, stepIndex, sorted } = window.quickData;

  if (stepIndex === 0) {
    highlightCodeLine("quickLine1");
    highlightCodeLine("quickLine2");
  } else if (stepIndex === 1) {
    highlightCodeLine("quickLine3");
    highlightCodeLine("quickLine4");
  } else if (stepIndex === 2) {
    highlightCodeLine("quickLine5");
    highlightCodeLine("quickLine6");
    highlightCodeLine("quickLine7");
  } else {
    highlightCodeLine("quickLine9");

    if (stepIndex - 3 >= steps.length) {
      pauseQuickSort();
      window.quickData.arr = sorted;
      window.quickData.pivotIndex = -1;
      showSortedArray(sorted);
      return;
    }

    const step = steps[stepIndex - 3];
    window.quickData.arr = step.array;
    window.quickData.pivotIndex = step.pivotIndex;
    updateQuickChart(step.array);
  }

  window.quickData.stepIndex++;
}

function showSortedArray(sorted) {
  const chart = document.getElementById("quickChart");

  chart.innerHTML = sorted
    .map((val) => {
      return `<div class="array-box" style="background:green">${val}</div>`;
    })
    .join("");
  const result = document.createElement("p");
  result.innerHTML = `<strong>✅ Sorted Array:</strong> [${sorted.join(", ")}]`;
  chart.insertAdjacentElement("afterend", result);
}

function playQuickSort() {
  pauseQuickSort();
  window.quickData.interval = setInterval(stepQuickSort, 1000);
}

function pauseQuickSort() {
  clearInterval(window.quickData.interval);
}

  // ================= Selection Sort ===================

  function renderSelectionSort() {
    const section = document.getElementById("sort-section");
    section.innerHTML = `
      <h3>📒 Selection Sort Visualization</h3>
      <p>Selection Sort works by repeatedly finding the minimum element from the unsorted part and swapping it with the first unsorted element.</p>
  
      <div class="controls">
        <input id="selectionArray" placeholder="Enter array e.g. 64,25,12,22,11" />
        <button onclick="startSelection()">Start</button>
        <button onclick="generateRandomSelectionArray()">Generate Random Array</button>
      </div>
  
      <div class="visual-chart" id="selectionChart"></div>
      <div class="controls">
        <button onclick="playSelection()">▶ Play</button>
        <button onclick="pauseSelection()">⏸ Pause</button>
        <button onclick="stepSelection()">⏩ Step</button>
      </div>
  
      <div id="selectionExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>
  
      <h4>🧠 Algorithm (JavaScript)</h4>
      <pre class="code-block" id="selectionCode">
        <span id="selectionLine1">function selectionSort(arr) {</span>
        <span id="selectionLine2">  for (let i = 0; i < arr.length - 1; i++) {</span>
        <span id="selectionLine3">    let minIndex = i;</span>
        <span id="selectionLine4">    for (let j = i + 1; j < arr.length; j++) {</span>
        <span id="selectionLine5">      if (arr[j] < arr[minIndex]) {</span>
        <span id="selectionLine6">        minIndex = j;</span>
        <span id="selectionLine7">      }</span>
        <span id="selectionLine8">    }</span>
        <span id="selectionLine9">    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];</span>
        <span id="selectionLine10">  }</span>
        <span id="selectionLine11">}</span>
      </pre>
      <h4>📈 Time & Space Complexity</h4>
      <ul>
        <li><strong>Time:</strong> Best O(n²), Average O(n²), Worst O(n²)</li>
        <li><strong>Space:</strong> O(1)</li>
      </ul>
    `;
  
    injectSelectionSortStyles();
  
    window.selectionData = {
      arr: [],
      i: 0,
      j: 0,
      minIndex: 0,
      interval: null,
    };
  }
  
  function injectSelectionSortStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .visual-chart {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        margin: 20px 0;
      }
  
      .array-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100px;
        border: 2px solid #ccc;
        background-color: #f9f9f9;
        border-radius: 5px;
        transition: all 0.3s ease;
      }
  
      .array-box .value {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
  
      .array-box .index {
        font-size: 12px;
        color: #777;
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
        transition: background-color 0.3s ease;
      }
  
      .controls button:hover {
        background-color: #ddd;
      }
  
      .code-block {
        background-color:rgb(38, 37, 37);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        overflow-x: auto;
      }
  
      .code-block span {
        display: block;
        margin: 2px 0;
      }
  
      .code-block span.highlight {
        background-color: #ffeb3b;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }
  
  function generateRandomSelectionArray() {
    const size = Math.floor(Math.random() * 8) + 3; 
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)); 
    document.getElementById("selectionArray").value = arr.join(",");
  }
  
  function startSelection() {
    const input = document.getElementById("selectionArray").value;
    const arr = input.split(",").map(Number);
    window.selectionData = {
      arr,
      i: 0,
      j: 0,
      minIndex: 0,
      interval: null,
    };
    updateSelectionChart();
    updateSelectionExplanation("Selection Sort started. Array initialized.");
  }
  
  function updateSelectionChart() {
    const chart = document.getElementById("selectionChart");
    const { arr, i, j, minIndex } = window.selectionData;
    chart.innerHTML = arr
      .map((val, index) => {
        let color = "#ccc";
        if (index === i) color = "orange"; 
        if (index === j) color = "blue"; 
        if (index === minIndex) color = "green";
        return `
          <div class="array-box" style="border: 1px solid ${color};">
            <div class="value">${val}</div>
            <div class="index">Index: ${index}</div>
          </div>
        `;
      })
      .join("");
  }
  
  function updateSelectionExplanation(message) {
    const explanation = document.getElementById("selectionExplanation");
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
  
  function stepSelection() {
    const { arr, i, j, minIndex } = window.selectionData;
    clearCodeHighlights();
  
    if (i >= arr.length - 1) {
      highlightCodeLine("selectionLine11");
      updateSelectionExplanation("Array is fully sorted!");
      pauseSelection();
      return;
    }
  
    if (j === 0) {
      highlightCodeLine("selectionLine2");
      highlightCodeLine("selectionLine3");
      window.selectionData.minIndex = i;
      updateSelectionExplanation(`Starting new iteration at index ${i}.`);
    }
  
    if (j < arr.length) {
      highlightCodeLine("selectionLine4");
      if (arr[j] < arr[minIndex]) {
        highlightCodeLine("selectionLine5");
        highlightCodeLine("selectionLine6");
        window.selectionData.minIndex = j;
        updateSelectionExplanation(
          `Found new minimum value ${arr[j]} at index ${j}.`
        );
      }
      window.selectionData.j++;
    } else {
      highlightCodeLine("selectionLine9");
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      window.selectionData.i++;
      window.selectionData.j = i + 1;
      updateSelectionExplanation(
        `Swapped ${arr[minIndex]} with ${arr[i]}. Moving to the next index.`
      );
    }
  
    updateSelectionChart();
  }
  
  function playSelection() {
    pauseSelection();
    window.selectionData.interval = setInterval(stepSelection, 1000);
  }
  
  function pauseSelection() {
    clearInterval(window.selectionData.interval);
  }
// ================= Radix Sort ===================

function renderRadixSort() {
  const section = document.getElementById("sort-section");
  section.innerHTML = `
    <h3>📒 Radix Sort Visualization</h3>
    <p>Radix Sort sorts numbers digit by digit, starting from the least significant digit (LSD) or the most significant digit (MSD), using counting sort as a subroutine.</p>

    <div class="controls">
      <input id="radixArray" placeholder="Enter array e.g. 170,45,75,90" />
      <button onclick="startRadix()">Start</button>
      <button onclick="generateRandomRadixArray()">Generate Random Array</button>
    </div>

    <div class="visual-chart" id="radixChart"></div>
    <div class="controls">
      <button onclick="playRadix()">▶ Play</button>
      <button onclick="pauseRadix()">⏸ Pause</button>
      <button onclick="stepRadix()">⏩ Step</button>
    </div>

    <div id="radixExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>

    <h4>🧠 Algorithm (JavaScript)</h4>
    <pre class="code-block" id="radixCode">
      <span id="radixLine1">function radixSort(arr) {</span>
      <span id="radixLine2">  let max = Math.max(...arr);</span>
      <span id="radixLine3">  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {</span>
      <span id="radixLine4">    countingSortByDigit(arr, exp);</span>
      <span id="radixLine5">  }</span>
      <span id="radixLine6">}</span>
      <span id="radixLine7">function countingSortByDigit(arr, exp) {</span>
      <span id="radixLine8">  let output = new Array(arr.length);</span>
      <span id="radixLine9">  let count = new Array(10).fill(0);</span>
      <span id="radixLine10">  for (let i = 0; i < arr.length; i++) {</span>
      <span id="radixLine11">    count[Math.floor(arr[i] / exp) % 10]++;</span>
      <span id="radixLine12">  }</span>
      <span id="radixLine13">  for (let i = 1; i < 10; i++) {</span>
      <span id="radixLine14">    count[i] += count[i - 1];</span>
      <span id="radixLine15">  }</span>
      <span id="radixLine16">  for (let i = arr.length - 1; i >= 0; i--) {</span>
      <span id="radixLine17">    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];</span>
      <span id="radixLine18">    count[Math.floor(arr[i] / exp) % 10]--;</span>
      <span id="radixLine19">  }</span>
      <span id="radixLine20">  for (let i = 0; i < arr.length; i++) {</span>
      <span id="radixLine21">    arr[i] = output[i];</span>
      <span id="radixLine22">  }</span>
      <span id="radixLine23">}</span>
    </pre>
    <h4>📈 Time & Space Complexity</h4>
    <ul>
      <li><strong>Time:</strong> Best O(nk), Average O(nk), Worst O(nk) where n is the number of elements and k is the number of digits in the maximum number.</li>
      <li><strong>Space:</strong> O(n)</li>
    </ul>
  `;

  injectRadixSortStyles();

  window.radixData = {
    arr: [],
    exp: 1,
    interval: null,
  };
}

function injectRadixSortStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .visual-chart {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 10px;
      margin: 20px 0;
    }

    .array-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100px;
      border: 2px solid #ccc;
      background-color: #f9f9f9;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .array-box .value {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .array-box .index {
      font-size: 12px;
      color: #777;
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
      transition: background-color 0.3s ease;
    }

    .controls button:hover {
      background-color: #ddd;
    }

    .code-block {
      background-color:rgb(48, 46, 46);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      overflow-x: auto;
    }

    .code-block span {
      display: block;
      margin: 2px 0;
    }

    .code-block span.highlight {
      background-color: #ffeb3b;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
}

function generateRandomRadixArray() {
  const size = Math.floor(Math.random() * 8) + 3; 
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000)); 
  document.getElementById("radixArray").value = arr.join(",");
}

function startRadix() {
  const input = document.getElementById("radixArray").value;
  const arr = input.split(",").map(Number);
  window.radixData = {
    arr,
    exp: 1,
    interval: null,
  };
  updateRadixChart();
  updateRadixExplanation("Radix Sort started. Array initialized.");
}

function updateRadixChart() {
  const chart = document.getElementById("radixChart");
  const { arr } = window.radixData;
  chart.innerHTML = arr
    .map((val, index) => {
      return `
        <div class="array-box">
          <div class="value">${val}</div>
          <div class="index">Index: ${index}</div>
        </div>
      `;
    })
    .join("");
}

function updateRadixExplanation(message) {
  const explanation = document.getElementById("radixExplanation");
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

function stepRadix() {
  const { arr, exp } = window.radixData;
  clearCodeHighlights();

  if (exp > Math.max(...arr)) {
    highlightCodeLine("radixLine6");
    updateRadixExplanation("Array is fully sorted!");
    pauseRadix();
    return;
  }

  highlightCodeLine("radixLine2");
  highlightCodeLine("radixLine3");
  highlightCodeLine("radixLine4");

  countingSortByDigit(arr, exp);
  window.radixData.exp *= 10;
  updateRadixChart();
  updateRadixExplanation(`Sorted by digit at place ${exp}.`);
}

function countingSortByDigit(arr, exp) {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

function playRadix() {
  pauseRadix();
  window.radixData.interval = setInterval(stepRadix, 1000);
}

function pauseRadix() {
  clearInterval(window.radixData.interval);
}
// ================= Cyclic Sort ===================

function renderCyclicSort() {
  const section = document.getElementById("sort-section");
  section.innerHTML = `
    <h3>📒 Cyclic Sort Visualization</h3>
    <p>Cyclic Sort is an efficient sorting algorithm for arrays containing numbers in a range from 1 to n (or 0 to n-1). It works by placing each number at its correct position.</p>

    <div class="controls">
      <input id="cyclicArray" placeholder="Enter array e.g. 3,1,2,4,5" />
      <button onclick="startCyclic()">Start</button>
      <button onclick="generateRandomArray()">Generate Random Array</button>
    </div>

    <div class="visual-chart" id="cyclicChart"></div>
    <div class="controls">
      <button onclick="playCyclic()">▶ Play</button>
      <button onclick="pauseCyclic()">⏸ Pause</button>
      <button onclick="stepCyclic()">⏩ Step</button>
    </div>

    <div id="cyclicExplanation" style="margin-top: 20px; font-size: 16px; color: #333;"></div>

    <h4>🧠 Algorithm (JavaScript)</h4>
    <pre class="code-block" id="cyclicCode">
      <span id="cyclicLine1">function cyclicSort(arr) {</span>
      <span id="cyclicLine2">  let i = 0;</span>
      <span id="cyclicLine3">  while (i < arr.length) {</span>
      <span id="cyclicLine4">    let correctIndex = arr[i] - 1;</span>
      <span id="cyclicLine5">    if (arr[i] !== arr[correctIndex]) {</span>
      <span id="cyclicLine6">      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];</span>
      <span id="cyclicLine7">    } else {</span>
      <span id="cyclicLine8">      i++;</span>
      <span id="cyclicLine9">    }</span>
      <span id="cyclicLine10">  }</span>
      <span id="cyclicLine11">}</span>
    </pre>
    <h4>📈 Time & Space Complexity</h4>
    <ul>
      <li><strong>Time:</strong> Best O(n), Average O(n), Worst O(n)</li>
      <li><strong>Space:</strong> O(1)</li>
    </ul>
  `;

  injectCyclicSortStyles();

  window.cyclicData = {
    arr: [],
    i: 0,
    interval: null,
  };
}

function injectCyclicSortStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .visual-chart {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 10px;
      margin: 20px 0;
    }

    .array-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100px;
      border: 2px solid #ccc;
      background-color: #f9f9f9;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .array-box .value {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .array-box .index {
      font-size: 12px;
      color: #777;
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
      transition: background-color 0.3s ease;
    }

    .controls button:hover {
      background-color: #ddd;
    }

    .code-block {
      background-color:rgb(32, 30, 30);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      overflow-x: auto;
    }

    .code-block span {
      display: block;
      margin: 2px 0;
    }

    .code-block span.highlight {
      background-color: #ffeb3b;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
}

function generateRandomArray() {
  const size = Math.floor(Math.random() * 8) + 3; 
  const arr = Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5); 
  document.getElementById("cyclicArray").value = arr.join(",");
}

function startCyclic() {
  const input = document.getElementById("cyclicArray").value;
  const arr = input.split(",").map(Number);
  window.cyclicData = {
    arr,
    i: 0,
    interval: null,
  };
  updateCyclicChart();
  updateCyclicExplanation("Cyclic Sort started. Array initialized.");
}

function updateCyclicChart() {
  const chart = document.getElementById("cyclicChart");
  const { arr, i } = window.cyclicData;
  chart.innerHTML = arr
    .map((val, index) => {
      const color = index === i ? "orange" : "#ccc";
      return `
        <div class="array-box" style="border: 1px solid ${color};">
          <div class="value">${val}</div>
          <div class="index">Index: ${index}</div>
        </div>
      `;
    })
    .join("");
}

function updateCyclicExplanation(message) {
  const explanation = document.getElementById("cyclicExplanation");
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

function stepCyclic() {
  const { arr, i } = window.cyclicData;
  clearCodeHighlights();

  if (i >= arr.length) {
    highlightCodeLine("cyclicLine11");
    updateCyclicExplanation("Array is fully sorted!");
    pauseCyclic();
    return;
  }

  highlightCodeLine("cyclicLine2");
  highlightCodeLine("cyclicLine3");

  const correctIndex = arr[i] - 1;
  if (arr[i] !== arr[correctIndex]) {
    highlightCodeLine("cyclicLine5");
    highlightCodeLine("cyclicLine6");
    [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
    updateCyclicExplanation(
      `Swapped ${arr[correctIndex]} and ${arr[i]} to place ${arr[correctIndex]} in its correct position.`
    );
  } else {
    highlightCodeLine("cyclicLine7");
    updateCyclicExplanation(
      `${arr[i]} is already in its correct position. Moving to the next index.`
    );
    window.cyclicData.i++;
  }

  updateCyclicChart();
}

function playCyclic() {
  pauseCyclic();
  window.cyclicData.interval = setInterval(stepCyclic, 1000);
}

function pauseCyclic() {
  clearInterval(window.cyclicData.interval);
}