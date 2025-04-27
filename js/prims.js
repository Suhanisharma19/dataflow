function initSection() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>🌉 Prim's Algorithm</h2>
    <p>Prim's Algorithm is a greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph. The MST is a subset of the edges that connects all vertices in the graph without forming any cycles and with the minimum possible total edge weight.</p>
    <h3>How Prim's Algorithm Works:</h3>
    <ol>
      <li>Start with an arbitrary node and add it to the MST.</li>
      <li>Repeat the following steps until all nodes are included in the MST:
        <ul>
          <li>Find the smallest edge that connects a node in the MST to a node outside the MST.</li>
          <li>Add the edge and the new node to the MST.</li>
        </ul>
      </li>
    </ol>
    <h3>Key Characteristics:</h3>
    <ul>
      <li><strong>Greedy Approach:</strong> Always picks the smallest edge that connects the MST to a new node.</li>
      <li><strong>Weighted Graph:</strong> Works only on weighted undirected graphs.</li>
      <li><strong>Cycle-Free:</strong> Ensures no cycles are formed in the MST.</li>
    </ul>
    <h3>Applications:</h3>
    <ul>
    <li>Network design (e.g., laying cables or pipelines).</li>
      <li>Approximation algorithms for NP-hard problems.</li>
    </ul>
    <div id="graph-container" style="width: 800px; height: 400px; border: 1px solid #ccc; margin-bottom: 20px;"></div>
    <button id="startPrim" style="padding: 10px 20px; background-color: #4caf50; color: white; border: none; cursor: pointer; font-size: 16px;">Play</button>
    <button id="generateGraph" style="padding: 10px 20px; background-color: #2196f3; color: white; border: none; cursor: pointer; font-size: 16px; margin-left: 10px;">Generate Random Graph</button>
    <div id="output-container" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h3>Traversal Output:</h3>
      <ul id="traversal-output" style="list-style: none; padding: 0; font-family: Arial, sans-serif; font-size: 16px; color: #333;"></ul>
    </div>
    <pre id="code-container" style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
      <code>
        <div id="code-line-1" class="code-line">const visited = new Set();</div>
        <div id="code-line-2" class="code-line">const result = [];</div>
        <div id="code-line-3" class="code-line">visited.add(0);</div>
        <div id="code-line-4" class="code-line">while (visited.size < graph.length) {</div>
        <div id="code-line-5" class="code-line">  let minEdge = [null, null, Infinity];</div>
        <div id="code-line-6" class="code-line">  for (let u of visited) {</div>
        <div id="code-line-7" class="code-line">    for (let [v, w] of graph[u]) {</div>
        <div id="code-line-8" class="code-line">      if (!visited.has(v) && w < minEdge[2]) {</div>
        <div id="code-line-9" class="code-line">        minEdge = [u, v, w];</div>
        <div id="code-line-10" class="code-line">      }</div>
        <div id="code-line-11" class="code-line">    }</div>
        <div id="code-line-12" class="code-line">  }</div>
        <div id="code-line-13" class="code-line">  visited.add(minEdge[1]);</div>
        <div id="code-line-14" class="code-line">  result.push(minEdge);</div>
        <div id="code-line-15" class="code-line">}</div>
        <div id="code-line-16" class="code-line">return result;</div>
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
    .node {
      cursor: pointer;
      transition: fill 0.3s ease;
    }
    .node.visited {
      fill: orange;
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

    // Creating adjacency list
    const adjacencyList = {};
    links.forEach(link => {
      if (!adjacencyList[link.source]) adjacencyList[link.source] = [];
      if (!adjacencyList[link.target]) adjacencyList[link.target] = [];
      adjacencyList[link.source].push([link.target, link.weight]);
      adjacencyList[link.target].push([link.source, link.weight]);
    });

    return { nodes, links, adjacencyList };
  }

  function highlightCodeLine(lineId) {
    document.querySelectorAll(".code-line").forEach(line => line.classList.remove("highlight"));
    const line = document.getElementById(lineId);
    if (line) line.classList.add("highlight");
  }

  async function prim(adjacencyList) {
    highlightCodeLine("code-line-1");
    const visited = new Set();
    highlightCodeLine("code-line-2");
    const result = [];
    highlightCodeLine("code-line-3");
    visited.add(0); 

    while (visited.size < Object.keys(adjacencyList).length) {
      highlightCodeLine("code-line-4");
      let minEdge = [null, null, Infinity];
      highlightCodeLine("code-line-5");

      for (let u of visited) {
        highlightCodeLine("code-line-6");
        for (let [v, w] of adjacencyList[u]) {
          highlightCodeLine("code-line-7");
          if (!visited.has(v) && w < minEdge[2]) {
            highlightCodeLine("code-line-8");
            minEdge = [u, v, w];
            highlightCodeLine("code-line-9");
          }
        }
      }

      highlightCodeLine("code-line-13");
      visited.add(minEdge[1]);
      result.push(minEdge);
      highlightEdge(minEdge[0], minEdge[1]);
      const outputList = document.getElementById("traversal-output");
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${minEdge[0]} -> ${minEdge[1]}</span> (Weight: ${minEdge[2]})`;
      outputList.appendChild(listItem);

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    highlightCodeLine("code-line-16");
    return result;
  }

  function highlightEdge(source, target) {
    svg.selectAll(".edge")
      .filter(d => (d.source.id === source && d.target.id === target) || (d.source.id === target && d.target.id === source))
      .attr("class", "edge highlight");
  }

  document.getElementById("startPrim").addEventListener("click", () => {
    const adjacencyList = graphData.adjacencyList;
    prim(adjacencyList);
  });

  document.getElementById("generateGraph").addEventListener("click", () => {
    graphData = generateRandomGraph(5, 7); 
    renderGraph(graphData);
    document.getElementById("traversal-output").innerHTML = ""; 
  });

  renderGraph(graphData); 
}

initSection();