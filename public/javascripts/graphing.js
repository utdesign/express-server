var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
//	console.log(width+ " " + height);
//var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line();

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var countIndex = 0;
//var data = document.getElementById("graphing_data").innerHTML;
//console.log(data);
var data = [{key: 1},
{key:2},
{key:5},
{key:4},
{key:2},
{key:5},
{key:6},
{key:8},
{key:14},
{key:23},
{key:34},
{key:45},
{key:39},
{key:35},
{key:39},
{key:34},
{key:45},
{key:41},
{key:56},
{key:50},
{key:76},
{key:74},
{key:43},
{key:52},
{key:51},
{key:60},
{key:78}];

//d3.tsv("../files/data.tsv", function(error, data) {
  data.forEach(function(d) {
    countIndex++;
	d.index = countIndex;
 //   d.date = parseDate(d.date);
	console.log(d);
  });

  x.domain(d3.extent(data, function(d) { return d.index; }));
  y.domain(d3.extent(data, function(d) { return parseInt(d.key); }));
	
  line.x(function(d) { return x(d.index); })
	  .y(function(d) { return y(parseInt(d.key)); });
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Pin Value");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
//});