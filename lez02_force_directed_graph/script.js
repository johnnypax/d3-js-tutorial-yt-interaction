const svg = d3.select("svg");

const nodes = [
    { id: 1, name: "Giovanni"},
    { id: 2, name: "Elisabetta"},
    { id: 3, name: "Antonio"},
    { id: 4, name: "Ester"},
];

const links = [
    { source: 1, target: 2},
    { source: 2, target: 3},
    { source: 1, target: 3},
    { source: 1, target: 4},
]

const { width, height } = svg.node().getBoundingClientRect();

const simulation = 
            d3.forceSimulation(nodes)
              .force('link', 
                d3.forceLink(links).id(d => d.id).distance(100)
              )
              .force('charge', 
                d3.forceManyBody().strength(-300)
              )
              .force('center', 
                d3.forceCenter(width / 2, height / 2)
              )

const link = svg.append('g')
              .selectAll('line')
              .data(links)
              .enter().append('line')
              .attr('class', 'custom-line')

const node = svg.append('g')
              .selectAll('circle')
              .data(nodes)
              .enter().append('circle')
              .attr('r', 10)
              .attr('class', 'custom-node')
              .call(
                d3.drag()
                    .on('start', dragStart)
                    .on('drag', dragging)
                    .on('end', dragEnd)
              );



function dragStart(event, d){
    if(!event.active)
        simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragging(event, d){
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnd(event, d){
    if(!event.active)
        simulation.alphaTarget(0).restart();
    d.fx = null;
    d.fy = null;
}

simulation.on('tick', () => {
    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
})