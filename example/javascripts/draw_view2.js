var draw_view2 = {
    height: 0,
    width: 0,
    div: 0,
    view: 0,
    graph_cirlce: 0,
    data: 0,
    g: 0,
    graph_rect: 0,
    initialize: function() {
        var self = this;
        self.div = "#view2";
        self.width = $(self.div).width();
        self.height = $(self.div).height();
        self.view = d3.select(self.div).append("svg")
            .attr("width", self.width)
            .attr("height", self.height);
        self.g = self.view.append("g")
        this.data = [2, 3, 4, 5];
        this.graph_cirlce = self.view.append("g")
            .attr("class", "graph_circle")
            .selectAll("circle")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return d * 40;
            })
            .attr("cy", function(d) {
                return d * 40;
            })
            .attr("r", 20)
            .attr("fill", "yellow")
        this.graph_rect = self.view.append("rect")
            .attr("class", "graph_circle")

        .attr("x", 100)
            .attr("y", 100)
            .attr("width", 100)
            .attr("height", 100)
            .attr("stroke-width", 3)


    },
    remove(color) {
        var self = this;
        d3.select(".graph_circle").remove();

    }
}