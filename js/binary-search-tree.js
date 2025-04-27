function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🌳 Binary Search Tree (BST)</h2>
    <p><strong>Theory:</strong> A <b>Binary Search Tree (BST)</b> is a binary tree where each node follows the ordering property:
    for any node, all values in its left subtree are less than the node’s value, and all values in its right subtree are greater.
    BSTs allow efficient <b>searching, insertion, and deletion</b> operations with an average time complexity of O(log n).
    </p>
    <ul>
      <li><b>Search:</b> Compare target value with current node. If smaller, move to the left child; if greater, move to the right child.</li>
      <li><b>Insert:</b> Similar to search, find correct empty spot and insert the new node.</li>
      <li><b>Delete:</b> Replace the node appropriately depending on whether it has zero, one, or two children.</li>
    </ul>
    <div id="bst-container" style="width: 800px; height: 400px; border: 1px solid #ccc; margin-bottom: 20px; background-color: #ffffff;"></div>
    <div style="margin-bottom: 20px;">
      <button id="insertNodes" style="padding:10px 20px; background-color: #2196f3; color:white; border:none; cursor:pointer; font-size:16px;">Insert Random Nodes</button>
      <button id="startInorder" style="padding:10px 20px; background-color: #4caf50; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Play Inorder</button>
      <button id="startPreorder" style="padding:10px 20px; background-color: #ff9800; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Play Preorder</button>
      <button id="startPostorder" style="padding:10px 20px; background-color: #9c27b0; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Play Postorder</button>
      <button id="startLevelorder" style="padding:10px 20px; background-color: #795548; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Play Level Order</button>
    </div>
    <div style="margin-bottom: 20px;">
      <input id="searchValue" placeholder="Search Node" style="padding:8px; font-size:16px; width:150px;">
      <button id="searchNode" style="padding:8px 16px; background-color:#00bcd4; color:white; border:none; cursor:pointer;">Search</button>

      <input id="deleteValue" placeholder="Delete Node" style="padding:8px; font-size:16px; width:150px; margin-left:10px;">
      <button id="deleteNode" style="padding:8px 16px; background-color:#f44336; color:white; border:none; cursor:pointer;">Delete</button>
    </div>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Traversal Output:</h3>
      <ul id="traversal-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code id="code-area"></code>
    </pre>
  `;

  const width = 800;
  const height = 400;
  const svg = d3.select("#bst-container").append("svg").attr("width", width).attr("height", height);
  let treeData = null;
  function insertNode(root, value) {
    if (!root) return { value, left: null, right: null };
    if (value < root.value) root.left = insertNode(root.left, value);
    else root.right = insertNode(root.right, value);
    return root;
  }

  function deleteNode(root, key) {
    if (!root) return null;
    if (key < root.value) root.left = deleteNode(root.left, key);
    else if (key > root.value) root.right = deleteNode(root.right, key);
    else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let successor = root.right;
      while (successor.left) successor = successor.left;
      root.value = successor.value;
      root.right = deleteNode(root.right, successor.value);
    }
    return root;
  }

  function generateRandomBST(count = 7) {
    const values = Array.from({ length: count }, () => Math.floor(Math.random() * 100));
    let root = null;
    values.forEach(val => root = insertNode(root, val));
    return root;
  }

  function renderTree(root) {
    svg.selectAll("*").remove();
    if (!root) return;
    const treeLayout = d3.tree().size([width, height - 100]);
    const rootData = d3.hierarchy(root, d => (d ? [d.left, d.right].filter(Boolean) : []));
    const treeData = treeLayout(rootData);
    const ySpacing = 80;
    const yOffset = 50;
    treeData.each(d => d.y = d.depth * ySpacing + yOffset);

    svg.selectAll(".link")
      .data(treeData.links())
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-width", 2)
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    const nodes = svg.selectAll(".node")
      .data(treeData.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 18)
      .attr("fill", "#4caf50")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    nodes.append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(d => d.data.value);
  }

  function updateCode(lines) {
    const codeArea = document.getElementById("code-area");
    codeArea.innerHTML = lines.map((line, idx) => `<div id="code-line-${idx}" class="code-line">${line}</div>`).join("");
  }

  function highlightCodeLine(idx) {
    document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
    const line = document.getElementById(`code-line-${idx}`);
    if (line) line.classList.add("highlight");
  }
  async function inorderTraversal(node) {
    updateCode([
      "function inorder(node) {",
      "  if (!node) return;",
      "  inorder(node.left);",
      "  visit(node);",
      "  inorder(node.right);",
      "}"
    ]);
    if (!node) { highlightCodeLine(1); return; }
    highlightCodeLine(2);
    await inorderTraversal(node.left);
    highlightCodeLine(3);
    await visit(node);
    highlightCodeLine(4);
    await inorderTraversal(node.right);
    highlightCodeLine(5);
  }

  async function preorderTraversal(node) {
    updateCode([
      "function preorder(node) {",
      "  if (!node) return;",
      "  visit(node);",
      "  preorder(node.left);",
      "  preorder(node.right);",
      "}"
    ]);
    if (!node) { highlightCodeLine(1); return; }
    highlightCodeLine(2);
    await visit(node);
    highlightCodeLine(3);
    await preorderTraversal(node.left);
    highlightCodeLine(4);
    await preorderTraversal(node.right);
    highlightCodeLine(5);
  }

  async function postorderTraversal(node) {
    updateCode([
      "function postorder(node) {",
      "  if (!node) return;",
      "  postorder(node.left);",
      "  postorder(node.right);",
      "  visit(node);",
      "}"
    ]);
    if (!node) { highlightCodeLine(1); return; }
    highlightCodeLine(2);
    await postorderTraversal(node.left);
    highlightCodeLine(3);
    await postorderTraversal(node.right);
    highlightCodeLine(4);
    await visit(node);
    highlightCodeLine(5);
  }

  async function levelOrderTraversal(root) {
    updateCode([
      "function levelOrder(root) {",
      "  let queue = [];",
      "  queue.push(root);",
      "  while (queue.length) {",
      "    let node = queue.shift();",
      "    visit(node);",
      "    if (node.left) queue.push(node.left);",
      "    if (node.right) queue.push(node.right);",
      "  }",
      "}"
    ]);
    if (!root) return;
    let queue = [root];
    highlightCodeLine(1);
    while (queue.length) {
      highlightCodeLine(3);
      let node = queue.shift();
      highlightCodeLine(4);
      await visit(node);
      if (node.left) { highlightCodeLine(6); queue.push(node.left); }
      if (node.right) { highlightCodeLine(7); queue.push(node.right); }
    }
  }

  async function visit(node) {
    const outputList = document.getElementById("traversal-output");
    const listItem = document.createElement("li");
    listItem.textContent = `Visited Node: ${node.value}`;
    outputList.appendChild(listItem);
    d3.selectAll("circle").filter(d => d.data.value === node.value)
      .transition().duration(300).attr("fill", "orange")
      .transition().duration(500).attr("fill", "#4caf50");
    await new Promise(resolve => setTimeout(resolve, 700));
  }

  function searchNode(node, val) {
    if (!node) return null;
    if (node.value === val) return node;
    if (val < node.value) return searchNode(node.left, val);
    else return searchNode(node.right, val);
  }
  document.getElementById("insertNodes").addEventListener("click", () => {
    treeData = generateRandomBST();
    renderTree(treeData);
    document.getElementById("traversal-output").innerHTML = "";
    document.getElementById("code-area").innerHTML = "";
  });

  document.getElementById("startInorder").addEventListener("click", async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await inorderTraversal(treeData);
  });

  document.getElementById("startPreorder").addEventListener("click", async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await preorderTraversal(treeData);
  });

  document.getElementById("startPostorder").addEventListener("click", async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await postorderTraversal(treeData);
  });

  document.getElementById("startLevelorder").addEventListener("click", async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await levelOrderTraversal(treeData);
  });

  document.getElementById("searchNode").addEventListener("click", () => {
    const val = parseInt(document.getElementById("searchValue").value);
    if (isNaN(val)) return;
    const result = searchNode(treeData, val);
    if (result) {
      alert(`Node ${val} found in the BST.`);
    } else {
      alert(`Node ${val} NOT found.`);
    }
  });

  document.getElementById("deleteNode").addEventListener("click", () => {
    const val = parseInt(document.getElementById("deleteValue").value);
    if (isNaN(val)) return;
    treeData = deleteNode(treeData, val);
    renderTree(treeData);
  });
}
