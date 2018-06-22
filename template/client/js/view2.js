function View2(Observer) {
    var view2 = {};
    
	var $bmDiv=$("#top-middle-div");
	var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
	var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;
	
	var svg=d3.select("#view2")
			.append("svg")
			.attr("width", svgwidth)
			.attr("height", svgheight);
			
	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	var y = d3.scaleLinear().rangeRound([height, 0]);
	
	var xAxis=d3.axisBottom(x);
	var yAxis=d3.axisLeft(y).ticks(10, "%");
	
	var xAxisg=g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")");
	var yAxisg=g.append("g")
			.attr("class", "axis axis--y");	
			
	var transition = d3.transition()
		.duration(750)
		.ease(d3.easeLinear);
	
	var addcnt=0;
	
	
	d3.csv("data/data.csv", function(d) {
		d.frequency = +d.frequency;
		return d;
	},function(error, data) {
		if (error) throw error;
		
		console.log(data);
		
		function updatebars(){
			//属性的更新
			bars.transition(transition).delay(function(d, i) { return i * 30; }).attr("x", function(d) { return x(d.letter); })
			bars.attr("y", function(d) { return y(d.frequency); })
				.attr("width", x.bandwidth())
				.attr("height", function(d) { return height - y(d.frequency); })
				.attr("fill","steelblue")
				.on("click",function(d,i){
					bars.attr("fill","steelblue");
					$(this).attr("fill","#B2DFEE");
					Observer.fireEvent("selectbar",[d,i],View2);
				});
			
			
		}
		
		x.domain(data.map(function(d) { return d.letter; }));
		y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
		
		
		
		xAxisg.call(xAxis);

		yAxisg.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Frequency");
			
		
		var bars = g.append("g")
			.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar");
		bars.append("title")
			.text(function(d,i) { 
				return d.frequency;
			})
		updatebars();

		$("#plusbtn").on("click", function(d) {
			data.push({letter: "A"+x.domain()[addcnt], frequency: data[addcnt].frequency});
			addcnt++;
			
			x.domain(data.map(function(d) { return d.letter; }));
			y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
			
			xAxisg.call(xAxis);
			yAxisg.call(yAxis);
			
			var newbar=bars.data(data).enter().append("rect").attr("class", "bar");
			//console.log(newbar);
			newbar.append("title")
					.text(function(d,i) { 
						return d.frequency;
					});
			bars=newbar.merge(bars);
			updatebars();
			
		})
		$("#minusbtn").on("click", function(d) {
			if(addcnt==0){return;}
			data.pop();
			addcnt--;
			
			x.domain(data.map(function(d) { return d.letter; }));
			y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
			
			xAxisg.call(xAxis);
			yAxisg.call(yAxis);
			
			bars.data(data).exit().remove();
			updatebars();
			
		})
	});
	

	
	
    Observer.addView(view2);
    return view2;

}