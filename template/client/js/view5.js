function View5(Observer) {
    var view5 = {};
	var $btDiv=$("#bottom-div");
    var width=$btDiv.width();
    var height=$btDiv.height();
	
	var svg=d3.select("#view5")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
	
	
    Observer.addView(view5);
    return view5;
}
