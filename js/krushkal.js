function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🔗 Kruskal's Algorithm</h2>
    <p>Kruskal's Algorithm is a greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph. The MST is a subset of the edges that connects all vertices in the graph without forming any cycles and with the minimum possible total edge weight.</p>
    <h3>How Kruskal's Algorithm Works:</h3>
    <ol>
      <li>Sort all the edges in non-decreasing order of their weights.</li>
      <li>Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far:
        <ul>
          <li>If it does not form a cycle, include it in the MST.</li>
          <li>If it forms a cycle, discard it.</li>
        </ul>
      </li>
      <li>Repeat the above step until there are (V-1) edges in the MST, where V is the number of vertices.</li>
    </ol>
    <h3>Key Characteristics:</h3>
    <ul>
      <li><strong>Greedy Approach:</strong> Always picks the smallest edge that does not form a cycle.</li>
      <li><strong>Weighted Graph:</strong> Works only on weighted undirected graphs.</li>
      <li><strong>Cycle-Free:</strong> Ensures no cycles are formed in the MST.</li>
    </ul>
    <h3>Applications:</h3>
    <ul>
      <li>Network design (e.g., laying cables or pipelines).</li>
      <li>Approximation algorithms for NP-hard problems.</li>
    </ul>
    <div id="graph-container" style="width: 800px; height: 400px; border: 1px solid #ccc; margin-bottom: 20px;"></div>
    <button id="startKruskal" style="padding: 10px 20px; background-color: #4caf50; color: white; border: none; cursor: pointer; font-size: 16px;">Play</button>
    <button id="generateGraph" style="padding: 10px 20px; background-color: #2196f3; color: white; border: none; cursor: pointer; font-size: 16px; margin-left: 10px;">Generate Random Graph</button>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Traversal Output:</h3>
      <ul id="traversal-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code>
        <div id="code-line-1" class="code-line">edges.sort((a, b) => a[2] - b[2]);</div>
        <div id="code-line-2" class="code-line">const parent = Array(n).fill(0).map((_, i) => i);</div>
        <div id="code-line-3" class="code-line">function find(u) {</div>
        <div id="code-line-4" class="code-line">  if (parent[u] !== u) parent[u] = find(parent[u]);</div>
        <div id="code-line-5" class="code-line">  return parent[u];</div>
        <div id="code-line-6" class="code-line">}</div>
        <div id="code-line-7" class="code-line">function union(u, v) {</div>
        <div id="code-line-8" class="code-line">  parent[find(u)] = find(v);</div>
        <div id="code-line-9" class="code-line">}</div>
        <div id="code-line-10" class="code-line">const result = [];</div>
        <div id="code-line-11" class="code-line">for (let [u, v, w] of edges) {</div>
        <div id="code-line-12" class="code-line">  if (find(u) !== find(v)) {</div>
        <div id="code-line-13" class="code-line">    union(u, v);</div>
        <div id="code-line-14" class="code-line">    result.push([u, v, w]);</div>
        <div id="code-line-15" class="code-line">  }</div>
        <div id="code-line-16" class="code-line">}</div>
        <div id="code-line-17" class="code-line">return result;</div>
      </code>
    </pre>
  `;

  // Add CSS styles dynamically
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
    .node {
      cursor: pointer;
      transition: fill 0.3s ease;
    }
    .edge {
      stroke: #999;
      stroke-width: 2;
    }
    .edge.highlight {
      stroke: orange;
      stroke-width: 4;
    }
    .edge-label {
      font-family: Arial, sans-serif;
      font-size: 12px;
      fill: #333;
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

  const width = 800;
  const height = 400;

  let graphData = generateRandomGraph(5, 7); 

  const svg = d3.select("#graph-container").append("svg")
    .attr("width", width)
    .attr("height", height);

  function renderGraph(graphData) {
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll(".link")
      .data(graphData.links)
      .enter().append("line")
      .attr("class", "edge")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const edgeLabels = svg.selectAll(".edge-label")
      .data(graphData.links)
      .enter().append("text")
      .attr("class", "edge-label")
      .attr("text-anchor", "middle")
      .text(d => d.weight);

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

      edgeLabels
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);

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
      if (source !== target && !links.some(link => (link.source === source && link.target === target) || (link.source === target && link.target === source))) {
        links.push({ source, target, weight: Math.floor(Math.random() * 10) + 1 });
      }
    }
    return { nodes, links };
  }

  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }

  async function kruskal(edges, n) {
    highlightCodeLine("code-line-1");
    edges.sort((a, b) => a[2] - b[2]);
    highlightCodeLine("code-line-2");
    const parent = Array(n).fill(0).map((_, i) => i);

    function find(u) {
      highlightCodeLine("code-line-3");
      if (parent[u] !== u) {
        highlightCodeLine("code-line-4");
        parent[u] = find(parent[u]);
      }
      highlightCodeLine("code-line-5");
      return parent[u];
    }

    function union(u, v) {
      highlightCodeLine("code-line-7");
      parent[find(u)] = find(v);
      highlightCodeLine("code-line-8");
    }

    highlightCodeLine("code-line-10");
    const result = [];
    for (let [u, v, w] of edges) {
      highlightCodeLine("code-line-11");
      if (find(u) !== find(v)) {
        highlightCodeLine("code-line-12");
        union(u, v);
        highlightCodeLine("code-line-13");
        result.push([u, v, w]);
        highlightCodeLine("code-line-14");

        const edge = d3.selectAll(".edge").filter(d =>
          (d.source.id === u && d.target.id === v) ||
          (d.source.id === v && d.target.id === u)
        );
        edge.classed("highlight", true);

        const outputList = document.getElementById("traversal-output");
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>${u} -> ${v}</span> (Weight: ${w})`;
        outputList.appendChild(listItem);

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    highlightCodeLine("code-line-17");
    return result;
  }

  document.getElementById("startKruskal").addEventListener("click", () => {
    const edges = graphData.links.map(link => [link.source.id, link.target.id, link.weight]);
    kruskal(edges, graphData.nodes.length);
  });

  document.getElementById("generateGraph").addEventListener("click", () => {
    graphData = generateRandomGraph(5, 7); // Generate a new random graph
    renderGraph(graphData);
    document.getElementById("traversal-output").innerHTML = ""; // Clear previous output
  });

  renderGraph(graphData); 
}

initSection();