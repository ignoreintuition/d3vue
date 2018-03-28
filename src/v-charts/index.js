export default {
  install: function (Vue) {
    Vue.prototype.$helpers = {
      barChart: {
        update: function(d3, ds) {
          var svg = d3.select("#chart")
          var g = svg.selectAll("rect")
          .data(ds);

          var yScale = d3.scaleLinear()
            .range([150, 0])
            .domain([0,150]);

          var yAxis = d3.axisLeft()
              .scale(yScale);

          g.enter().append("rect")
          .attr("width", 20)
          .merge(g)
          .attr("height", function(d) {return d.val})
          .attr("x", function(d, i){ return (i * 25) + 60})
          .attr("y", function(d) {return 150 - d.val})
          svg.append("g")
            .attr("transform", "translate(" + 50 + "," + 0 + ")")
            .call(yAxis);

          g.exit().remove();
        }
      }
    }
  }
}
