const svg = d3.select("svg");

const { width, height } = svg.node().getBoundingClientRect();

const points = d3.range(100).map(() => [
    Math.random() * width, Math.random() * height, 
])

const voronoi = d3.Delaunay
                    .from(points)
                    .voronoi([0, 0, width, height]);

const cellPaths = svg.append("g")
                        .selectAll("path")
                        .data(points)
                        .enter()
                        .append("path")
                        .attr("d", (p, i) => voronoi.renderCell(i))
                        .style("stroke", "red")
                        .style("fill", "none")

function updateVoronoi(newPoints){
    const newVoronoi = d3.Delaunay
                            .from(newPoints)
                            .voronoi([0, 0, width, height]);

    cellPaths.data(newPoints)
        .attr("d", (p, i) => newVoronoi.renderCell(i))
}

svg.on("mousemove", function(event){
    const [mouseX, mouseY] = d3.pointer(event);

    // console.log(mouseX, mouseY)
    //Creazione nuovi punti vicino al puntatore mouse

    const newPoints = points.concat(
        d3.range(20).map(() => [
            mouseX + (Math.random() * 50),
            mouseY + (Math.random() * 50),
        ])
    );

    updateVoronoi(newPoints)
})