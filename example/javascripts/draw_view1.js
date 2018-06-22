var draw_view1 = {
    height: 0,
    width: 0,
    div: 0,
    view: 0,
    initialize: function(min, max) {
        var self = this;
        self.div = "#view1";
        self.width = $(self.div).width();
        self.height = $(self.div).height();

        self.view = d3.select(self.div).append("svg")
            .attr("width", self.width)
            .attr("height", self.height);

        self.view.append("rect")
            .attr("x", 10)
            .attr("y", 10)
            .attr("width", self.width * 0.5)
            .attr("height", self.height * 0.5)
            .attr("fill", "blue")
            .on("mouseover", function() {
                draw_view2.remove();
            })
            .on("mouseout", function() {
                console.log("eee")
            })
    },

}