
function View3(Observer){
	var view3={};
	/*
	var $trtDiv=$("#top-right-top-div");
    var svgwidth=$trtDiv.width();
    var svgheight=$trtDiv.height();
	var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;
	
	var svg=d3.select("#view3")
			.append("svg")
			.attr("width", svgwidth)
			.attr("height", svgheight);
	*/
	function getdata(d){
		let obj = {};
		obj.data = JSON.stringify(d);
		//console.log(obj.data);
		$.ajax({
			type: 'GET',
			url: 'addData',
			data: obj,
			dataType: 'json',
			success: function(evt_data) {
				console.log(evt_data);
			},
			error: function(jqXHR) {
				console.log('post error!!', jqXHR);
			},
		});
	}
	
    view3.onMessage = function(message, data, from){
		if(message == "selectbar"){
			if(from == View2){	
				console.log(data);
				
				getdata([2, 3]);
			}
		}
		
	}
	
	
	Observer.addView(view3);
	return view3;
}
	
	
