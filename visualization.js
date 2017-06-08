'use strict';  //treat silly mistakes as run-time errors
//the SVG element to add visual content to
var svg = d3.select('#visContainer')
		.append('svg')
		.attr('height', 480) //can adjust size as desired
		.attr('width', 600)
    .style('border','1px solid gray'); //comment out to remove border

/* Your script goes here */

//define width, height, padding distance of the graph
var width = 600;
var height = 480;
var padding = { top: 50, right: 50, bottom: 50, left: 50 };
var x_axis_values = [];
var y_axis_values = [];
var america = [];
var asia = [];
var all = [];
//var field_1=[];//define a list for each item in the form of [country, gdp, satisfaction]
//var field_2=[];
var field = [];
//var newlist = [];
//var newlist_1 =[];
var filepath = "inter_tourist.csv"
d3.csv(filepath,function(csvdata){
		for(var i = 0; i < csvdata.length; i++ ){
		    var item1 = csvdata[i].Year
			var item2 = csvdata[i].Inter_tourist
			var item0 = csvdata[i].Entity
			//var item0 = csvdata[i].Entity
			x_axis_values.push(item1)//a list with all x-axis values, i.e. Year
			y_axis_values.push(item2)//a list with all y-axis values, i.e. Inter_tourist (millions) 
			
			field=[item1,item2]
			//newlist.push(field)
			all.push(field)
				
		   }
			for (i=0;i<39;i++){
				america.push(all[i])
			}	
			for (i=39;i<78;i++){
				asia.push(all[i])
			}
		gTag_x(xScale(x_axis_values));
		gTag_y(yScale(y_axis_values));
		//console.log(asia)

		var textTitle = svg.append("text")
			.attr("x", function(d) { return 280; })
			.attr("y", function(d) { return 30; })
			.style("font-weight", "bold")
			.attr("font-size", "18px")

		d3.select('#opts')
  		  .on('change', function() {
            var newData = d3.select(this).property('value')
	        if ( newData == 'americas') {
	      	  	d3.selectAll("#lines").remove()
		  	  	drawLine ( america,"blue")
				textTitle.text( function (d) { return "Americas"; }).attr("fill", "blue")
	      	} else if ( newData == 'asia_pacific') {
	    	  	d3.selectAll("#lines").remove()
		      	drawLine ( asia,"red")
				textTitle.text( function (d) { return "Asia Pacific"; }).attr("fill", "red")
	    	} else if ( newData == 'compare') {
	    		d3.selectAll("#lines").remove()
		  		drawLine ( asia,"red")
		  		drawLine ( america,"blue")
				textTitle.text( function (d) { return "Compare"; }).attr("fill", "green")
					.append('tspan').text("Asia Pacific").attr("fill", "red").attr('x', '490').attr('y', '40')
					.append('tspan').text("Americas").attr("fill", "blue").attr('dy', '7em').attr('x', '510')
}})

		
			})
		

function findMin(list){
/*find the minimum value, given a list of data return the min in the list*/
	var min = d3.min(list)
	return min
}

function findMax(list){
/*find the maximum value, given a list of data, return the max in the list*/
	var max = d3.max(list)
	return max
}

function xScale(list){
/*create the x-axis, given an array list */
	var xScale = d3.scaleLinear()
				   .domain([findMin(list),findMax(list)])
		           .range([0, (width - padding.left - padding.right)])
	var xAxis = d3.axisBottom().scale(xScale)
	return xAxis	
}

function yScale(list){
/*create the y-axis, given an array list */
	var yScale = d3.scaleLinear()
    	           .domain([0, 302.9])
                   .range([height - padding.top - padding.bottom, 0])
	var yAxis = d3.axisLeft().scale(yScale)
	return yAxis
}

function gTag_x(axis){
/*draw x-axis*/
var textX = svg.append("text")
var textXAxis = textX.attr("x", function(d) { return 10; })
	.attr("y", function(d) { return 30; })
	.text( function (d) { return "Arrivals in million"; })
    .attr("font-size", "14px")
	.attr("fill", "black");
return svg.append('g')
  		  .attr('class', 'axis')
  		  .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
          .call(axis);
		  
}

function gTag_y(axis){
/*draw x-axis*/
var textY = svg.append("text")
var textYAxis = textY.attr("x", function(d) { return 560; })
	.attr("y", function(d) { return 440; })
	.text( function (d) { return "Year"; })
    .attr("font-size", "14px")
	.attr("fill", "black");
return svg.append('g')
  		  .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
          .call(axis);
}

function drawLine(dataset,color){
	/*draw value lines,given the data list and color required*/	
	var x = d3.scaleLinear()
              .domain([1950,2016])
              .range([0, width - padding.left - padding.right]);
	var y = d3.scaleLinear()
              .domain([0, 302.9])
              .range([height - padding.top - padding.bottom, 0]);
	var line = d3.line()
              .x(function(d){ return x(d[0]) })
              .y(function(d){ return y(d[1]) });
		   svg.append('g')
  	          .append('path')
  	          .attr('id', 'lines')
  		      .attr('class', 'line-path')
              .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
              .attr('d', line(dataset))
              .attr('fill', 'none')
              .attr('stroke-width', 3)
              .attr('stroke', color)
			  .on("mouseover",function(){
        		d3.select(this)
        		.attr("stroke","orange");})
				.on("mouseout",function(){
        		d3.select(this)
        		.attr("stroke",color);})
}	





