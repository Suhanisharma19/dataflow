function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🌐 Graph Traversal (BFS)</h2>
    <p>Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices of a graph layer by layer. It starts from a given node (source) and visits all its neighbors before moving to the next level of neighbors.</p>
    <h3>How BFS Works:</h3>
    <ol>
      <li>Start with the source node, mark it as visited, and add it to the queue.</li>
      <li>While the queue is not empty:
        <ul>
          <li>Remove the front node from the queue (current node).</li>
          <li>Visit all its unvisited neighbors:
            <ul>
              <li>Mark each neighbor as visited.</li>
              <li>Add the neighbor to the queue.</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>The traversal ends when the queue becomes empty, meaning all reachable nodes have been visited.</li>
    </ol>
    <h3>Key Characteristics:</h3>
    <ul>
      <li><strong>Layer-by-Layer Traversal:</strong> BFS explores all nodes at the current depth before moving to the next depth.</li>
      <li><strong>Shortest Path in Unweighted Graphs:</strong> BFS can find the shortest path between two nodes in an unweighted graph.</li>
      <li><strong>Queue-Based Implementation:</strong> BFS uses a queue to maintain the order of traversal.</li>
    </ul>
    <div id="graph-container" style="width: 800px; height: 400px; border: 1px solid #ccc; margin-bottom: 20px;"></div>
    <button id="startTraversal" style="padding: 10px 20px; background-color: #4caf50; color: white; border: none; cursor: pointer; font-size: 16px;">Play</button>
    <button id="generateGraph" style="padding: 10px 20px; background-color: #2196f3; color: white; border: none; cursor: pointer; font-size: 16px; margin-left: 10px;">Generate Random Graph</button>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Traversal Output:</h3>
      <ul id="traversal-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code>
        <div id="code-line-1" class="code-line">const visited = new Set();</div>
        <div id="code-line-2" class="code-line">const queue = [startNode];</div>
        <div id="code-line-3" class="code-line">while (queue.length > 0) {</div>
        <div id="code-line-4" class="code-line">  const currentNode = queue.shift();</div>
        <div id="code-line-5" class="code-line">  if (!visited.has(currentNode)) {</div>
        <div id="code-line-6" class="code-line">    visited.add(currentNode);</div>
        <div id="code-line-7" class="code-line">    graph.links.filter(link =></div>
        <div id="code-line-8" class="code-line">      link.source.id === currentNode || link.target.id === currentNode</div>
        <div id="code-line-9" class="code-line">    ).forEach(link => {</div>
        <div id="code-line-10" class="code-line">      const neighbor = link.source.id === currentNode ? link.target.id : link.source.id;</div>
        <div id="code-line-11" class="code-line">      if (!visited.has(neighbor)) {</div>
        <div id="code-line-12" class="code-line">        queue.push(neighbor);</div>
        <div id="code-line-13" class="code-line">      }</div>
        <div id="code-line-14" class="code-line">    });</div>
        <div id="code-line-15" class="code-line">  }</div>
        <div id="code-line-16" class="code-line">}</div>
      </code>
    </pre>
  `;

  const width = 800;
  const height = 400;

  const svg = d3.select("#graph-container").append("svg")
    .attr("width", width)
    .attr("height", height);

  let graphData = generateRandomGraph(5, 7); // Default graph with 5 nodes and 7 edges

  function renderGraph(graphData) {
    svg.selectAll("*").remove(); // Clear previous graph

    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll(".link")
      .data(graphData.links)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const node = svg.selectAll(".node")
      .data(graphData.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 15)
      .attr("fill", "#4caf50")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    const label = svg.selectAll(".label")
      .data(graphData.nodes)
      .enter().append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  }

  function generateRandomGraph(nodeCount, edgeCount) {
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({ id: i }));
    const links = [];

    while (links.length < edgeCount) {
      const source = Math.floor(Math.random() * nodeCount);
      const target = Math.floor(Math.random() * nodeCount);
      if (source !== target && !links.some(link =>
        (link.source === source && link.target === target) ||
        (link.source === target && link.target === source)
      )) {
        links.push({ source, target });
      }
    }

    return { nodes, links };
  }

  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }

  async function bfsTraversal(graph, startNode) {
    highlightCodeLine("code-line-1");
    const visited = new Set();
    highlightCodeLine("code-line-2");
    const queue = [startNode];
    const outputList = document.getElementById("traversal-output");
    outputList.innerHTML = "";

    while (queue.length > 0) {
      highlightCodeLine("code-line-3");
      const currentNode = queue.shift();
      highlightCodeLine("code-line-4");

      if (!visited.has(currentNode)) {
        highlightCodeLine("code-line-5");
        visited.add(currentNode);
        highlightCodeLine("code-line-6");

        const nodeElement = d3.selectAll(".node").filter(d => d.id === currentNode);
        nodeElement.transition().duration(500).attr("fill", "orange");

        const listItem = document.createElement("li");
        listItem.textContent = `Visited Node: ${currentNode}`;
        outputList.appendChild(listItem);

        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization

        highlightCodeLine("code-line-7");
        graph.links
          .filter(link => link.source.id === currentNode || link.target.id === currentNode)
          .forEach(link => {
            highlightCodeLine("code-line-9");
            const neighbor = link.source.id === currentNode ? link.target.id : link.source.id;
            highlightCodeLine("code-line-10");
            if (!visited.has(neighbor)) {
              highlightCodeLine("code-line-11");
              queue.push(neighbor);
              highlightCodeLine("code-line-12");
            }
          });
      }
    }
    highlightCodeLine("code-line-16");
  }

  document.getElementById("startTraversal").addEventListener("click", () => {
    bfsTraversal(graphData, 0);
  });

  document.getElementById("generateGraph").addEventListener("click", () => {
    graphData = generateRandomGraph(5, 7);
    renderGraph(graphData);
    document.getElementById("traversal-output").innerHTML = "";
  });

  renderGraph(graphData);
}

initSection();