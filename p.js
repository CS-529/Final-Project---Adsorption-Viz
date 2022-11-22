var states=[];
var clicked = new Set();

d3.select("#grid").text().split("\n").forEach(function(line, i) {
  var re = /\w+/g, m;
  while (m = re.exec(line)) states.push({
    name: m[0],
    x: m.index / 3,
    y: i
    });
});

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var gridWidth = d3.max(states, function(d) { return d.x; }) + 1,
    gridHeight = d3.max(states, function(d) { return d.y; }) + 1,
    cellSize = 40;

    var state = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll(".state")
        .data(states)
        .enter().append("g")
        .attr("class", function(d) { return "state"})
        .attr("transform", function(d) { return "translate(" + (d.x - gridWidth / 2) * cellSize + "," + (d.y - gridHeight / 2) * cellSize + ")"; });

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    state.append("circle")
        .attr("cx", 1)
        .attr("cy", 1)
        .attr("r", 20)
        
        // .attr('fill', d => color(d.name))
        .on("click", function(d) {
            console.log(d)
            //xyz.append(d.name)
            //console.log(states)
            if (clicked.has(d.name)) {
                clicked.delete(d.name)
                
                
            } else {
                clicked.add(d.name)
                state.style("fill","red")
                // .style.backgroundColor = "#FDFF47"
            }
            if (clicked.size == 0){
                state.style("fill","black")
            }
            console.log(clicked.values())
            //console.log(clicked)
            div.transition()
                .duration(200)
                .style("opacity", .9)
                
            div	.html(d.name)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
            
            d3.select('#txt')
                .selectAll("text")
                .remove()
            
            d3.select('#txt')
                .append("text")
                .attr("font-size","2em")
                .attr("color","black")
                .text(function(d){
                    return "Selected:" + Array.from(clicked);
                })
            })
        .on("mouseout", function(d) {
              div.transition()
                  .duration(100)
                  .style("opacity", 0);
          });

    state.append("text")
        .attr("dy", ".55em")
        // .style("fill", "red")
        .text(function(d) { return d.name ;  })
        .on("click", function(d) {
            console.log(d)
            //xyz.append(d.name)
            //console.log(states)
            if (clicked.has(d.name)) {
                clicked.delete(d.name)
                
                
            } else {
                clicked.add(d.name)
                state.style("fill","red")
                // .style.backgroundColor = "#FDFF47"
            }
            if (clicked.size == 0){
                state.style("fill","black")
            }
            console.log(clicked.values)
            console.log(clicked)
            div.transition()
                .duration(200)
                .style("opacity", .9)
                
            div	.html(d.name)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
            })
        .on("mouseout", function(d) {
              div.transition()
                  .duration(100)
                  .style("opacity", 0);
          });
/* <div id="demo"> </div>   */

//    var i, item;
//    var setObj1 = new Set();
//    for(i=0;i<5;i++)
//    setObj1.add(i);
//    var val = ''
//    for (item of setObj1.values())
//     val+=item + ' '; 

//    document.getElementById('demo').textContent = "The set values are: "+clicked;