// Set threshold - if GPS... pin10 (gps) then send

$(document).ready(function() {
	$(".alert").hide();
	$(".result-group").hide();
	$(".alert-sending-message").hide();

	/* Command Control Panel interactions */
	$(".form-button").click(function(){
		var type = $(this).text();
		var command = type;
		
		if (type=="Get"){
			command +=" " + $("#getPinNumber").val();
		}
		else if (type=="Put"){
			command +=" " + $("#putPinNumber").val() + " " + $("#putPinValue").val();
		}
		$("#command").val(command);
	});
	
	/* AJAX Call when clicking submit */
	$("#submit_button").click(function(){
		$(".alert").fadeOut("slow");
		$(".result-group").fadeOut("slow");
		$(".alert-sending-message").fadeIn("slow");
		var url = window.location.pathname + "/getText?command=";
		var command = $("#command").val();
		
		if (command == 'gph 6'){
			command = command.replace(" ", "+");
			url += command;
			$.ajax({url: url, success: function(result){
				drawGraph(result);
			}});
		}
		else {
			command = command.replace(" ", "+");
			url += command;		
			$.ajax({url: url, success: function(result){
				// If success, with results
				$(".alert-sending-message").fadeOut("slow");
				$(".alert-success").fadeIn("slow");
				$(".result-group").fadeIn("slow");
				$("#text_data").html(result);
			}});
		}
	});
});


function drawGraph(data){
	//console.log(data);
	data = JSON.parse(data);
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
	
	  data.forEach(function(d) {
		countIndex++;
		d.index = countIndex;
		d.key = d.key.replace('\n','');
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
}