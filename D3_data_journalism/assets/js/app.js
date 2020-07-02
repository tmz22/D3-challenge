var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG group to hold chart
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight);

var chartGroup = svg.append("g")    
    .attr("transform",`translate(${margin.left},${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function (povertyData) {
    console.log(povertyData)

    // Parse Data
    povertyData.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        console.log(d.healthcare)
    });

// Create scale functions
var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(povertyData, d => d.poverty)])
    .range([0,width]);
    
var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(povertyData, d => d.healthcare)]) 
    .range([height, 0]);
    
// Create axis functions
var xAxis = d3.axisBottom(xLinearScale);
var yAxis = d3.axisLeft(yLinearScale);

// Append axes to chart
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(xAxis);

chartGroup.append("text")
    .attr("transform", `translate(${width/2 -20}, ${height + margin.top + 30})`)
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("In Poverty (%)");

    // append y axis and text
    chartGroup.append("g")
    .call(yAxis);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left +40)
    .attr("x", 0 - (height / 2 +50))
    .attr("dy", "1em")
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("Lacks Healthcare (%)");

    // Create Circles
    var circlesGroup = chartGroup.append("g")  
        .attr("class", "nodes")
        .selectAll("circle")
        .data(povertyData)
        .enter()
        .append("g");
    
    // append circle
     circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".8");
    
        // append text
    circlesGroup.append("text")
        .text(d => d.abbr)
        .attr("x", d=> (xLinearScale(d.poverty)-9))
        .attr("y", d => (yLinearScale(d.healthcare)+7))        
        .style("font-size", "12px")
        .attr("fill", "white" )
        .attr("font-weight", "bold");
})

//  // Create updateToolTip
//  function updateToolTip