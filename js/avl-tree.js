function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🌳 AVL Tree (Self-Balancing BST)</h2>
    <p><strong>Theory:</strong> An <b>AVL Tree</b> is a self-balancing Binary Search Tree (BST) where the balance factor (difference in heights) of left and right subtrees is between -1 and 1 for every node.</p>
    <div id="avl-container" style="width: 800px; height: 400px; border: 1px solid #ccc; background-color: #ffffff; margin-bottom: 20px;"></div>

    <div style="margin-bottom: 20px;">
      <button id="insertNodes" style="padding:10px 20px; background-color: #2196f3; color:white; border:none; cursor:pointer; font-size:16px;">Insert Random Nodes</button>
      <button id="startInorder" style="padding:10px 20px; background-color: #4caf50; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Inorder Traversal</button>
      <button id="startPreorder" style="padding:10px 20px; background-color: #ff9800; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Preorder Traversal</button>
      <button id="startPostorder" style="padding:10px 20px; background-color: #9c27b0; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Postorder Traversal</button>
      <button id="startLevelorder" style="padding:10px 20px; background-color: #795548; color:white; border:none; cursor:pointer; font-size:16px; margin-left:10px;">Level Order Traversal</button>
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
  const style = document.createElement("style");
  style.innerHTML = `
    .highlight {
      fill: #ff9800 !important;
      stroke: #000;
      stroke-width: 3px;
      transition: all 0.3s ease-in-out;
    }
    .node {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    .link {
      stroke: #999;
      stroke-width: 2;
    }
    .highlight-node {
      fill: #f44336;
      stroke: #fff;
      stroke-width: 3;
      transition: all 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  const width = 800, height = 400;
  const svg = d3.select("#avl-container").append("svg").attr("width", width).attr("height", height);
  let treeData = null;
  function insertNode(root, value) {
    if (!root) return { value, left: null, right: null, height: 1 };
    if (value < root.value) root.left = insertNode(root.left, value);
    else root.right = insertNode(root.right, value);
    root.height = 1 + Math.max(getHeight(root.left), getHeight(root.right));
    return balance(root);
  }

  function getHeight(node) {
    return node ? node.height : 0;
  }

  function getBalanceFactor(node) {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  }

  function balance(node) {
    const balanceFactor = getBalanceFactor(node);
    if (balanceFactor > 1) {
      if (getBalanceFactor(node.left) < 0) node.left = rotateLeft(node.left);
      return rotateRight(node);
    }
    if (balanceFactor < -1) {
      if (getBalanceFactor(node.right) > 0) node.right = rotateRight(node.right);
      return rotateLeft(node);
    }
    return node;
  }

  function rotateLeft(node) {
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    newRoot.height = 1 + Math.max(getHeight(newRoot.left), getHeight(newRoot.right));
    return newRoot;
  }

  function rotateRight(node) {
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    newRoot.height = 1 + Math.max(getHeight(newRoot.left), getHeight(newRoot.right));
    return newRoot;
  }

  function deleteNode(root, value) {
    if (!root) return root;
    if (value < root.value) root.left = deleteNode(root.left, value);
    else if (value > root.value) root.right = deleteNode(root.right, value);
    else {
      if (!root.left || !root.right) {
        root = root.left ? root.left : root.right;
      } else {
        let temp = minValueNode(root.right);
        root.value = temp.value;
        root.right = deleteNode(root.right, temp.value);
      }
    }
    if (!root) return root;
    root.height = 1 + Math.max(getHeight(root.left), getHeight(root.right));
    return balance(root);
  }

  function minValueNode(node) {
    while (node.left) node = node.left;
    return node;
  }

  function searchNode(root, value) {
    if (!root) return null;
    if (value === root.value) return root;
    if (value < root.value) return searchNode(root.left, value);
    return searchNode(root.right, value);
  }

  function generateRandomAVL(count = 7) {
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

  function visit(node) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 300);
    });
  }

  async function inorderTraversal(node) {
    updateCode(["function inorder(node) {", "  if (!node) return;", "  inorder(node.left);", "  visit(node);", "  inorder(node.right);", "}"]);
    if (!node) { highlightCodeLine(1); return; }
    highlightCodeLine(2);
    await inorderTraversal(node.left);
    highlightCodeLine(3);
    document.getElementById("traversal-output").innerHTML += `<li>Inorder: ${node.value}</li>`;
    await visit(node);
    highlightCodeLine(4);
    await inorderTraversal(node.right);
    highlightCodeLine(5);
  }

  async function preorderTraversal(node) {
    updateCode(["function preorder(node) {", "  if (!node) return;", "  visit(node);", "  preorder(node.left);", "  preorder(node.right);", "}"]);
    if (!node) { highlightCodeLine(1); return; }
    highlightCodeLine(2);
    document.getElementById("traversal-output").innerHTML += `<li>Preorder: ${node.value}</li>`;
    await visit(node);
    highlightCodeLine(3);
    await preorderTraversal(node.left);
    highlightCodeLine(4);
    await preorderTraversal(node.right);
    highlightCodeLine(5);
  }

  async function postorderTraversal(node) {
    updateCode(["function postorder(node) {", "  if (!node) return;", "  postorder(node.left);", "  postorder(node.right);", "  visit(node);", "}"]);
    if (!node) { highlightCodeLine(1); return; }
    highlightCodeLine(2);
    await postorderTraversal(node.left);
    highlightCodeLine(3);
    await postorderTraversal(node.right);
    highlightCodeLine(4);
    document.getElementById("traversal-output").innerHTML += `<li>Postorder: ${node.value}</li>`;
    await visit(node);
    highlightCodeLine(5);
  }

  async function levelOrderTraversal(root) {
    updateCode(["function levelOrder(node) {", "  use queue", "  while(queue not empty) {", "    visit front", "    push children", "  }", "}"]);
    if (!root) return;
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      document.getElementById("traversal-output").innerHTML += `<li>LevelOrder: ${node.value}</li>`;
      await visit(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  document.getElementById("insertNodes").onclick = () => {
    treeData = generateRandomAVL();
    renderTree(treeData);
  };
  document.getElementById("startInorder").onclick = async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await inorderTraversal(treeData);
  };
  document.getElementById("startPreorder").onclick = async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await preorderTraversal(treeData);
  };
  document.getElementById("startPostorder").onclick = async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await postorderTraversal(treeData);
  };
  document.getElementById("startLevelorder").onclick = async () => {
    document.getElementById("traversal-output").innerHTML = "";
    await levelOrderTraversal(treeData);
  };
  document.getElementById("searchNode").onclick = () => {
    const val = parseInt(document.getElementById("searchValue").value);
    if (searchNode(treeData, val)) alert(`Node ${val} found!`);
    else alert(`Node ${val} not found!`);
  };
  document.getElementById("deleteNode").onclick = () => {
    const val = parseInt(document.getElementById("deleteValue").value);
    treeData = deleteNode(treeData, val);
    renderTree(treeData);
  };
}
